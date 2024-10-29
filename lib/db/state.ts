import { db } from "./config";
import { user as userSchema } from "./schema";
import { eq, sql } from "drizzle-orm";

const getUserParam = {
  id_user: userSchema.id_user,
  email: userSchema.email,
  username: userSchema.username,
  image: userSchema.image,
  log: userSchema.log,
};

const user = {
  insert: db
    .insert(userSchema)
    .values({
      id_user: sql.placeholder("id_user"),
      username: sql.placeholder("username"),
      email: sql.placeholder("email"),
      password: sql.placeholder("password"),
      image: "",
    })
    .prepare(),

  check: db
    .select({ username: userSchema.username, status: userSchema.status })
    .from(userSchema)
    .where(
      sql`${userSchema.email} = ${sql.placeholder("email")} and ${userSchema.password} = ${sql.placeholder("password")}`,
    )
    .prepare(),

  getAll: db.select(getUserParam).from(userSchema).prepare(),

  getById: db
    .select(getUserParam)
    .from(userSchema)
    .where(sql`${userSchema.id_user} = ${sql.placeholder("id_user")}`)
    .prepare(),

  getByEmail: db
    .select(getUserParam)
    .from(userSchema)
    .where(sql`${userSchema.email} = ${sql.placeholder("email")}`)
    .prepare(),

  getEqEmail: db
    .select(getUserParam)
    .from(userSchema)
    .where(eq(userSchema.email, sql.placeholder("email")))
    .prepare(),

  updateLog: db
    .update(userSchema)
    .set({ log: sql`NOW()` })
    .where(eq(userSchema.id_user, sql.placeholder("id_user")))
    .prepare(),

  delete: db
    .delete(userSchema)
    .where(eq(userSchema.id_user, sql.placeholder("id_user")))
    .prepare(),
};

export const state = { user };
