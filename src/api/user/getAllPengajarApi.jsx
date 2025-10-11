import axios from "axios";

const API_URL = "https://nauka.vps-poliban.my.id/api/users/pengajars";

export const getAllPengajar = async () => {
  try {
    // Ambil token dari localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("Token tidak ditemukan. Pastikan user sudah login.");
      return [];
    }

    const res = await axios.get(API_URL);

    return res.data.data || res.data;
  } catch (error) {
    console.error("data semua pengajar gagal di ambil", error);
    throw error;
  }
};
