import { Channel, ChannelModel, connect } from "amqplib";
import { DescriptionQueue, DescriptionType, DescriptionSchema, CONNECTION_URL, QUEUE_NAME } from "./common";

export class DescriptionProducer implements DescriptionQueue {
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;
  private static _instance: DescriptionProducer | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private readonly reconnectInterval = 5000; // 5 seconds

  private constructor() {
    // Empty private constructor
  }

  public static getInstance(): DescriptionProducer {
    if (!DescriptionProducer._instance) {
      DescriptionProducer._instance = new DescriptionProducer();
    }
    return DescriptionProducer._instance;
  }

  async connect(): Promise<boolean> {
    try {
      if (this.connection) {
        return true;
      }

      this.connection = await connect(CONNECTION_URL);

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
    this.connection = null;
    this.channel = null;

    // Attempt reconnection
    if (!this.reconnectTimer) {
      this.reconnectTimer = setTimeout(async () => {
        this.reconnectTimer = null;
        await this.connect();
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

      DescriptionProducer._instance = null;
    } catch (err) {
      console.error("Failed to close connection to RabbitMQ:", err);
    }
  }

  async assertQueue(channel: Channel): Promise<void> {
    try {
      const res = await channel.assertQueue(QUEUE_NAME, { durable: true });
      console.log(`[${res.consumerCount}] consumers are connected to this queue`);
      console.log(`[${res.messageCount}] messages are produced in this queue`);
    } catch (err) {
      console.error(`Failed to assert queue ${QUEUE_NAME}:`, err);
      throw err; // Propagate error as this is a critical operation
    }
  }

  async send(message: DescriptionType): Promise<boolean> {
    try {
      const channel = await this.getChannel();
      if (!channel) {
        throw new Error("No channel available to send message");
      }

      const parsed = DescriptionSchema.safeParse(message);
      if (!parsed.success) {
        throw new Error(`Invalid schema provided: ${parsed.error}`);
      }

      const buffer = Buffer.from(JSON.stringify(parsed.data));
      return channel.sendToQueue(QUEUE_NAME, buffer, { persistent: true });
    } catch (err) {
      console.error(`Failed to send message to ${QUEUE_NAME} queue:`, err);
      return false;
    }
  }

  // Health check method for observability
  async checkHealth(): Promise<{ connected: boolean; channelAvailable: boolean }> {
    return { connected: this.connection !== null, channelAvailable: this.channel !== null };
  }
}
