import React, { useEffect, useState } from 'react'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import Slider1 from '../../assets/images/Slider1.jpg'
import Slider2 from '../../assets/images/Slider2.jpg'
import CardComponent from '../../components/CardComponent/CardComponent'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import { useSelector } from 'react-redux'
import Loading from '../../components/LoadingComponent/Loading'
import { useDebounce } from '../../hooks/useDebounce'

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 500)

  const [limit, setLimit] = useState(6)
  const [typeProducts, setTypeProducts] = useState([])

  // ===== FETCH PRODUCTS =====
  const fetchProductAll = async (limit, search) => {
    const res = await ProductService.getAllProduct(search, limit)
    return res
  }

  // ===== FETCH TYPE =====
  const fetchAllTypeProduct = async () => {
    try {
      const res = await ProductService.getAllTypeProduct()
      if (res?.status === 'OK') {
        setTypeProducts(res?.data)
      }
    } catch (error) {
      console.log('Error fetch type:', error)
    }
  }

  useEffect(() => {
    fetchAllTypeProduct()
  }, [])

  // ===== REACT QUERY =====
  const { isLoading, isFetching, data: products } = useQuery({
    queryKey: ['products', limit, searchDebounce],
    queryFn: () => fetchProductAll(limit, searchDebounce),
    retry: 3,
    retryDelay: 1000,
    placeholderData: (prev) => prev,
  })

  return (
    <Loading isLoading={isLoading}>
      
      {/* ===== TYPE PRODUCT ===== */}
      <div style={{ width: '1270px', margin: '0 auto' }}>
        <WrapperTypeProduct>
          {typeProducts?.map((item) => (
            <TypeProduct
              name={item} // 👈 HIỂN THỊ
              type={item}                    // 👈 GIỮ TYPE THẬT
              key={item}
            />
          ))}
        </WrapperTypeProduct>
      </div>

      {/* ===== BODY ===== */}
      <div style={{ width: '100%', backgroundColor: '#ececec' }}>
        <div
          style={{
            width: '1270px',
            margin: '0 auto',
            backgroundColor: '#fff',
            paddingBottom: '20px'
          }}
        >
          {/* SLIDER */}
          <SliderComponent arrImages={[Slider1, Slider2]} />

          {/* PRODUCTS */}
          <WrapperProducts>
            {products?.data?.map((product) => (
              <CardComponent
                key={product._id}
                countInStock={product.countInStock}
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                type={product.type}
                selled={product.selled}
                discount={product.discount}
                id={product._id}
              />
            ))}
          </WrapperProducts>

          {/* ===== LOAD MORE BUTTON ===== */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px'
            }}
          >
            <WrapperButtonMore
              textbutton={isFetching ? 'Đang tải...' : 'Xem thêm'}
              onClick={() => setLimit((prev) => prev + 6)}
            />
          </div>

        </div>
      </div>
    </Loading>
  )
}

export default HomePage

console.log(HomePage);
