import axios from "axios"

// =========================
// CREATE TYPE
// =========================

export const createType = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/type/create`,
        data
    )

    return res.data
}

// =========================
// GET ALL TYPE
// =========================

export const getAllType = async () => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/type/get-all`
    )

    return res.data
}

// =========================
// UPDATE TYPE
// =========================

export const updateType = async (id, data) => {
    const res = await axios.put(
        `${process.env.REACT_APP_API_URL_BACKEND}/type/update/${id}`,
        data
    )

    return res.data
}

// =========================
// DELETE TYPE
// =========================

export const deleteType = async (id) => {
    const res = await axios.delete(
        `${process.env.REACT_APP_API_URL_BACKEND}/type/delete/${id}`
    )

    return res.data
}