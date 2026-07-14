import { pgTable, uuid, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";

export const portfolioItems = pgTable("portfolio_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  artist: text("artist"),
  genreTag: text("genre_tag"),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"), // URL returned by Vercel Blob
  videoUrl: text("video_url"), // YouTube/streaming link
  isFeatured: boolean("is_featured").default(false),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message"),
  status: text("status").default("novo"), // novo | respondido
  createdAt: timestamp("created_at").defaultNow(),
});

export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(), // e.g. "hero_views_counter"
  value: text("value"),
});

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
