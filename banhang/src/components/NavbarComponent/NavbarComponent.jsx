import { Checkbox, Rate } from 'antd'
import {
  WrapperContent,
  WrapperLableText,
  WrapperTextPrice,
  WrapperTextValue,
} from './style'

import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import { useNavigate } from 'react-router-dom'

const NavBarComponent = () => {
  const navigate = useNavigate()

  const onChange = () => {}

  const fetchAllType = async () => {
    const res = await ProductService.getAllTypeProduct()
    return res.data
  }

  const { data: types } = useQuery({
    queryKey: ['product-type'],
    queryFn: fetchAllType,
  })

  const handleNavigateType = (type) => {
    navigate(`/product/${type}`)
  }

  const renderContent = (type, options) => {
    switch (type) {
      case 'text':
        return options.map((option) => {
          return (
            <WrapperTextValue
              key={option}
              onClick={() => handleNavigateType(option)}
              style={{ cursor: 'pointer' }}
            >
              {option}
            </WrapperTextValue>
          )
        })

      case 'checkbox':
        return (
          <Checkbox.Group
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
            onChange={onChange}
          >
            {options.map((option) => {
              return (
                <Checkbox
                  key={option.value}
                  style={{ marginLeft: 0 }}
                  value={option.value}
                >
                  {option.label}
                </Checkbox>
              )
            })}
          </Checkbox.Group>
        )

      case 'star':
        return options.map((option) => {
          return (
            <div
              key={option}
              style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
              }}
            >
              <Rate
                style={{ fontSize: '12px' }}
                disabled
                defaultValue={option}
              />
              <span>{`tu ${option} sao`}</span>
            </div>
          )
        })

      case 'price':
        return options.map((option) => {
          return (
            <WrapperTextPrice key={option}>
              {option}
            </WrapperTextPrice>
          )
        })

      default:
        return null
    }
  }

  return (
    <div>
      <WrapperLableText>Danh mục</WrapperLableText>

      <WrapperContent>
        {renderContent('text', types || [])}
      </WrapperContent>
    </div>
  )
}

export default NavBarComponent
console.log(NavBarComponent);