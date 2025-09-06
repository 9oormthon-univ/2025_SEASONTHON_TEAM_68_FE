import { Card } from "@/components/ui/basic-card";
import { Note } from "@/lib/type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function Page() {
  const data = await fetch("http://localhost:8080/api/meeting");
  const posts: Note[] = await data.json();

  return (
    <main className="w-full flex flex-col p-12 gap-12">
      {posts.map((post) => (
        <section key={post.id} className="flex flex-col gap-5">
          <h3 className="top-sb-20">
            {new Date(post.createdAt).toLocaleDateString()}
          </h3>
          <Card key={post.id}>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="w-full flex px-5 border-l-2 border-l-[#03BF6A] tab-m-14">
                    {post.summary}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-5">
                  <hr />
                  <p className="body-r-14">{post.rawText}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </section>
      ))}
    </main>
  );
}
