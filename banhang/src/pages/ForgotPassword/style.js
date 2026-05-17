import styled from "styled-components";

export const WrapperContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
`;

export const WrapperBox = styled.div`
  width: 400px;
  padding: 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  margin-bottom: 10px;
`;

export const Description = styled.p`
  margin-bottom: 20px;
  color: #666;
`;

export const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
`;

export const SuccessText = styled.p`
  color: green;
  margin-top: 10px;
`;

export const BackToLogin = styled.span`
  color: #1890ff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;