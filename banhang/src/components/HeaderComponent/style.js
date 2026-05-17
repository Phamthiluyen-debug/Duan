import { Row } from "antd";
import styled from "styled-components";

// HEADER CHÍNH
export const WrapperHeader = styled.div`
  padding: 10px 120px;
  background-color: rgb(206, 33, 33);
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px; /* 🔥 thêm */
`;

// LOGO (SAHAFA)
export const WrapperTextHeader = styled.span`
  font-size: 32px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
`;

// 🔥 WRAPPER SEARCH (QUAN TRỌNG NHẤT)
export const WrapperSearch = styled.div`
  flex: 1; /* 🔥 chiếm toàn bộ khoảng giữa */
`;

// ACCOUNT
export const WrapperHeaderAccout = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 10px;
  white-space: nowrap;
`;

// TEXT NHỎ
export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  color: #fff;
`;

// POPUP
export const WrapperContentPopup = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    color: #1890ff;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;