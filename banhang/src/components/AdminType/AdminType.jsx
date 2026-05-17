import React, { useEffect, useState } from 'react'
import {
  Table,
  Button,
  Modal,
  Input,
  message,
  Space,
} from 'antd'

import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'

import * as TypeProductService from '../../services/TypeProductService'

const AdminType = () => {
  const [types, setTypes] = useState([])

  const [isOpenCreate, setIsOpenCreate] = useState(false)
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)

  const [newType, setNewType] = useState({
    name: '',
  })

  const [editType, setEditType] = useState({
    _id: '',
    name: '',
  })

  useEffect(() => {
    fetchAllType()
  }, [])

  const fetchAllType = async () => {
    try {
      const res = await TypeProductService.getAllType()

      if (res?.status === 'OK') {
        setTypes(res.data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // =========================
  // CREATE TYPE
  // =========================

  const handleCreateType = async () => {
    try {
      const res = await TypeProductService.createType(newType)

      if (res?.status === 'OK') {
        message.success('Tạo thể loại thành công')

        setIsOpenCreate(false)

        setNewType({
          name: '',
        })

        fetchAllType()
      } else {
        message.error('Tạo thất bại')
      }
    } catch (e) {
      console.log(e)
      message.error('Có lỗi xảy ra')
    }
  }

  // =========================
  // UPDATE TYPE
  // =========================

  const handleUpdateType = async () => {
    try {
      const res = await TypeProductService.updateType(
        editType._id,
        {
          name: editType.name,
        }
      )

      if (res?.status === 'OK') {
        message.success('Cập nhật thành công')

        setIsOpenUpdate(false)

        fetchAllType()
      } else {
        message.error('Cập nhật thất bại')
      }
    } catch (e) {
      console.log(e)
      message.error('Có lỗi xảy ra')
    }
  }

  // =========================
  // DELETE TYPE
  // =========================

  const handleDeleteType = async (id) => {
    try {
      const res = await TypeProductService.deleteType(id)

      if (res?.status === 'OK') {
        message.success('Xóa thành công')

        fetchAllType()
      } else {
        message.error('Xóa thất bại')
      }
    } catch (e) {
      console.log(e)
      message.error('Có lỗi xảy ra')
    }
  }

  // =========================
  // TABLE
  // =========================

  const columns = [
    {
      title: 'Tên thể loại',
      dataIndex: 'name',
    },

    {
      title: 'Action',
      render: (_, record) => {
        return (
          <Space>
            <DeleteOutlined
              style={{
                color: 'red',
                fontSize: '18px',
                cursor: 'pointer',
              }}
              onClick={() =>
                handleDeleteType(record._id)
              }
            />

            <EditOutlined
              style={{
                color: 'orange',
                fontSize: '18px',
                cursor: 'pointer',
              }}
              onClick={() => {
                setEditType(record)
                setIsOpenUpdate(true)
              }}
            />
          </Space>
        )
      },
    },
  ]

  return (
    <div>
      {/* HEADER */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h2>Quản lý thể loại sách</h2>

        <Button
          type="primary"
          onClick={() => setIsOpenCreate(true)}
        >
          Tạo thể loại
        </Button>
      </div>

      {/* TABLE */}

      <Table
        columns={columns}
        dataSource={types}
        rowKey="_id"
      />

      {/* MODAL CREATE */}

      <Modal
        title="Tạo thể loại sách"
        open={isOpenCreate}
        onCancel={() => setIsOpenCreate(false)}
        onOk={handleCreateType}
      >
        <Input
          placeholder="Nhập tên thể loại"
          value={newType.name}
          onChange={(e) =>
            setNewType({
              ...newType,
              name: e.target.value,
            })
          }
        />
      </Modal>

      {/* MODAL UPDATE */}

      <Modal
        title="Sửa thể loại sách"
        open={isOpenUpdate}
        onCancel={() => setIsOpenUpdate(false)}
        onOk={handleUpdateType}
      >
        <Input
          placeholder="Nhập tên thể loại"
          value={editType.name}
          onChange={(e) =>
            setEditType({
              ...editType,
              name: e.target.value,
            })
          }
        />
      </Modal>
    </div>
  )
}

export default AdminType
console.log(AdminType)