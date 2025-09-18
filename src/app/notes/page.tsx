import { Card } from "@/components/ui/card";
import { notes } from "@/lib/dummy";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NoteType } from "@/lib/type";

export default async function Page() {
  return (
    <main className="w-full flex flex-col p-12 gap-12">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </main>
  );
}

function NoteCard({ note }: { note: NoteType }) {
  return (
    <section key={note.id} className="flex flex-col gap-5">
      <h3 className="top-sb-20">
        {new Date(note.createdAt).toLocaleDateString()}
      </h3>
      <Card key={note.id}>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <ul className="w-full flex flex-col border-l-2 border-l-[#03BF6A] tab-m-14 list-disc pl-10">
                {note.summary.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-5">
              <hr />
              <p className="body-r-14">{note.content}</p>
              <hr />
              <div className="title-sb-16">추가된 할 일</div>
              {/* TODO tasks */}
              <hr />
              <p className="body-r-14">{note.guide}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </section>
  );
}
