import axios from "axios";
const API_URL = "https://nauka.vps-poliban.my.id/api";

export const login = async (username, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { username, password });
    return res.data;
  } catch {
    throw error;
  }
};
