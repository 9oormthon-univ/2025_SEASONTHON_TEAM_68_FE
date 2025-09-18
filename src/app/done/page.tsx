import CharacterHappy from "@/../public/images/character_happy.svg";
import Image from "next/image";
import Button from "@/components/button";
import Link from "next/link";

export default async function Page() {
  return (
    <main className="w-full flex flex-col p-12 gap-12 items-center justify-center">
      <section className="flex flex-col gap-16 items-center">
        <div className="flex flex-col items-center font-semibold text-[28px]">
          <div className="flex gap-1.5">
            <span className="text-[#03BF6A]">할 일 등록</span>
            <span>완료!</span>
          </div>
          <span>지금 바로 일을 시작해보세요.</span>
        </div>
        <Image src={CharacterHappy} alt="happy character image" />
        <div className="flex gap-12">
          <Button variant="gradient">
            <Link href="/tasks">할 일 목록 →</Link>
          </Button>
          <Button>
            <Link href="/">새 회의록 입력</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
