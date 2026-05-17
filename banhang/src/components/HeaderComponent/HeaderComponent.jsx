import { Badge, Col, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeaderAccout,
  WrapperTextHeader,
  WrapperTextHeaderSmall
} from './style'
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons'
import ButttonInputSearch from '../ButtonInputSearch/ButtonInputSearch'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slices/userSlice'
import Loading from '../LoadingComponent/Loading'
import { searchProduct } from '../../redux/slices/productSlide'

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  console.log('USER REDUX = ', user)
  const order = useSelector((state) => state.order)

  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [search, setSearch] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }

  const handleLogout = async () => {
    setLoading(true)
    try {
      await UserService.logoutUser()
    } catch (e) {}

    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    dispatch(resetUser())
    setLoading(false)
    navigate('/')
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const handleClickNavigate = (type) => {
    if (type === 'profile') {
      navigate('/profile-user')
    } else if (type === 'admin') {
      navigate('/system/admin')
    }
    else if (type === 'staff') {
  navigate('/staff')
} 
    else if (type === 'my-order') {
      navigate('/my-order', {
        state: {
          id: user?.id,
          token: user?.access_token
        }
      })
      
    } 
    else {
      handleLogout()
    }
    setIsOpenPopup(false)
  }

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>
        Thông tin người dùng
      </WrapperContentPopup>

      {user?.name === 'Admin' && (
  <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>
    Quản lí hệ thống
  </WrapperContentPopup>
)}
{user?.role === 'staff' &&  (
  <WrapperContentPopup onClick={() => handleClickNavigate('staff')}>
    Quản lí đơn hàng
  </WrapperContentPopup>
)}

      {user?.role === 'user' && (

  <WrapperContentPopup
    onClick={(e) => handleClickNavigate('my-order')}
  >
    Đơn hàng của tôi
  </WrapperContentPopup>

)}

      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  )

  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }

  return (
    <div
      style={{
        height: '110%',
        width: '85%',
        background: '#FFDAB9'
      }}
    >
      <WrapperHeader>
        
        {/* LOGO */}
        <Col span={4}>
          <WrapperTextHeader>SAHAFA</WrapperTextHeader>
        </Col>

        {/* SEARCH */}
        {!isHiddenSearch && (
          <Col span={10}>
            <ButttonInputSearch
              size="large"
              bordered={false}
              textbutton="Tìm kiếm"
              placeholder="input search text"
              onChange={onSearch}
              backgroundColorButton="#5a20c1"
              style={{
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: '8px'
              }}
            />
          </Col>
        )}

        {/* ACCOUNT + CART */}
        <Col
          span={10}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '20px',
            alignItems: 'center'
          }}
        >
          <Loading isLoading={loading}>
            <WrapperHeaderAccout>
              {user?.avatar || userAvatar ? (
                <img
                  src={user.avatar || userAvatar}
                  alt="avatar"
                  style={{
                    height: '30px',
                    width: '30px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <UserOutlined style={{ fontSize: '30px' }} />
              )}

              {user?.name || userName ? (
                <Popover
                  content={content}
                  trigger="click"
                  open={isOpenPopup}
                  onOpenChange={setIsOpenPopup}
                >
                  <div
                    style={{
                      cursor: 'pointer',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {user.name || userName}
                    <CaretDownOutlined />
                  </div>
                </Popover>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: 'pointer' }}
                >
                  <WrapperTextHeaderSmall>
                    Đăng nhập / Đăng ký
                  </WrapperTextHeaderSmall>
                </div>
              )}
            </WrapperHeaderAccout>
          </Loading>

          {!isHiddenCart && (
            <div
              onClick={() => navigate('/order')}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined
                  style={{ fontSize: '30px', color: '#fff' }}
                />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>

      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent
console.log(HeaderComponent);

