import axios from "axios";
const API_URL = "https://nauka.vps-poliban.my.id/api";

export const register = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/register`, data);
    return res.data;
  } catch (error) {
    console.error("gagal di api register", error.response?.data || error);
    throw error;
  }
};
