import styled, { css } from "styled-components";

const Button = styled.a<{ $primary?: boolean }>`
  background: transparent;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background: #ffffff40;
  }

  ${(props) =>
    props.$primary &&
    css`
      &:hover {
        background: #30303040;
      }
    `}
`;

const AddButton = styled.a`
  background: slate-300;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    filter: brightness(0.85);
  }
`;

export { Button, AddButton };
