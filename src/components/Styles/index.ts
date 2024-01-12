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

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 20px;
    height: 20px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #a7b6bb;
  }
`;

export { Button, AddButton, ListContainer };
