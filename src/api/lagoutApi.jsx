import axios from "axios";
const API_URL = "https://nauka.vps-poliban.my.id/api";

export const logout = async () => {
  try {
    const res = await axios.post(`${API_URL}/logout`);
    return await res;
  } catch {
    throw error;
  }
};
