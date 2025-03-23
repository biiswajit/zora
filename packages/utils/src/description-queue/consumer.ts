import { ChannelModel, connect, Channel, ConsumeMessage } from "amqplib";
import { Queue, DescriptionSchema, DescriptionType, CONNECTION_URL, QUEUE_NAME } from "./common";

export class DescriptionConsumer implements Queue {
  private connection: ChannelModel | null;
  private static _instance: DescriptionConsumer | null;

  private constructor(conn: ChannelModel) {
    this.connection = conn;
  }

  static async getInstance(): Promise<DescriptionConsumer | null> {
    if (!DescriptionConsumer._instance) {
      try {
        const conn = await connect(CONNECTION_URL);
        DescriptionConsumer._instance = new DescriptionConsumer(conn);
      } catch (err) {
        console.error("failed to create connection to rabbitmq");
        return null;
      }
    }
    return DescriptionConsumer._instance;
  }

  async createChannel(): Promise<Channel | null> {
    try {
      if (!this.connection) {
        throw new Error("no connection found with rabbitmq");
      }
      return await this.connection.createChannel();
    } catch (err) {
      console.error("failed to create channel to rabbitmq");
      return null;
    }
  }

  async close(): Promise<void> {
    try {
      if (!this.connection) {
        throw new Error("no connection found with rabbitmq");
      }
      await this.connection.close();
      this.connection = null;
      DescriptionConsumer._instance = null;
    } catch (err) {
      console.error("failed to close connection to rabbitmq");
      return;
    }
  }

  async assertQueue(channel: Channel): Promise<void> {
    const res = await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log(`[${res.consumerCount}] consumers are connected to this queue`);
    console.log(`[${res.messageCount}] messages are produced in this queue`);
    return;
  }

  async receive(channel: Channel, callback: (data: DescriptionType) => Promise<void>): Promise<void> {
    try {
      if (!this.connection) {
        throw new Error("no connection found with rabbitmq");
      }
      channel.consume(QUEUE_NAME, async (message) => {
        if (!message) {
          return;
        }
        const temp = message.content.toString();
        const data = JSON.parse(temp);
        const parsed = DescriptionSchema.safeParse(data);
        if (!parsed.success) {
          return;
        }
        // complete the task when complete send acknowledgement
        await callback(parsed.data);
        this.acknowledge(channel, message);
      });
    } catch (err) {
      console.error("failed to receive message from queue");
      return;
    }
  }

  acknowledge(channel: Channel, message: ConsumeMessage): void {
    try {
      if (!this.connection) {
        throw new Error("no connection found with rabbitmq");
      }
      channel.ack(message);
    } catch (err) {
      console.error("failed to send acknowledgement");
      return;
    }
  }
}
