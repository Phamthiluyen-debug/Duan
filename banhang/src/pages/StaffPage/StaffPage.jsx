import React from 'react'
import { useSelector } from 'react-redux'

const StaffPage = () => {

  const user = useSelector((state) => state.user)

  return (
    <div>

      {user?.permissions?.includes('manage_products') && (
        <div>
          <h2>Quản lý sách</h2>
        </div>
      )}

      {user?.permissions?.includes('manage_types') && (
        <div>
          <h2>Quản lý thể loại</h2>
        </div>
      )}

      {user?.permissions?.includes('manage_orders') && (
        <div>
          <h2>Quản lý đơn hàng</h2>
        </div>
      )}

      {user?.permissions?.includes('support_customer') && (
        <div>
          <h2>Hỗ trợ khách hàng</h2>
        </div>
      )}

    </div>
  )
}

export default StaffPage