import React, { useEffect, useState } from 'react'
import { Col, Image, Rate, Row, InputNumber } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import ButtonComponent from '../ButtonComponent/ButtonComponent'
import Loading from '../LoadingComponent/Loading'

import * as ProductService from '../../services/ProductService'
import { addOrderProduct, resetOrder } from '../../redux/slices/orderSlice'
import { convertPrice } from '../../utils'

import {
  WrapperAddressProduct,
  WrapperPriceProduct,
  WrapperQualityProduct,
  WrapperStyleNameProduct,
} from './style'

const ProductDetailsComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1)
  const [errorLimitOrder, setErrorLimitOrder] = useState(false)

  const user = useSelector((state) => state.user)
  const order = useSelector((state) => state.order)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  // ===== FIX QUERY =====
  const { isLoading, data: productDetails } = useQuery({
    queryKey: ['product-details', idProduct],
    queryFn: () => ProductService.getDetailsProduct(idProduct),
    enabled: !!idProduct
  })

  const product = productDetails?.data

  

  // ===== kiểm tra số lượng =====
  useEffect(() => {
    const orderRedux = order?.orderItems?.find(
      (item) => item.product === product?._id
    )

    if (
      (orderRedux?.amount + numProduct <= orderRedux?.countInstock) ||
      (!orderRedux && product?.countInStock > 0)
    ) {
      setErrorLimitOrder(false)
    } else {
      setErrorLimitOrder(true)
    }
  }, [numProduct, product, order])

  useEffect(() => {
    if (order?.isSucessOrder) {
      dispatch(resetOrder())
    }
  }, [order?.isSucessOrder, dispatch])
  if (isLoading) return <Loading isLoading={true} />

  const handleChangeCount = (value) => {
    setNumProduct(value)
  }

  const handleAddOrderProduct = () => {
    if (!user?.access_token) {
      navigate('/sign-in', { state: location?.pathname })
      return
    }

    const orderRedux = order?.orderItems?.find(
      (item) => item.product === product?._id
    )

    if (
      (orderRedux?.amount + numProduct <= orderRedux?.countInstock) ||
      (!orderRedux && product?.countInStock > 0)
    ) {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: product?.name,
            amount: numProduct,
            image: product?.image,
            price: product?.price,
            product: product?._id,
            discount: product?.discount,
            countInstock: product?.countInStock,
          },
        })
      )
    } else {
      setErrorLimitOrder(true)
    }
  }

  return (
    <Loading isLoading={isLoading}>
      <Row style={{ padding: 16, background: '#fff', borderRadius: 4 }}>
        {/* CỘT TRÁI */}
        <Col span={10} style={{ paddingRight: 12 }}>
          <Image src={product?.image} preview={false} />
        </Col>

        {/* CỘT PHẢI */}
        <Col span={14}>
          <WrapperStyleNameProduct>
            {product?.name}
          </WrapperStyleNameProduct>

          <div>
            <Rate allowHalf value={product?.rating} />
            <span style={{ marginLeft: 8 }}> | Đã bán</span>
          </div>

          <WrapperPriceProduct>
            <span style={{ fontSize: 24, color: 'red', fontWeight: 600 }}>
              {convertPrice(product?.price)}
            </span>
          </WrapperPriceProduct>

          <WrapperAddressProduct>
            <span>Giao đến: </span>
            <b>{user?.address || 'Chưa có địa chỉ'}</b>
          </WrapperAddressProduct>

          <div style={{ margin: '16px 0', borderTop: '1px solid #eee', paddingTop: 12 }}>
            <div style={{ marginBottom: 8 }}>Số lượng</div>

            <WrapperQualityProduct>
              <InputNumber
                min={1}
                max={product?.countInStock}
                value={numProduct}
                onChange={handleChangeCount}
              />
            </WrapperQualityProduct>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <ButtonComponent
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '220px',
                border: 'none',
                borderRadius: '4px',
              }}
              onClick={handleAddOrderProduct}
              textbutton="Chọn mua"
              styleTextButton={{
                color: '#fff',
                fontSize: '15px',
                fontWeight: 700,
              }}
            />
          </div>

          {errorLimitOrder && (
            <div style={{ color: 'red', marginTop: 10 }}>
              Sản phẩm đã hết hàng
            </div>
          )}
        </Col>
      </Row>
    </Loading>
  )
}

export default ProductDetailsComponent
console.log(ProductDetailsComponent);