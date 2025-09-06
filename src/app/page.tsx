import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function Page() {
  const now = new Date();

  return (
    <>
      <section className="flex flex-col gap-5">
        <h3 className="top-sb-20">
          {now.getFullYear() +
            "년 " +
            (now.getMonth() + 1) +
            "월 " +
            now.getDate() +
            "일"}
        </h3>
        <Card>
          <div className="flex items-center justify-between">
            <span className="tab-m-14 text-gray-700">
              회의록을 입력해주세요.
            </span>
            <Link
              className="flex items-center justify-center w-40 h-10 tab-m-14 bg-linear-to-r from-[#F7F7F7] to-[#52FFAE] rounded-full"
              href="/task"
            >
              할 일 추출하기 →
            </Link>
          </div>
        </Card>
      </section>
      <section>
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
      </section>
    </>
  );
}
