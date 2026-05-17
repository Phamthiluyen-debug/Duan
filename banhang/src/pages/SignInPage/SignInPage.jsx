import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { jwtDecode } from 'jwt-decode'

import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import Loading from '../../components/LoadingComponent/Loading'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'

import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { updateUser } from '../../redux/slices/userSlice'

import cafe from '../../assets/images/cafe.jpg'

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const mutation = useMutationHooks(
    (data) => UserService.loginUser(data)
  )

  const { data, isLoading, isSuccess } = mutation
  console.log('isSuccess:', isSuccess)
console.log('data login:', data)


  useEffect(() => {
  if (isSuccess && data?.access_token) {
    localStorage.setItem(
      'access_token',
      JSON.stringify(data.access_token)
    )
    localStorage.setItem(
      'refresh_token',
      JSON.stringify(data.refresh_token)
    )

    dispatch(updateUser({
    ...data.data,
    access_token: data.access_token,
    role: data.data.role
}))
    

    navigate('/')
  }
}, [isSuccess, data, navigate])


  const handleGetDetailsUser = async (id, token) => {
    const refreshToken = JSON.parse(localStorage.getItem('refresh_token'))
const res = await UserService.getDetailsUser(id, token)

dispatch(updateUser({
  ...data.data,
  role: data.data.role,
  access_token: data.access_token
}))

  }

  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }

  const handleSignIn = () => {
  console.log('CLICK ĐĂNG NHẬP', { email, password })
  mutation.mutate({ email, password })
}
const handleForgotPassword = () => {
  navigate('/forgot-password')
}


  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.53)',
        height: '100vh'
      }}
    >
      <div
        style={{
          width: '800px',
          height: '445px',
          borderRadius: '6px',
          background: '#fff',
          display: 'flex'
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập vào tài khoản</p>

          <InputForm
            style={{ marginBottom: '10px' }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={setEmail}
          />

          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                position: 'absolute',
                top: '4px',
                right: '8px',
                zIndex: 10,
                cursor: 'pointer'
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>

            <InputForm
              placeholder="password"
              type={isShowPassword ? 'text' : 'password'}
              value={password}
              onChange={setPassword}
            />
          </div>

          {data?.status === 'ERR' && (
            <span style={{ color: 'red' }}>{data?.message}</span>
          )}

          <Loading isLoading={isLoading}>
            <ButtonComponent
              disabled={!email || !password}
              onClick={handleSignIn}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px'
              }}
              textbutton="Đăng nhập"
              styleTextButton={{
                color: '#fff',
                fontSize: '15px',
                fontWeight: '700'
              }}
            />
          </Loading>

          <p>
  <WrapperTextLight onClick={handleForgotPassword}>
    Quên mật khẩu?
  </WrapperTextLight>
</p>
          <p>
            Chưa có tài khoản?
            <WrapperTextLight onClick={handleNavigateSignUp}>
              {' '}Tạo tài khoản
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <Image
            src={cafe}
            preview={false}
            alt="cafe"
            height="400px"
            width="500px"
          />
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignInPage

console.log(SignInPage);