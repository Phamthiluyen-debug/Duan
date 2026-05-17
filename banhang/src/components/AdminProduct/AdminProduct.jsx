import { Button, Form, Select, Space } from 'antd'
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import React, { useRef, useState, useEffect } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64, renderOptions } from '../../utils'
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'
import * as TypeProductService from '../../services/TypeProductService'

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

  const user = useSelector((state) => state?.user)
  const searchInput = useRef(null)

  const inittial = () => ({
    name: '',
    price: '',
    image: '',
    type: '',
    newType: '',
    discount: '',
  })

  const [stateProduct, setStateProduct] = useState(inittial())
  const [stateProductDetails, setStateProductDetails] = useState(inittial())
  const [typeProducts, setTypeProducts] = useState([])

  const [form] = Form.useForm()
  const [formUpdate] = Form.useForm()

  // TYPE CỐ ĐỊNH
  const typeOptions = [
    { label: 'Sách', value: 'Sách' },
    { label: 'Truyện tranh', value: 'Truyện tranh' },
    { label: 'Tiểu thuyết', value: 'Tiểu thuyết' },
    { label: 'Sách nâng cao', value: 'Sách nâng cao' },
    { label: 'Kỹ năng sống', value: 'Kỹ năng sống' },
  ]

  /* ================= MUTATION ================= */

  const mutation = useMutationHooks((data) =>
    ProductService.createProduct(data)
  )

  const mutationUpdate = useMutationHooks(({ id, token, data }) =>
    ProductService.updateProduct(id, token, data)
  )

  const mutationDeleted = useMutationHooks(({ id, token }) =>
    ProductService.deleteProduct(id, token)
  )

  /* ================= QUERY ================= */

  const queryProduct = useQuery({
    queryKey: ['products'],
    queryFn: ProductService.getAllProduct,
  })

  const typeProduct = useQuery({
    queryKey: ['type-product'],
    queryFn: ProductService.getAllTypeProduct,
  })

  /* ================= EFFECT ================= */

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue(inittial())
    }
  }, [isModalOpen, form])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      const fetchDetails = async () => {
        const res = await ProductService.getDetailsProduct(rowSelected)
        const data = res?.data

        setStateProductDetails({
          name: data?.name,
          price: data?.price,
          type: data?.type,
          discount: data?.discount,
          image: data?.image,
        })

        formUpdate.setFieldsValue({
          name: data?.name,
          price: data?.price,
          type: data?.type,
          discount: data?.discount,
        })
      }

      fetchDetails()
    }
  }, [rowSelected, isOpenDrawer, formUpdate])
  useEffect(() => {
    fetchAllType()
}, [])

const fetchAllType = async () => {
    const res = await TypeProductService.getAllType()

    if (res?.status === 'OK') {
        setTypeProducts(res.data)
    }
}

  /* ================= SEARCH ================= */

  const handleSearch = (selectedKeys, confirm) => confirm()
  const handleReset = (clearFilters) => clearFilters()

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
  })

  /* ================= HANDLER ================= */

  const handleOnchange = (e) => {
    setStateProduct({ ...stateProduct, [e.target.name]: e.target.value })
  }

  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    })
  }

  const handleChangeSelect = (value) => {
    setStateProduct({ ...stateProduct, type: value })
  }

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList?.[0]
    if (!file) return
    file.preview = await getBase64(file.originFileObj)
    setStateProduct({ ...stateProduct, image: file.preview })
  }

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList?.[0]
    if (!file) return
    file.preview = await getBase64(file.originFileObj)
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview,
    })
  }

  /* ================= SUBMIT ================= */

  const onFinish = () => {
    mutation.mutate(
      {
        ...stateProduct,
      },
      {
        onSuccess: () => {
          message.success()
          setIsModalOpen(false)
          form.resetFields()
          queryProduct.refetch()
        },
      }
    )
  }

  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        data: stateProductDetails,
      },
      {
        onSuccess: () => {
          message.success()
          setIsOpenDrawer(false)
          formUpdate.resetFields()
          queryProduct.refetch()
        },
      }
    )
  }

  const handleDeleteProduct = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSuccess: () => {
          message.success()
          setIsModalOpenDelete(false)
          queryProduct.refetch()
        },
      }
    )
  }

  /* ================= RENDER ================= */

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>

      <Button
        style={{ marginTop: 16, height: 150, width: 150, borderStyle: 'dashed' }}
        onClick={() => setIsModalOpen(true)}
      >
        <PlusOutlined style={{ fontSize: 48 }} />
      </Button>

      <TableComponent
        columns={[
          { title: 'Name', dataIndex: 'name', ...getColumnSearchProps('name') },
          { title: 'Price', dataIndex: 'price' },
          { title: 'Type', dataIndex: 'type' },
          {
            title: 'Action',
            render: (_, record) => (
              <>
                <DeleteOutlined
                  style={{ color: 'red' }}
                  onClick={() => {
                    setRowSelected(record._id)
                    setIsModalOpenDelete(true)
                  }}
                />
                <EditOutlined
                  style={{ marginLeft: 12 }}
                  onClick={() => {
                    setRowSelected(record._id)
                    setIsOpenDrawer(true)
                  }}
                />
              </>
            ),
          },
        ]}
        data={queryProduct?.data?.data?.map((i) => ({ ...i, key: i._id }))}
        isLoading={queryProduct.isLoading}
      />

      {/* CREATE */}
      <ModalComponent
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <InputComponent name="name" onChange={handleOnchange} />
          </Form.Item>

          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select
              placeholder="Chọn type"
              onChange={(value) =>
                setStateProduct({
                  ...stateProduct,
                  type: value,
                })
              }
             options={typeProducts.map((type) => ({
    value: type.name,
    label: type.name
}))}
            />
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputComponent name="price" onChange={handleOnchange} />
          </Form.Item>

          <Form.Item name="discount" label="Discount" rules={[{ required: true }]}>
            <InputComponent name="discount" onChange={handleOnchange} />
          </Form.Item>

          <Form.Item name="image" label="Image" rules={[{ required: true }]}>
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button>Select File</Button>
            </WrapperUploadFile>
          </Form.Item>

          <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      </ModalComponent>

      {/* DELETE */}
      <ModalComponent
        title="Xóa sản phẩm"
        isOpen={isModalOpenDelete}
        onCancel={() => setIsModalOpenDelete(false)}
        onOk={handleDeleteProduct}
      >
        Bạn có chắc muốn xóa sản phẩm này không?
      </ModalComponent>

      {/* UPDATE */}
      <DrawerComponent
        title="Cập nhật sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false)
          formUpdate.resetFields()
        }}
        width="80%"
      >
        <Form form={formUpdate} onFinish={onUpdateProduct}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <InputComponent name="name" onChange={handleOnchangeDetails} />
          </Form.Item>

          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select
              value={stateProductDetails.type}
              onChange={(value) =>
                setStateProductDetails({
                  ...stateProductDetails,
                  type: value,
                })
              }
              options={typeOptions}
            />
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputComponent name="price" onChange={handleOnchangeDetails} />
          </Form.Item>

          <Form.Item name="discount" label="Discount" rules={[{ required: true }]}>
            <InputComponent name="discount" onChange={handleOnchangeDetails} />
          </Form.Item>

          <Form.Item name="image" label="Image">
            <WrapperUploadFile
              onChange={handleOnchangeAvatarDetails}
              maxCount={1}
            >
              <Button>Select File</Button>
            </WrapperUploadFile>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Apply
          </Button>
        </Form>
      </DrawerComponent>
    </div>
  )
}

export default AdminProduct

console.log(AdminProduct)