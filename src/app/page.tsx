"use client";

import Character from "@/../public/images/character.svg";
import CharacterSleepy from "@/../public/images/character_sleepy.svg";
import { GradientButton } from "@/components/gradient-button";
import KanbanCandidate from "@/components/kanban-candidate";
import { Card } from "@/components/ui/card";
import { UnclassifiedTask } from "@/lib/type";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [minuate, setMinuate] = useState("");
  const [status, setStatus] = useState<"default" | "loading" | "ready">(
    "default"
  );
  const [candidates, setCandidates] = useState<UnclassifiedTask[]>([]);

  async function handleSubmit() {
    setStatus("loading");
    // axios
    //   .post("http://localhost:8080/api/categorizing/text", {
    //     content: minuate,
    //   })
    //   .then(function (response) {
    //     setCandidates(
    //       mapDto(response.data.todos_by_person as UnclassifiedTaskResponse[])
    //     );
    //     setStatus("ready");
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
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
            {status === "loading" ? (
              <>
                <Image src={CharacterSleepy} alt="now loading" />
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
      {status === "ready" && (
        <section className="flex flex-col gap-8 items-center">
          <KanbanCandidate defaultCandidates={candidates} />
          <GradientButton className="self-end">
            <Link href="/tasks">저장하기 →</Link>
          </GradientButton>
        </section>
      )}
    </main>
  );
}

