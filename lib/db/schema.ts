import {
  mysqlTable,
  varchar,
  char,
  timestamp,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

const status = ["verified", "pending"] as const;

const user = mysqlTable("user", {
  id_user: char("id_user", { length: 255 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }).notNull(),
  status: mysqlEnum("status", status).notNull().default("pending"),
  log: timestamp("log").notNull().defaultNow(),
});

type UserCredentials = Omit<typeof user.$inferSelect, "password">;
type Status = (typeof status)[number];

export type { UserCredentials, Status };
export { user };
