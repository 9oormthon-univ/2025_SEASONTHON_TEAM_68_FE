"use client";

import Character from "@/../public/images/character.svg";
import Button from "@/components/button";
import { Card } from "@/components/ui/card";
import UnclassifiedTaskBoard from "@/components/unclassified-task-board";
import { unclassifiedTasks as initTasks } from "@/lib/dummy";
import { TaskType } from "@/lib/type";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [status, setStatus] = useState<"default" | "loading" | "done">("done");
  const [note, setNote] = useState("");
  const [tasks, setTasks] = useState<TaskType[]>(initTasks);

  async function extractTasks() {
    setStatus("loading");
  }

  return (
    <main className="w-full h-dvh flex flex-col justify-end p-12 gap-12">
      {status == "default" && (
        <div className="flex flex-col h-full items-center justify-center gap-8">
          <Image src={Character} alt="welcome image" />
          <p className="text-gray-700">오늘의 회의는 어떠셨나요?</p>
        </div>
      )}
      <section className="w-full flex flex-col gap-5">
        <h3 className="top-sb-20">회의록 분석</h3>
        <Card>
          <div className="flex flex-col gap-8 items-center">
            {status == "loading" && (
              <div className="h-48 flex flex-col gap-4 items-center justify-center">
                <span className="top-sb-20">할 일을 추출하는 중입니다...</span>
                <div className="flex items-center justify-center gap-4">
                  <span className="sr-only">Loading...</span>
                  <div className="h-3 w-3 bg-[#03BF6A] rounded-full animate-pulse [animation-delay:-0.133s]" />
                  <div className="h-3 w-3 bg-[#BBD4C9] rounded-full animate-pulse [animation-delay:-0.66s]" />
                  <div className="h-3 w-3 bg-[#D6E4CD] rounded-full animate-pulse" />
                </div>
              </div>
            )}
            {status !== "loading" && (
              <>
                <textarea
                  className="w-full max-h-96 resize-none outline-none tab-m-14 field-sizing-content"
                  placeholder="회의록을 입력해주세요."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  disabled={status !== "default"}
                />
                <Button
                  variant="gradient"
                  className="self-end"
                  onClick={extractTasks}
                  disabled={note.length === 0 || status !== "default"}
                >
                  할 일 추출하기 →
                </Button>
              </>
            )}
          </div>
        </Card>
      </section>
      {status === "done" && (
        <section className="flex flex-col gap-8 items-center">
          <UnclassifiedTaskBoard initTasks={tasks} />
        </section>
      )}
    </main>
  );
}
