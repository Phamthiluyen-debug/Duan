import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";

import {
  WrapperContainer,
  WrapperBox,
  Title,
  Description,
  ErrorText,
  SuccessText,
  BackToLogin,
} from "./style";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return email.includes("@");
  };

  const handleForgotPassword = async () => {
    setError("");
    setSuccess("");

    if (!email) {
      setError("Vui lòng nhập email");
      return;
    }

    if (!validateEmail(email)) {
      setError("Email không hợp lệ");
      return;
    }

    setLoading(true);

    // giả lập API
    setTimeout(() => {
      setLoading(false);
      setSuccess("Đã gửi yêu cầu! Vui lòng kiểm tra email.");
    }, 1500);
  };

  return (
    <WrapperContainer>
      <WrapperBox>
        <Title>Quên mật khẩu</Title>
        <Description>Nhập email để lấy lại mật khẩu</Description>

        <InputForm
          placeholder="Nhập email..."
          value={email}
          onChange={setEmail}
        />

        {error && <ErrorText>{error}</ErrorText>}
        {success && <SuccessText>{success}</SuccessText>}

        <ButtonComponent
          onClick={handleForgotPassword}
          disabled={!email || loading}
          styleButton={{
            marginTop: "20px",
            background: "#ff3945",
            height: "45px",
            width: "100%",
            border: "none",
            borderRadius: "4px",
          }}
          textbutton={loading ? "Đang gửi..." : "Gửi yêu cầu"}
          styleTextButton={{
            color: "#fff",
            fontSize: "15px",
            fontWeight: "700",
          }}
        />

        <p style={{ marginTop: "15px" }}>
          <BackToLogin onClick={() => navigate("/sign-in")}>
            ← Quay lại đăng nhập
          </BackToLogin>
        </p>
      </WrapperBox>
    </WrapperContainer>
  );
}

export default ForgotPassword;
console.log(ForgotPassword);