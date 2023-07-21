import { db } from "./db";
import { addData, removePost } from "./actions";
import { kv } from "@/bindings";

export const runtime = "edge";

export const revalidate = 0;

const inputClassNames =
  "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const Input = ({ label, name }: { label: string; name: string }) => (
  <div className="flex flex-col">
    <label htmlFor={name}>{label}</label>
    <input className={inputClassNames} name={name} />
  </div>
);

const TextArea = ({ label, name }: { label: string; name: string }) => (
  <div className="flex flex-col">
    <label htmlFor={name}>{label}</label>
    <textarea className={inputClassNames} name={name} />
  </div>
);

export default async function Home() {
  const data = await db.selectFrom("Post").selectAll().execute();
  const pageViews = Number((await kv.get("pageViews")) ?? "0");

  await kv.put("pageViews", String(pageViews + 1));

  return (
    <main className="flex min-h-screen items-center mx-auto flex-col p-24">
      <h1 className="text-2xl mb-4 font-bold">
        Posts ({data.length}) - Page Views ({pageViews})
      </h1>
      <div className="flex gap-16 justify-center w-[800px]">
        <form action={addData} className="w-full flex flex-col gap-3">
          <p className="text-lg ">Add post</p>
          <Input label="Title" name="title" />
          <TextArea label="Content" name="content" />
          <button
            className="h-10 w-full p-2 bg-slate-600 rounded-md text-white"
            type="submit"
          >
            Submit
          </button>
        </form>
        <div className="w-full flex gap-4 flex-col">
          <p className="text-lg">Posts</p>
          {data.map((post) => (
            <div className="border rounded-md shadow-sm p-4" key={post.id}>
              <div className="flex justify-between">
                <h2 className="font-semibold">{post.title}</h2>
                <form action={removePost}>
                  <input type="hidden" name="id" value={post.id} />
                  <button
                    className="ml-2 h-6 w-6 rounded-md bg-red-500 text-white"
                    type="submit"
                  >
                    X
                  </button>
                </form>
              </div>
              <p className="mt-2">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
