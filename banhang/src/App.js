import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import Loading from './components/LoadingComponent/Loading'
import { routes } from './routes'
import * as UserService from './services/UserService'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    // hiện tại chưa xử lý refresh token → để trống cho app chạy ổn định
    setIsLoading(false)
  }, [])

  return (
    <div style={{ height: 'auto', width: '100%' }}>
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              const Layout = route.isShowHeader ? DefaultComponent : Fragment

              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              )
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  )
}

export default App
