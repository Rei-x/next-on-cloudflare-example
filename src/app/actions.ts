"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/bindings";

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
  await db
    .prepare("INSERT INTO Post (title, content, updatedAt) VALUES (?, ?, ?)")
    .bind(title, content, new Date().toISOString())
    .run();
}

export async function removePost(formData: FormData) {
  const id = formData.get("id");

  if (typeof id !== "string") {
    throw new Error("Invalid id");
  }

  const idAsNumber = parseInt(id);

  revalidatePath("/");
  await db.prepare("DELETE FROM Post WHERE id = ?").bind(idAsNumber).run();
}
