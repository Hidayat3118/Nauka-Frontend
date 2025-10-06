import axios from "axios";
const API_URL = "https://nauka.vps-poliban.my.id/api";

export const logout = async () => {
  try {
    // Ambil token dari localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Pengguna belum login.");
    }
    // Kirim token lewat header Authorization
    const res = await axios.post(`${API_URL}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; 
  } catch (error) {
    console.error("Logout Error:", error);

    if (error.response) {
      console.error("Server responded with:", error.response.data);
    } else {
      console.error("Error without response:", error.message);
    }
    throw error; 
  }
};
