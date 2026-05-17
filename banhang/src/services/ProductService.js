import axios from "axios";
import { axiosJWT } from "./UserService";

const API = process.env.REACT_APP_API_URL_BACKEND;

/* =========================
   GET ALL PRODUCT
========================= */
export const getAllProduct = async (search = "", limit = 8) => {
  let url = `${API}/product/get-all?limit=${limit}`;

  if (search) {
    url = `${API}/product/get-all?filter[]=name&filter[]=${search}&limit=${limit}`;
  }

  const res = await axios.get(url);
  return res.data;
};

/* =========================
   GET PRODUCT BY TYPE
========================= */
export const getProductType = async (type, page = 0, limit = 8) => {
  if (!type) return;

  const res = await axios.get(
    `${API}/product/get-all?filter[]=type&filter[]=${type}&limit=${limit}&page=${page}`
  );

  return res.data;
};

/* =========================
   CREATE PRODUCT
========================= */
export const createProduct = async (data) => {
  const res = await axios.post(`${API}/product/create`, data);
  return res.data;
};

/* =========================
   GET DETAIL
========================= */
export const getDetailsProduct = async (id) => {
  const res = await axios.get(`${API}/product/get-details/${id}`);
  return res.data;
};

/* =========================
   UPDATE PRODUCT (✅ FIX)
========================= */
export const updateProduct = async (id, data) => {
  const access_token = localStorage.getItem("access_token");

  const res = await axios.put(
    `${API}/product/update/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${access_token}`, // ✅ FIX 404
      },
    }
  );

  return res.data;
};

/* =========================
   DELETE PRODUCT
========================= */
export const deleteProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${API}/product/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

/* =========================
   DELETE MANY
========================= */
export const deleteManyProduct = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${API}/product/delete-many`,
    data,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

/* =========================
   GET ALL TYPE
========================= */
export const getAllTypeProduct = async () => {
  const res = await axios.get(`${API}/product/get-all-type`);
  return res.data;
};
