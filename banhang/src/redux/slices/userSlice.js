import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    access_token: '',
    id: '',
    role: '',
    city: '',
    refreshToken: '',
    permissions: []
}

export const userSlide = createSlice({
    name: 'user',
    initialState,

    reducers: {
        updateUser: (state, action) => {

            const {
                name,
                email,
                access_token,
                address,
                phone,
                avatar,
                _id,
                role,
                city,
                refreshToken,
                permissions
            } = action.payload

            if (name !== undefined) state.name = name
            if (email !== undefined) state.email = email
            if (address !== undefined) state.address = address
            if (phone !== undefined) state.phone = phone
            if (avatar !== undefined) state.avatar = avatar
            if (_id !== undefined) state.id = _id
            if (access_token !== undefined) state.access_token = access_token
            if (role !== undefined) state.role = role
            if (city !== undefined) state.city = city
            if (refreshToken !== undefined) state.refreshToken = refreshToken

            // THÊM DÒNG NÀY
            if (permissions !== undefined)
                state.permissions = permissions
        },

        resetUser: (state) => {
            state.name = ''
            state.email = ''
            state.address = ''
            state.phone = ''
            state.avatar = ''
            state.id = ''
            state.access_token = ''
            state.role = ''
            state.city = ''
            state.refreshToken = ''
            state.permissions = []
        },
    },
})

export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer