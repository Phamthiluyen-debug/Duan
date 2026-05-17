
import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText
} from './style'
import { StarFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'

const CardComponent = (props) => {
  const {
    image,
    name,
    price,
    rating,
    discount,
    id
  } = props

  const navigate = useNavigate()

  const handleDetailsProduct = () => {
    navigate(`/product-details/${id}`)
  }

  return (
    <WrapperCardStyle
      hoverable
      style={{ width: 200 }}
      bodyStyle={{ padding: '10px' }}
      cover={
        <img
          alt={name}
          src={image}
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />
      }
      onClick={handleDetailsProduct}
    >
      <StyleNameProduct>{name}</StyleNameProduct>

      <WrapperReportText>
        <span style={{ marginRight: '4px' }}>
          {rating} <StarFilled style={{ fontSize: '12px', color: '#fadb14' }} />
        </span>
      </WrapperReportText>

      <WrapperPriceText>
        <span>{convertPrice(price)}</span>
        <WrapperDiscountText>
          - {discount || 0} %
        </WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  )
}

export default CardComponent

console.log(CardComponent);