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
    active: boolean("active").notNull().default(true),
    clerkUserId: text("clerkUserId"),
    createdAt,
    updatedAt,
  },
  table => ({
    // patientIdIndex: index("patientIdIndex").on(table.id),
  })
)

// export const patientRelations = relations(PatientTable, ({ many }) => ({
//   appointments: many(AppointmentsTable),
// }))

export const AppointmentsTable = pgTable(
  "appointments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    patientId: uuid("patientId")
      .notNull()
      .references(() => PatientTable.id, { onDelete: "cascade" }),
    startTime: text("startTime").notNull(),
    endTime: text("endTime").notNull(),
    scheduleDate: timestamp("scheduleDate").notNull(),
    clerkUserId: text("clerkUserId"),
    createdAt,
    updatedAt,
  },
  table => ({
    // patientIdIndex: index("patientIdIndex").on(table.patientId),
    // appointmentsIdIndex: index("appointmentsIdIndex").on(table.id),
  })
)

// export const PatientAppointmentRelations = relations(
//   AppoitmentTable,
//   ({ one }) => ({
//     schedule: one(ScheduleTable, {
//       fields: [ScheduleAvailabilityTable.scheduleId],
//       references: [ScheduleTable.id],
//     }),
//   })
// )
