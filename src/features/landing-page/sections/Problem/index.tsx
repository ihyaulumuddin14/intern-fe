import CardIcon from "../../components/CardIcon";
import Container from "../../components/Container";
import { PROBLEM_LIST } from "../../constants";

const ProblemSection = () => {
  return (
    <section className="w-full py-[clamp(3rem,6vw,6rem)]">
      <Container className="flex flex-col gap-10">
        <div className="w-[87%] flex flex-col gap-5">
          <h2 className="leading-[1.2] font-semibold text-3xl sm:text-4xl lg:text-5xl">
            Banyak Mahasiswa Tidak Tahu{" "}
            <span className="font-bold font-lora text-primary">
              Seberapa Siap Skill
            </span>{" "}
            Mereka untuk Dunia Kerja
          </h2>
          <p className="text-base sm:text-lg lg:text-2xl text-neutral-70 leading-normal">
            Banyak mahasiswa dan fresh graduate kesulitan memahami skill apa
            yang dibutuhkan industri serta seberapa siap mereka untuk memasuki
            karier yang diinginkan.
          </p>
        </div>
        <div className="w-full">
          <ul className="w-full grid grid-cols-[repeat(auto-fill,minmax(292px,1fr))] gap-6">
            {PROBLEM_LIST.map((problem) => (
              <CardIcon
                key={problem.title}
                title={problem.title}
                description={problem.description}
              />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default ProblemSection;
