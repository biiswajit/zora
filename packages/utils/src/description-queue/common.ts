import { Channel, ConsumeMessage } from "amqplib";
import { z } from "zod";

// hared description schema and type
export const DescriptionSchema = z.object({
  userId: z.string().readonly(),
  description: z.string().min(10).readonly(),
});
export type DescriptionType = z.infer<typeof DescriptionSchema>;

// Shared rabbitmq url
export const CONNECTION_URL = "amqp://localhost/";

// Shared queue name
export const QUEUE_NAME = "queue:description";

// Queue interface
export interface Queue {
  createChannel(): Promise<Channel | null>;
  send?(channel: Channel, message: DescriptionType): boolean;
  receive?(channel: Channel, callback: any): Promise<void>;
  acknowledge?(channel: Channel, message: ConsumeMessage): void;
  close(): Promise<void>;
}
