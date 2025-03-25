import { Channel, ChannelModel, ConsumeMessage, connect } from "amqplib";
import { DescriptionQueue, CONNECTION_URL, QUEUE_NAME, DescriptionType } from "./common";

export class DescriptionConsumer implements DescriptionQueue {
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;
  private static _instance: DescriptionConsumer | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private readonly reconnectInterval = 5000; // 5 seconds
  private isConsuming = false;

  private constructor() {
    // Empty private constructor
  }

  public static getInstance(): DescriptionConsumer {
    if (!DescriptionConsumer._instance) {
      DescriptionConsumer._instance = new DescriptionConsumer();
    }
    return DescriptionConsumer._instance;
  }

  async connect(): Promise<boolean> {
    try {
      if (this.connection) {
        return true;
      }

      this.connection = await connect(CONNECTION_URL);
      console.log("Connected to RabbitMQ");

      // Setup connection event listeners
      this.connection.on("error", (err) => {
        console.error("RabbitMQ connection error:", err);
        this.handleConnectionFailure();
      });

      this.connection.on("close", () => {
        console.warn("RabbitMQ connection closed");
        this.handleConnectionFailure();
      });

      // Create a default channel
      await this.createChannel();

      return true;
    } catch (err) {
      console.error("Failed to create connection to RabbitMQ:", err);
      this.handleConnectionFailure();
      return false;
    }
  }

  private handleConnectionFailure(): void {
    this.isConsuming = false;
    this.connection = null;
    this.channel = null;

    // Attempt reconnection
    if (!this.reconnectTimer) {
      this.reconnectTimer = setTimeout(async () => {
        this.reconnectTimer = null;
        console.log("Attempting to reconnect to RabbitMQ...");
        const connected = await this.connect();
        if (connected) {
          // Restart consumption if it was active before
          await this.startConsuming();
        }
      }, this.reconnectInterval);
    }
  }

  async createChannel(): Promise<Channel | null> {
    try {
      if (!this.connection) {
        const connected = await this.connect();
        if (!connected) return null;
      }

      // Reuse existing channel if available
      if (this.channel) {
        return this.channel;
      }

      this.channel = await this.connection!.createChannel();
      console.log("Channel created");

      // Configure QoS (prefetch) for better load distribution
      // This limits how many unacknowledged messages the server will send
      await this.channel.prefetch(10);

      // Setup channel event listeners
      this.channel.on("error", (err) => {
        console.error("Channel error:", err);
        this.channel = null;
      });

      this.channel.on("close", () => {
        console.warn("Channel closed");
        this.channel = null;
      });

      // Assert queue on channel creation
      await this.assertQueue(this.channel);

      return this.channel;
    } catch (err) {
      console.error("Failed to create channel to RabbitMQ:", err);
      this.channel = null;
      return null;
    }
  }

  async getChannel(): Promise<Channel | null> {
    if (this.channel) return this.channel;
    return this.createChannel();
  }

  async close(): Promise<void> {
    try {
      this.isConsuming = false;

      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }

      if (this.channel) {
        await this.channel.close();
        this.channel = null;
      }

      if (this.connection) {
        await this.connection.close();
        this.connection = null;
      }

      DescriptionConsumer._instance = null;
      console.log("RabbitMQ consumer connections closed");
    } catch (err) {
      console.error("Failed to close connection to RabbitMQ:", err);
    }
  }

  async assertQueue(channel: Channel): Promise<void> {
    try {
      const res = await channel.assertQueue(QUEUE_NAME, { durable: true });
      console.log(`Queue ${QUEUE_NAME} asserted`);
      console.log(`[${res.consumerCount}] consumers are connected to this queue`);
      console.log(`[${res.messageCount}] messages are waiting in this queue`);
    } catch (err) {
      console.error(`Failed to assert queue ${QUEUE_NAME}:`, err);
      throw err; // Propagate error as this is a critical operation
    }
  }

  async startConsuming(messageHandler?: (message: DescriptionType) => Promise<void>): Promise<boolean> {
    try {
      if (this.isConsuming) {
        console.log("Already consuming messages");
        return true;
      }

      const channel = await this.getChannel();
      if (!channel) {
        throw new Error("No channel available to consume messages");
      }

      // Default message handler if none provided
      const defaultHandler = async (message: any) => {
        console.log("Received message:", message);
        return Promise.resolve();
      };

      const handler = messageHandler || defaultHandler;

      console.log(`Starting to consume messages from queue ${QUEUE_NAME}`);

      await channel.consume(
        QUEUE_NAME,
        async (msg: ConsumeMessage | null) => {
          if (msg) {
            try {
              // Parse the message content
              const content = msg.content.toString();
              const parsedMessage = JSON.parse(content);

              console.log(`Processing message: ${msg.fields.deliveryTag}`);

              // Process message with the provided handler
              await handler(parsedMessage);

              // Acknowledge the message
              channel.ack(msg);
              console.log(`Message ${msg.fields.deliveryTag} acknowledged`);
            } catch (error) {
              console.error("Error processing message:", error);

              // Reject the message and requeue it if processing fails
              channel.nack(msg, false, true);
              console.warn(`Message ${msg.fields.deliveryTag} rejected and requeued`);
            }
          }
        },
        { noAck: false },
      ); // Important: noAck: false means we'll manually acknowledge messages

      this.isConsuming = true;
      console.log(`Successfully started consuming from queue ${QUEUE_NAME}`);
      return true;
    } catch (err) {
      console.error("Failed to start consuming messages:", err);
      this.isConsuming = false;
      return false;
    }
  }

  async stopConsuming(): Promise<boolean> {
    try {
      if (!this.isConsuming) {
        return true;
      }

      const channel = await this.getChannel();
      if (!channel) {
        throw new Error("No channel available");
      }

      // This will cancel all consumers on this channel
      await channel.cancel(QUEUE_NAME);

      this.isConsuming = false;
      console.log(`Stopped consuming messages from queue ${QUEUE_NAME}`);
      return true;
    } catch (err) {
      console.error("Failed to stop consuming messages:", err);
      return false;
    }
  }

  // Method to send a message - consumers can sometimes need to produce responses
  async send(message: any): Promise<boolean> {
    try {
      const channel = await this.getChannel();
      if (!channel) {
        throw new Error("No channel available to send message");
      }

      const buffer = Buffer.from(JSON.stringify(message));
      return channel.sendToQueue(QUEUE_NAME, buffer, { persistent: true });
    } catch (err) {
      console.error(`Failed to send message to ${QUEUE_NAME} queue:`, err);
      return false;
    }
  }

  // Health check method for observability
  async checkHealth(): Promise<{ connected: boolean; channelAvailable: boolean; consuming: boolean }> {
    return {
      connected: this.connection !== null,
      channelAvailable: this.channel !== null,
      consuming: this.isConsuming,
    };
  }
}
