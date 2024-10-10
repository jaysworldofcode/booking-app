import { relations } from "drizzle-orm"
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

const createdAt = timestamp("createdAt").notNull().defaultNow()
const updatedAt = timestamp("updatedAt")
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date())

export const PatientTable = pgTable(
  "patients",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    firstname: text("firstname").notNull(),
    lastname: text("lastname").notNull(),
    email: text("email"),
    contact_number: text("contact_number"),
    birthdate: text("birthdate"),
    gender: text("gender"),
    clerkUserId: text("clerkUserId"),
    createdAt,
    updatedAt,
  },
  table => ({
    patientIdIndex: index("patientIdIndex").on(table.id),
  })
)