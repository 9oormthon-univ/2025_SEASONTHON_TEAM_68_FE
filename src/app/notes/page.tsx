import { Card } from "@/components/ui/card";
import { notes } from "@/lib/dummy";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function Page() {

  return (
    <main className="w-full flex flex-col p-12 gap-12">
      {notes.map((note) => (
        <section key={note.id} className="flex flex-col gap-5">
          <h3 className="top-sb-20">
            {new Date(note.createdAt).toLocaleDateString()}
          </h3>
          <Card key={note.id}>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="w-full flex px-5 border-l-2 border-l-[#03BF6A] tab-m-14">
                    {note.summary}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-5">
                  <hr />
                  <p className="body-r-14">"본문" : {note.content}</p>
                  <p className="body-r-14">"가이드" : {note.guide}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </section>
      ))}
    </main>
  );
}
