import Hamburger from "@/components/shared/Hamburger";
import Container from "../../components/Container";
import NavButtonGroup from "./NavButtonGroup";
import NavLinkGroup from "./NavLinkGroup";

const Navbar = () => {
  return (
    <header className="w-full py-6 sticky top-0 bg-background z-50">
      <Container>
        <nav className="w-full flex justify-between">
          <div className="flex items-center gap-3">
            <Hamburger className="block lg:hidden" />
            <h1 className="bg-linear-to-r from-primary-pressed via-60% to-[#37B7C399] bg-clip-text text-2xl xl:text-[32px] text-transparent font-semibold">
              <span className="font-lora">Skill</span>Gap
            </h1>
          </div>

          <NavLinkGroup />

          <NavButtonGroup />
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
