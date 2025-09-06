import Calendar from "@/components/calendar";

export default function Page() {
  return (
    <main className="w-full flex flex-col p-12 gap-12">
      <section className="flex flex-col gap-5">
        <Calendar />
      </section>
    </main>
  );
}
