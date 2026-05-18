import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import * as OrderService from '../../services/OrderService'

const AdminOrder = () => {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {

      const res = await OrderService.getAllOrder()

      if (res?.status === 'OK') {
        setOrders(res?.data)
      }

    } catch (e) {
      console.log(e)
    }
  }

  const columns = [
    {
      title: 'Khách hàng',
      dataIndex: 'name',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
    },
  ]

  return (
    <div>

      <h2>Quản lý đơn hàng</h2>

      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
      />

    </div>
  )
}

export default AdminOrder