import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CardIcon from "../components/CardIcon";
import CardImageDesc from "../components/CardImageDesc";
import CardTextOnly from "../components/CardTextOnly";

const HeroSection = () => {
  return (
    <section className="w-full py-[clamp(2rem,6vw,5rem)]">
      {/* MAIN HOOK */}
      <div className="w-full flex flex-col items-center gap-8 lg:gap-5 text-center">
        <h1 className="text-3xl  sm:text-5xl lg:text-[64px] font-semibold px-[clamp(10px,5vw,50px)] leading-[1.2]">
          Ketahui Seberapa Siap{" "}
          <span className="font-bold font-lora text-primary">Skill</span>{" "}
          Kamu untuk{" "}
          <span className="text-primary">Karir Impian</span>
        </h1>

        <p className="text-base sm:text-lg lg:text-2xl text-neutral-70 max-w-219.5 font-normal">
          SkillGap membantu kamu menganalisis skill yang sudah dimiliki, menemukan skill yang masih kurang, dan memberikan rekomendasi untuk berkembang.
        </p>

        <Button
          size={"lg"}
        >
          Get Started
          <ArrowRight />
        </Button>
      </div>

      {/* CAREER CARD */}
      <div>
        <CardIcon
          title="someTitle"
          description="LoremIpsum"
        />
        <CardImageDesc
          imageSrc="/assets/data-analyst-career.webp"
          title="Data Analyst"
          description="Mengolah dan menganalisis data untuk menghasilkan insight yang dapat membantu perusahaan dalam mengambil keputusan."
          skills={["SQL", "Python Programming", "Data Analysist"]}
        />
        <CardTextOnly
          title="Pilih Target Karier"
          description="Pengguna memilih karier yang ingin dicapai, seperti Data Analyst, UI/UX Designer, atau Frontend Developer."
        />
      </div>
    </section>
  );
};

export default HeroSection;
