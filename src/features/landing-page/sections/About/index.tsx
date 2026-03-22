import Image from "next/image";
import Container from "../../components/Container";

const About = () => {
  return (
    <section id="about" className="w-full py-[clamp(3rem,6vw,6rem)]">
      <Container className="flex flex-col-reverse md:grid md:flex-row md:grid-cols-2 gap-6">
        <div className="w-full relative overflow-hidden rounded-xl aspect-video">
          <Image
            src={"/assets/skillgap-about.webp"}
            alt="skillgap-about.webp"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-center object-cover"
          />
        </div>
        <div className="w-full flex flex-col gap-4 justify-center">
          <h2 className="w-fit bg-linear-to-r from-primary-pressed via-60% to-[#37B7C399] bg-clip-text text-3xl xl:text-[40px] text-transparent font-semibold">
            <span className="font-lora">Skill</span>Gap
          </h2>
          <p className="text-base sm:text-lg lg:text-2xl text-neutral-70 leading-normal">
            Hadir untuk membantu mahasiswa dan fresh graduate memahami kebutuhan
            industri dan mengukur kesiapan skill mereka secara lebih terarah.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default About;
