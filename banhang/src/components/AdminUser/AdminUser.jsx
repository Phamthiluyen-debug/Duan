import { Button, Form, Space, Select, Input, Modal } from 'antd'
import React, { useEffect, useState, useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../LoadingComponent/Loading'
import ModalComponent from '../ModalComponent/ModalComponent'
import { getBase64 } from '../../utils'
import * as message from '../../components/Message/Message'
import { useSelector } from 'react-redux'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as UserService from '../../services/UserService'
import { useIsFetching, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined
} from '@ant-design/icons'

const AdminUser = () => {
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

  const [isOpenCreate, setIsOpenCreate] = useState(false)

  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    password: ''
  })

  const user = useSelector((state) => state?.user)
  const searchInput = useRef(null)

  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    address: '',
    role: ''
  })

  const [form] = Form.useForm()

  const queryClient = useQueryClient()

  // ================= GET ALL USER =================

  const fetchUserAll = async () => {
    const res = await UserService.getAllUser()
    return res
  }

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUserAll
  })

  const isFetchingUser = useIsFetching(['users'])

  // ================= CREATE STAFF =================

  const handleCreateStaff = async () => {
    try {
      const res = await UserService.signupUser({
        ...newStaff,
        confirmPassword: newStaff.password,
        role: 'staff'
      })

      if (res?.status === 'OK') {
        message.success('Tạo nhân viên thành công')

        setIsOpenCreate(false)

        setNewStaff({
          name: '',
          email: '',
          password: ''
        })

        queryClient.invalidateQueries(['users'])
      } else {
        message.error(res?.message)
      }
    } catch (e) {
      message.error('Có lỗi xảy ra')
    }
  }

  // ================= UPDATE USER =================

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data

    return UserService.updateUser(id, rests, token)
  })

  const { data: dataUpdated, isSuccess: isSuccessUpdated } =
    mutationUpdate

  const onUpdateUser = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        ...stateUserDetails
      },
      {
        onSettled: () => {
          queryClient.invalidateQueries(['users'])
        }
      }
    )
  }

  // ================= DELETE USER =================

  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data
    return UserService.deleteUser(id, token)
  })

  const { data: dataDeleted, isSuccess: isSuccessDeleted } =
    mutationDeleted

  const handleDeleteUser = () => {
    mutationDeleted.mutate(
      {
        id: rowSelected,
        token: user?.access_token
      },
      {
        onSettled: () => {
          queryClient.invalidateQueries(['users'])
        }
      }
    )
  }

  // ================= GET DETAIL USER =================

  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailsUser(
      rowSelected,
      user?.access_token
    )

    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        address: res?.data?.address,
        avatar: res?.data?.avatar,
        role: res?.data?.role
      })
    }

    setIsLoadingUpdate(false)
  }

  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true)
      fetchGetDetailsUser(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success()
      handleCloseDrawer()
    }
  }, [isSuccessUpdated])

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      message.success()
      handleCancelDelete()
    }
  }, [isSuccessDeleted])

  // ================= HANDLE =================

  const handleDetailsUser = () => {
    setIsOpenDrawer(true)
  }

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false)

    setStateUserDetails({
      name: '',
      email: '',
      phone: '',
      avatar: '',
      address: '',
      role: ''
    })

    form.resetFields()
  }

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0]

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview
    })
  }

  // ================= TABLE =================

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{
            color: 'red',
            fontSize: '20px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
          onClick={() => setIsModalOpenDelete(true)}
        />

        <EditOutlined
          style={{
            color: 'orange',
            fontSize: '20px',
            cursor: 'pointer'
          }}
          onClick={handleDetailsUser}
        />
      </div>
    )
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Phone',
      dataIndex: 'phone'
    },
    {
      title: 'Address',
      dataIndex: 'address'
    },
    {
      title: 'Role',
      dataIndex: 'role'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
    }
  ]

  const dataTable =
    users?.data?.length &&
    users?.data?.map((user) => {
      return {
        ...user,
        key: user._id
      }
    })

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <WrapperHeader>
          Quản lý người dùng
        </WrapperHeader>

        <Button
          type="primary"
          onClick={() => setIsOpenCreate(true)}
        >
          Tạo nhân viên
        </Button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <TableComponent
          columns={columns}
          isLoading={isFetchingUser}
          data={dataTable}
          onRow={(record) => {
            return {
              onClick: () => {
                setRowSelected(record._id)
              }
            }
          }}
        />
      </div>

      {/* ================= DRAWER ================= */}

      <DrawerComponent
        title="Chi tiết người dùng"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="90%"
      >
        <Loading isLoading={isLoadingUpdate}>
          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item label="Name" name="name">
              <InputComponent
                value={stateUserDetails.name}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <InputComponent
                value={stateUserDetails.email}
                onChange={handleOnchangeDetails}
                name="email"
              />
            </Form.Item>

            <Form.Item label="Phone" name="phone">
              <InputComponent
                value={stateUserDetails.phone}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>

            <Form.Item label="Role" name="role">
              <Select
                value={stateUserDetails.role}
                onChange={(value) =>
                  setStateUserDetails({
                    ...stateUserDetails,
                    role: value
                  })
                }
                options={[
                  {
                    value: 'user',
                    label: 'User'
                  },
                  {
                    value: 'staff',
                    label: 'Staff'
                  },
                  {
                    value: 'admin',
                    label: 'Admin'
                  }
                ]}
              />
            </Form.Item>

            <Form.Item label="Address" name="address">
              <InputComponent
                value={stateUserDetails.address}
                onChange={handleOnchangeDetails}
                name="address"
              />
            </Form.Item>

            <Form.Item label="Avatar" name="avatar">
              <WrapperUploadFile
                onChange={handleOnchangeAvatarDetails}
                maxCount={1}
              >
                <Button>Select File</Button>

                {stateUserDetails?.avatar && (
                  <img
                    src={stateUserDetails?.avatar}
                    alt="avatar"
                    style={{
                      height: '60px',
                      width: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginLeft: '10px'
                    }}
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>

      {/* ================= DELETE MODAL ================= */}

      <ModalComponent
        title="Xóa người dùng"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteUser}
      >
        <div>Bạn có chắc xóa tài khoản này không?</div>
      </ModalComponent>

      {/* ================= CREATE STAFF MODAL ================= */}

      <Modal
        title="Tạo tài khoản nhân viên"
        open={isOpenCreate}
        onCancel={() => setIsOpenCreate(false)}
        onOk={handleCreateStaff}
      >
        <Input
          placeholder="Tên nhân viên"
          style={{ marginBottom: '10px' }}
          value={newStaff.name}
          onChange={(e) =>
            setNewStaff({
              ...newStaff,
              name: e.target.value
            })
          }
        />

        <Input
          placeholder="Email"
          style={{ marginBottom: '10px' }}
          value={newStaff.email}
          onChange={(e) =>
            setNewStaff({
              ...newStaff,
              email: e.target.value
            })
          }
        />

        <Input.Password
          placeholder="Mật khẩu"
          value={newStaff.password}
          onChange={(e) =>
            setNewStaff({
              ...newStaff,
              password: e.target.value
            })
          }
        />
      </Modal>
    </div>
  )
}

export default AdminUser
console.log(AdminUser)