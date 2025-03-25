import { Channel } from "amqplib";
import { z } from "zod";

// shared description schema and type
export const DescriptionSchema = z.object({
  userId: z.string().readonly(),
  description: z.string().min(10).readonly(),
});
export type DescriptionType = z.infer<typeof DescriptionSchema>;

// Shared rabbitmq url
export const CONNECTION_URL = "amqp://localhost/";

// Shared queue name
export const QUEUE_NAME = "user-description-queue";

// Queue interface
export interface DescriptionQueue {
  connect(): Promise<boolean>;
  createChannel(): Promise<Channel | null>;
  getChannel(): Promise<Channel | null>;
  close(): Promise<void>;
  assertQueue(channel: Channel): Promise<void>;
  send?(message: DescriptionType): Promise<boolean>;
  checkHealth(): Promise<{ connected: boolean; channelAvailable: boolean }>;
  startConsuming?(messageHandler?: (message: DescriptionType) => Promise<void>): Promise<boolean>;
  stopConsuming?(): Promise<boolean>;
}
