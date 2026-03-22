"use client";

import { useLandingPageMenuStore } from "@/stores/useLandingPageMenuStore";
import styled from "styled-components";

const Hamburger = ({ className }: { className?: string }) => {
  const { isOpen, open, close } = useLandingPageMenuStore();

  return (
    <StyledWrapper>
      <div className={`burger-icon ${className}`}>
        <label
          className="burger"
          htmlFor="burger"
        >
          <input
            className="line"
            type="checkbox"
            onChange={(e) => {
              e.target.checked ? open() : close();
            }}
            autoComplete="off"
            checked={isOpen}
            id="burger"
          />
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .burger {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    user-select: none;
    cursor: pointer;
    transition: 300ms;
    border-radius: 10px;
  }
  .burger input[type="checkbox"] {
    appearance: none;
    transition: 300ms;
  }

  .burger::before,
  .burger::after {
    content: "";
    transition: 300ms;
    transform-origin: center center;
  }

  .burger::before {
    transform: translateY(8px);
  }
  .burger::after {
    transform: translateY(-8px);
  }
  .burger .line,
  .burger::before,
  .burger::after {
    width: 25px;
    height: 2.1px;
    display: block;
    background-color: var(--foreground);
    border-radius: 5px;
    position: absolute;
  }

  .burger .line:checked {
    width: 0;
    transition-delay: 100ms;
  }
  .burger:has(.line:checked)::before {
    animation: animation1 400ms ease-out 0s 1 both;
  }
  .burger:has(.line:checked)::after {
    animation: animation2 400ms ease-out 0s 1 both;
  }

  .burger:hover {
    background: var(--primary-surface);
    border-radius: 50%;
  }

  .burger:hover .line,
  .burger:hover::before,
  .burger:hover::after {
    background: var(--foreground);
  }

  .burger:active {
    scale: 0.95;
  }
  @keyframes animation1 {
    0% {
      transform: translateY(8px) rotate(0deg);
    }
    50% {
      transform: translateY(0px) rotate(0deg);
    }
    100% {
      transform: translateY(0px) rotate(45deg);
    }
  }
  @keyframes animation2 {
    0% {
      transform: translateY(-8px) rotate(0deg);
    }
    50% {
      transform: translateY(0px) rotate(0deg);
    }
    100% {
      transform: translateY(0px) rotate(-45deg);
    }
  }
`;

export default Hamburger;
