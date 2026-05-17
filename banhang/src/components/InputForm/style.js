import styled from "styled-components";

export const WrapperInputStyle = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  font-size: 14px;

  border: 1px solid #ccc;
  border-radius: 4px;

  outline: none;

  position: relative;
  z-index: 10;
  pointer-events: auto;

  &:focus {
    border-color: rgb(255, 57, 69);
  }
`;
