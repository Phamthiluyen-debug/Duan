import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";
export const WrapperStyleNameProduct = styled.h1`
margin: 0px 0px 4px;
color: rgb(36, 36, 36);
font-size: 24px;
font-weight: 300;
line-height: 32px;
word-break: break-word;

`
export const WrapperPriceProduct = styled.div`
background: rgb(250, 250, 250);
border-radius: 4px;
`
export const WrapperAddressProduct = styled.div`
span.address{
text-decoration: underline;
font-size: 15px;
line-height: 24px;
font-weight: 500;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsisl

},
span.change-address{
}
`
export const WrapperQualityProduct = styled.div`


`
export const WrapperInputNumber = styled(InputNumber)`
  width: 60px;
`
