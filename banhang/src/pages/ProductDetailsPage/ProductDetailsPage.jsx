
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'

const ProductDetailsPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  return (
    <div style={{width: '100%',background: '#efefef', height: '100%'}}>
      <div style={{ width: '1270px', height: '100%', margin: '0 auto'}} >
        <h3 style={{ fontWeight: 'bold', fontSize: '20px' }}>
  <span 
    style={{ cursor: 'pointer' }} 
    onClick={() => navigate('/')}
  >
    Trang chủ
  </span> 
  {' - '} 
  Chi tiết sản phẩm
</h3>
<ProductDetailsComponent idProduct={id} />
      </div>
    </div>
  )
}

export default ProductDetailsPage
console.log(ProductDetailsPage);