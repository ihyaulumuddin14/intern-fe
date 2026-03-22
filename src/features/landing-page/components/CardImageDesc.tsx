import Image from "next/image";

const CardImageDesc = ({
  imageSrc,
  title,
  description,
  skills,
}: {
  imageSrc: string;
  title: string;
  description: string;
  skills: string[];
}) => {
  return (
    <div className="w-full min-w-73 p-4 rounded-[10px] bg-background flex flex-col gap-4 shadow-lg">
      <div className="w-full aspect-square overflow-hidden rounded-[10px] relative">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center"
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <h3 className="text-2xl font-semibold font-lora text-primary">
          {title}
        </h3>
        <p className="text-base font-normal line-clamp-3">{description}</p>

        <ul className="list-disc list-inside text-base font-normal text-neutral-60">
          <h4>Skill:</h4>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardImageDesc;
