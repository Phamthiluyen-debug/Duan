
import { useNavigate } from 'react-router-dom'
import { WrapperType } from './style'

const TypeProduct = ({ name }) => {
  const navigate = useNavigate()

  const handleNavigatetype = (name) => {
    navigate(
      `/product/${name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ /g, '_')
        .toLowerCase()}`
    )
  }

  return (
    <WrapperType onClick={() => handleNavigatetype(name)}>
      {name}
    </WrapperType>
  )
}

export default TypeProduct
console.log(TypeProduct);