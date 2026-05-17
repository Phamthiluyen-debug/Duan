import React, { useEffect, useState } from 'react'
import { Table, Button, Tag } from 'antd'
import * as UserService from '../../services/UserService'

const AdminCustomer = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await UserService.getAllUser()

      if (res?.status === 'OK') {
        const customers = res.data.filter(
   (item) =>
      item.role !== 'admin' &&
      item.role !== 'staff'
)

        setUsers(customers)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // KHÓA / MỞ KHÓA TÀI KHOẢN
  const handleUpdateStatus = async (user) => {
    try {
      const newStatus =
        user.status === 'blocked'
          ? 'active'
          : 'blocked'

      const res = await UserService.updateUser(
        user._id,
        {
          status: newStatus,
        }
      )

      if (res?.status === 'OK') {
        fetchUsers()
      }
    } catch (e) {
      console.log(e)
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },

    // STATUS
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <>
          {status === 'blocked' ? (
            <Tag color="red">Blocked</Tag>
          ) : (
            <Tag color="green">Active</Tag>
          )}
        </>
      ),
    },

    // ACTION
    {
      title: 'Action',
      render: (_, record) => (
        <Button
          danger={record.status !== 'blocked'}
          type="primary"
          onClick={() => handleUpdateStatus(record)}
        >
          {record.status === 'blocked'
            ? 'Mở khóa'
            : 'Khóa'}
        </Button>
      ),
    },
  ]

  return (
    <div>
      <h2>Danh sách khách hàng</h2>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
      />
    </div>
  )
}

export default AdminCustomer