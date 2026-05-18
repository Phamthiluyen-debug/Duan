import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import AdminProduct from '../../components/AdminProduct/AdminProduct'
import AdminOrder from '../../components/AdminOrder/AdminOrder'
import AdminType from '../../components/AdminType/AdminType'
import AdminCustomer from '../../components/AdminCustomer/AdminCustomer'

const StaffPage = () => {

  const user = useSelector((state) => state.user)

  const [page, setPage] = useState('')

  return (
    <div style={{ padding: '20px' }}>

      {/* MENU */}
      <div
        style={{
          width: '250px',
          background: '#fff',
          padding: '20px',
          marginBottom: '20px'
        }}
      >

        {user?.permissions?.includes('manage_products') && (
          <div
            style={{
              marginBottom: '15px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            onClick={() => setPage('products')}
          >
            Quản lý sản phẩm
          </div>
        )}

        {user?.permissions?.includes('manage_types') && (
          <div
            style={{
              marginBottom: '15px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            onClick={() => setPage('types')}
          >
            Quản lý thể loại
          </div>
        )}

        {user?.permissions?.includes('manage_orders') && (
          <div
            style={{
              marginBottom: '15px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            onClick={() => setPage('orders')}
          >
            Quản lý đơn hàng
          </div>
        )}

        {user?.permissions?.includes('support_customer') && (
          <div
            style={{
              marginBottom: '15px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            onClick={() => setPage('customers')}
          >
            Hỗ trợ khách hàng
          </div>
        )}

      </div>

      {/* CONTENT */}
      <div>

        {page === 'products' && (
          <AdminProduct />
        )}

        {page === 'types' && (
          <AdminType />
        )}

        {page === 'orders' && (
          <AdminOrder />
        )}

        {page === 'customers' && (
          <AdminCustomer />
        )}

      </div>

    </div>
  )
}

export default StaffPage
console.log(StaffPage)