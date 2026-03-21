import { ArrowUp } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";

const CardCTA = ({
  imageSrc,
  title,
  targetUrl = "#",
}: {
  imageSrc: string;
  title: string;
  targetUrl: string;
}) => {
  return (
    <div className="group/parent relative flex-1 w-full min-w-77.5 h-81.25 overflow-hidden rounded-xl p-[30.5px] flex items-end hover:shadow-[0px_0px_0px_15px_rgba(213,234,236,1)] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]">
      <Image
        src={imageSrc}
        alt="career.webp"
        fill
        loading="eager"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-center absolute -z-1 group-hover/parent:scale-110 will-change-transform transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/parent:brightness-60"
      />

      <Link
        href={targetUrl}
        className="group/link w-full py-3 px-5 rounded-sm bg-primary-pressed text-primary-foreground font-lora font-medium text-xl sm:text-2xl flex will-change-transform hover:bg-primary-hover transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
      >
        <span>{title}</span>
        <ArrowUp
          size={32}
          className="rotate-45 p-1 ml-auto will-change-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
        />
      </Link>
    </div>
  );
};

export default CardCTA;
