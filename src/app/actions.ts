"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";

export async function addData(formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");

  if (typeof title !== "string") {
    throw new Error("Invalid title");
  }

  if (typeof content !== "string") {
    throw new Error("Invalid content");
  }

  revalidatePath("/");
  return db
    .insertInto("Post")
    .values({ title, content, updatedAt: new Date().toISOString() })
    .returningAll()
    .execute();
}

export async function removePost(formData: FormData) {
  const id = formData.get("id");

  if (typeof id !== "string") {
    throw new Error("Invalid id");
  }

  const idAsNumber = parseInt(id);

  revalidatePath("/");
  return db.deleteFrom("Post").where("id", "=", idAsNumber).execute();
}
