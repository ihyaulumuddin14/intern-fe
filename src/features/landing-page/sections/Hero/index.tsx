import { Button } from "@/components/ui/button";
import Container from "../../components/Container";
import CardCTA from "../../components/CardCTA";

const HeroSection = () => {
  return (
    <section id="home" className="w-full py-[clamp(3rem,6vw,6rem)]">
      <Container className="flex flex-col gap-13">
        {/* MAIN HOOK */}
        <div className="w-full flex flex-col items-center gap-8 lg:gap-5 text-center">
          <h1 className="text-3xl  sm:text-5xl lg:text-[64px] font-semibold px-[clamp(10px,5vw,50px)] leading-[1.2]">
            Ketahui Seberapa Siap{" "}
            <span className="font-bold font-lora text-primary">Skill</span> Kamu
            untuk <span className="text-primary">Karir Impian</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-2xl text-neutral-70 max-w-219.5 font-normal">
            SkillGap membantu kamu menganalisis skill yang sudah dimiliki,
            menemukan skill yang masih kurang, dan memberikan rekomendasi untuk
            berkembang.
          </p>

          <Button
            withArrow
            size={"lg"}
          >
            Get Started
          </Button>
        </div>

        {/* CAREER CARD */}
        {/* <div className="w-full grid gap-6 grid-cols-[repeat(auto-fill,minmax(310px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(397px,1fr))]"> */}
        <div className="w-full gap-6 flex flex-wrap">
          <CardCTA
            title="Frontend Developer"
            imageSrc="/assets/frontend-hooks.webp"
            targetUrl="#"
          />
          <CardCTA
            title="UI/UX Design"
            imageSrc="/assets/uiux-hooks.webp"
            targetUrl="#"
          />
          <CardCTA
            title="Product Management"
            imageSrc="/assets/pm-hooks.webp"
            targetUrl="#"
          />
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
