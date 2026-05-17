import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import {
  AppstoreOutlined,
  UserOutlined,
  TagsOutlined,
} from '@ant-design/icons'

import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import AdminProduct from '../../components/AdminProduct/AdminProduct'
import AdminUser from '../../components/AdminUser/AdminUser'
import AdminCustomer from '../../components/AdminCustomer/AdminCustomer'
import AdminStaff from '../../components/AdminStaff/AdminStaff'
import AdminType from '../../components/AdminType/AdminType'
import AdminRevenue from '../../components/AdminRevenue/AdminRevenue'

const AdminPage = () => {
  const [keySelected, setKeySelected] = useState('products')

  const items = [
    {
      key: 'products',
      icon: <AppstoreOutlined />,
      label: 'Sản phẩm',
    },
    {
  key: 'customers',
  icon: <UserOutlined />,
  label: 'Khách hàng',
},
{
  key: 'staffs',
  icon: <UserOutlined />,
  label: 'Nhân viên',
},
{
  key: 'types',
  icon: <TagsOutlined />,
  label: 'Thể loại sách',
},
{
   key: 'revenue',
   label: 'Doanh thu'
},
  ]

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />

      <div style={{ display: 'flex' }}>
        <Menu
          mode="inline"
          selectedKeys={[keySelected]}
          style={{
            width: 256,
            height: '100vh',
            boxShadow: '1px 1px 2px #ccc',
          }}
          items={items}
          onClick={({ key }) => setKeySelected(key)}
        />

        <div style={{ flex: 1, padding: 20 }}>
          {keySelected === 'products' && <AdminProduct />}

         {keySelected === 'customers' && <AdminCustomer />}
         {keySelected === 'staffs' && <AdminStaff />}
         {keySelected === 'types' && <AdminType />}
         {keySelected === 'revenue' && <AdminRevenue />}
        </div>
      </div>
    </>
  )
}

export default AdminPage

console.log(AdminPage)