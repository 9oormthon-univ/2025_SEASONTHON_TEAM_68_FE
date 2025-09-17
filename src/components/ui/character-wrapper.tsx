import Image from "next/image";
import Character from "@/../public/images/character.svg";
import CharacterSleepy from "@/../public/images/character_sleepy.svg";
import { cn } from "@/lib/utils";

interface Props {
  type: "default" | "loading";
}

/**
 * 회의록 분석 페이지의 기본 캐릭터 UI 컴포넌트입니다.
 * TODO 로그인 여부 확인 후, 환영 메시지에 사용자 이름을 포함하는 기능 추가
 */
export default function Component({
  className,
  type,
  ...props
}: React.ComponentProps<"div"> & Props) {
  const { image, alt, message } = typeToProperties(type);

  return (
    <div
      className={cn(
        "flex flex-col h-full items-center justify-center gap-8 ",
        className
      )}
      {...props}
    >
      <Image src={image} alt={alt} />
      <p className="text-gray-700">{message}</p>
    </div>
  );
}

function typeToProperties(type: Props["type"]) {
  switch (type) {
    case "loading":
      return {
        image: CharacterSleepy,
        alt: "now loading",
        message: "회의록을 분석하는 중 입니다..",
      };
    default:
      return {
        image: Character,
        alt: "welcome image",
        message: "오늘의 회의는 어떠셨나요?",
      };
  }
}
