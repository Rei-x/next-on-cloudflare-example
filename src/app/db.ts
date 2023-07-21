import { DB } from "@/types/database";
import { binding } from "cf-bindings-proxy";
import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";

const dbBinding = binding<D1Database>("DB");
export const db = new Kysely<DB>({
  dialect: new D1Dialect({
    database: dbBinding,
  }),
});
