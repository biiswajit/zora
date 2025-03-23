import { Channel, ChannelModel, connect } from "amqplib";
import { Queue, DescriptionType, DescriptionSchema, CONNECTION_URL, QUEUE_NAME } from "./common";

export class DescriptionProducer implements Queue {
  private connection: ChannelModel | null;
  private static _instance: DescriptionProducer | null;

  private constructor(conn: ChannelModel) {
    this.connection = conn;
  }

  public static async getInstance(): Promise<DescriptionProducer | null> {
    if (!DescriptionProducer._instance) {
      try {
        const conn = await connect(CONNECTION_URL);
        DescriptionProducer._instance = new DescriptionProducer(conn);
      } catch (err) {
        console.error("failed to create connection to rabbitmq");
        return null;
      }
    }
    return DescriptionProducer._instance;
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
      DescriptionProducer._instance = null;
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

  send(channel: Channel, message: DescriptionType): boolean {
    try {
      if (!this.connection) {
        throw new Error("no connection found with rabbitmq");
      }

      const parsed = DescriptionSchema.safeParse(message);
      if (!parsed.success) {
        throw new Error("invalid schema provided");
      }

      const buffer = Buffer.from(JSON.stringify(parsed.data));
      return channel.sendToQueue(QUEUE_NAME, buffer);
    } catch (err) {
      console.error(`failed to send message to ${QUEUE_NAME} queue`);
      return false;
    }
  }
}
