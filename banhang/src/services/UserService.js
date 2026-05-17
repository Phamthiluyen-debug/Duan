import axios from "axios"

export const axiosJWT = axios.create()

/* =========================
   LOGIN
========================= */
export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/sign-in`,
    data
  )

  console.log('LOGIN API RESPONSE:', res.data)
  return res.data
}

/* =========================
   SIGN UP
========================= */
export const signupUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/sign-up`,
    data
  )
  return res.data
}

/* =========================
   GET DETAILS USER (✅ FIX)
========================= */
export const getDetailsUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/get-details/${id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  )
  return res.data
}

/* =========================
   DELETE USER
========================= */
export const deleteUser = async (id, access_token, data) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/delete-user/${id}`,
    {
      data,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  )
  return res.data
}

/* =========================
   GET ALL USER
========================= */
export const getAllUser = async () => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/user/get-all`
    )

    return res.data
}

/* =========================
   REFRESH TOKEN (✅ FIX)
========================= */
export const refreshToken = async (refreshToken) => {
  console.log('refreshToken', refreshToken)

  const res = await axios.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/refresh-token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  )
  return res.data
}

/* =========================
   LOG OUT
========================= */
export const logoutUser = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/log-out`
  )
  return res.data
}

/* =========================
   UPDATE USER
========================= */
export const updateUser = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/update-user/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  )
  return res.data
}

/* =========================
   DELETE MANY USER
========================= */
export const deleteManyUser = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/delete-many`,
    data,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  )
  return res.data
}
export const createStaff = async (data) => {

    const res = await axios.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/user/create-staff`,
        data
    )
     console.log(res.data)

    return res.data
}
export const updateStatusUser = async (id, data) => {

    const res = await axios.put(
        `${process.env.REACT_APP_API_URL_BACKEND}/user/update-status/${id}`,
        data
    )

    return res.data
}
