import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Input, message,Checkbox } from 'antd'
import * as UserService from '../../services/UserService'

const AdminStaff = () => {
  const [staffs, setStaffs] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'staff',
    permissions: [],
  })

  useEffect(() => {
    fetchStaffs()
  }, [])

  const fetchStaffs = async () => {
    try {
      const res = await UserService.getAllUser()

      if (res?.status === 'OK') {
        const list = res.data.filter(
          (item) => item.role === 'staff'
        )

        setStaffs(list)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleCreateStaff = async () => {
    try {
      const res = await UserService.signupUser(newStaff)

      if (res?.status === 'OK') {
        message.success('Tạo nhân viên thành công')

        setIsOpen(false)

        fetchStaffs()
      } else {
        message.error(res?.message)
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
  ]

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <h2>Danh sách nhân viên</h2>

        <Button
          type="primary"
          onClick={() => setIsOpen(true)}
        >
          Tạo nhân viên
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={staffs}
        rowKey="_id"
      />

      <Modal
        title="Tạo nhân viên"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={handleCreateStaff}
      >
        <Input
          placeholder="Tên"
          style={{ marginBottom: 10 }}
          onChange={(e) =>
            setNewStaff({
              ...newStaff,
              name: e.target.value,
            })
          }
        />

        <Input
          placeholder="Email"
          style={{ marginBottom: 10 }}
          onChange={(e) =>
            setNewStaff({
              ...newStaff,
              email: e.target.value,
            })
          }
        />

        <Input.Password
          placeholder="Mật khẩu"
          style={{ marginBottom: 10 }}
          onChange={(e) =>
            setNewStaff({
              ...newStaff,
              password: e.target.value,
            })
          }
        />

        <Input.Password
          placeholder="Nhập lại mật khẩu"
          style={{ marginBottom: 10 }}
          onChange={(e) =>
            setNewStaff({
              ...newStaff,
              confirmPassword: e.target.value,
            })
          }
        />

        <Input
          placeholder="Số điện thoại"
          onChange={(e) =>
            setNewStaff({
              ...newStaff,
              phone: e.target.value,
            })
          }
        />

<div style={{ marginTop: 20 }}>

  <h4>Phân quyền nhân viên</h4>

  <Checkbox.Group
    options={[
      {
        label: 'Quản lý sách',
        value: 'manage_products'
      },
      {
        label: 'Quản lý thể loại',
        value: 'manage_types'
      },
      {
        label: 'Quản lý đơn hàng',
        value: 'manage_orders'
      },
      {
        label: 'Hỗ trợ khách hàng',
        value: 'support_customer'
      }
    ]}
    onChange={(checkedValues) => {

      setNewStaff({
        ...newStaff,
        permissions: checkedValues
      })
    }}
  />

</div>
      </Modal>
    </div>
  )
}

export default AdminStaff
console.log(AdminStaff)