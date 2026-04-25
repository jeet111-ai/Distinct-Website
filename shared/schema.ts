import { pgTable, text, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  location: text("location"), // Added to track which location they are interested in
  message: text("message"),
  numberOfSeats: varchar("number_of_seats", { length: 50 }),
  timeline: varchar("timeline", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookings).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  company: true,
  location: true,
  message: true,
  numberOfSeats: true,
  timeline: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
