// src/lib/api.js
import axios from "axios";

const API_URL = "https://nauka.vps-poliban.my.id/api";

const api = axios.create({
  baseURL: API_URL,
});

// Ambil profil user
export const getUserProfile = async (token) => {
  try {
    const response = await api.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data; // langsung ambil data user-nya
  } catch (error) {
    console.error("Gagal ambil profil:", error);
    throw error;
  }
};
