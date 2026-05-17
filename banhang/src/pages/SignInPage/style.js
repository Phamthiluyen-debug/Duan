import styled from "styled-components";
export const WrapperContainerLeft = styled.div`
  width: 45%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    margin-bottom: 10px;
  }

  h2 {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 24px;
    color: #555;
  }

  input {
    margin-bottom: 16px;
  }

  button {
    margin-top: 8px;
    margin-bottom: 16px;
  }
`;
export const WrapperContainerRight = styled.div`
  width: 55%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const WrapperTextLight = styled.span`
  color: rgb(13, 92, 182);
  font-size: 13px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
