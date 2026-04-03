"use client";

import styled from "styled-components";

const HamburgerDashboard = ({
  className,
  open,
}: {
  className?: string;
  open: boolean;
}) => {
  return (
    <StyledWrapper>
      <div
        className={`burger ${className ?? ""}`}
        data-open={open}
        aria-hidden="true"
      >
        <span className="line line-top" />
        <span className="line line-mid" />
        <span className="line line-bot" />
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
    gap: 5px;
    border-radius: 10px;
    transition: background 300ms, border-radius 300ms;
    pointer-events: none;
  }
 
  .burger:hover {
    background: var(--primary-surface);
    border-radius: 50%;
  }
 
  .line {
    width: 25px;
    height: 2.1px;
    background-color: var(--foreground);
    border-radius: 5px;
    display: block;
  }
`;

export default HamburgerDashboard;