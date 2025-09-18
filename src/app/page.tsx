"use client";

import { GradientButton } from "@/components/button";
import { Card } from "@/components/ui/card";
import CharacterWrapper from "@/components/ui/character-wrapper";
import UnclassifiedBoard from "@/components/unclassified-board";
import { UnclassifiedTask } from "@/lib/type";
import { useState } from "react";
import { unclassifiedTasks as initTasks } from "@/lib/dummy";

export default function Page() {
  const [status, setStatus] = useState<"default" | "loading" | "done">("done");
  const [note, setNote] = useState("");
  const [tasks, setTasks] = useState<UnclassifiedTask[]>(initTasks);

  async function extractTasks() {
    setStatus("loading");
  }

  return (
    <main className="w-full h-dvh flex flex-col justify-end p-12 gap-12">
      {status == "default" && <CharacterWrapper type="default" />}
      <section className="w-full flex flex-col gap-5">
        <h3 className="top-sb-20">회의록 분석</h3>
        <Card>
          <div className="flex flex-col gap-8 items-center">
            {status == "loading" && <CharacterWrapper type="loading" />}
            {status !== "loading" && (
              <>
                <textarea
                  className="w-full max-h-96 resize-none outline-none tab-m-14 field-sizing-content"
                  placeholder="회의록을 입력해주세요."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  disabled={status !== "default"}
                />
                <GradientButton
                  className="self-end"
                  onClick={extractTasks}
                  disabled={note.length === 0 || status !== "default"}
                >
                  할 일 추출하기 →
                </GradientButton>
              </>
            )}
          </div>
        </Card>
      </section>
      <section className="flex flex-col gap-8 items-center">
        <UnclassifiedBoard initTasks={tasks} />
      </section>
    </main>
  );
}
