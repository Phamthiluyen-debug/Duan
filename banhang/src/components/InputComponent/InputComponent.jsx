import { Input } from "antd"
const InputComponent = ({size, placeholder, ...rests}) => {
  return (
  <Input size={size} placeholder={placeholder}
  {...rests}
  />)
};

export default InputComponent;
console.log(InputComponent);
