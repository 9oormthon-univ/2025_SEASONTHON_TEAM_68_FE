"use client";

import SleepyCharacter from "@/../public/images/sleepy_character.svg";
import Character from "@/../public/images/character.svg";
import { GradientButton } from "@/components/gradient-button";
import { Card } from "@/components/ui/basic-card";
import Image from "next/image";
import { useState } from "react";
import KanbanTask from "@/components/kanban-task";
import KanbanCandidate from "@/components/kanban-candidate";

export default function Page() {
  const [minuate, setMinuate] = useState("");
  const [status, setStatus] = useState<"default" | "loading" | "ready">(
    "ready"
  );

  function handleSubmit() {
    // TODO call ai api
    return;
  }

  return (
    <main className="w-full h-dvh flex flex-col justify-end p-12 gap-12">
      {status == "default" && (
        <div className="flex flex-col h-full items-center justify-center gap-8">
          <Image src={Character} alt="now loading" />
          <p className="text-gray-700">오늘의 회의는 어떠셨나요?</p>
        </div>
      )}
      <section className="w-full flex flex-col gap-5">
        <h3 className="top-sb-20">회의록 분석</h3>
        <Card>
          <div className="flex flex-col gap-8 items-center">
            {status === "loading" ? (
              <>
                <Image src={SleepyCharacter} alt="now loading" />
                <p>회의록을 분석하는 중 입니다..</p>
              </>
            ) : (
              <>
                <textarea
                  className="w-full max-h-96 resize-none outline-none tab-m-14 field-sizing-content"
                  placeholder="회의록을 입력해주세요."
                  value={minuate}
                  onChange={(e) => setMinuate(e.target.value)}
                  disabled={status === "ready"}
                />
                <GradientButton
                  className="self-end"
                  onClick={handleSubmit}
                  variable={status === "ready" ? "disabled" : "default"}
                >
                  할 일 추출하기 →
                </GradientButton>
              </>
            )}
          </div>
        </Card>
      </section>
      <section>
        <KanbanCandidate />
      </section>
      <section>
        <KanbanTask />
      </section>
      {/* <section>
        <Card>
          <h3 className="top-sb-20">오늘 할 일</h3>
          <Tabs defaultValue="all">
            <TabsList className="relative">
              <TabsTrigger value="all" className="z-10">
                전체
              </TabsTrigger>
              <TabsTrigger value="important" className="z-10">
                중요
              </TabsTrigger>
              <div className="absolute bottom-0 w-full border-b-2 border-gray-500" />
            </TabsList>
            <TabsContent value="all">전체 할 일</TabsContent>
            <TabsContent value="important">중요한 할 일</TabsContent>
          </Tabs>
        </Card>
      </section> */}
    </main>
  );
}
