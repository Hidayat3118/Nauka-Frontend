import axios from "axios";

export const getQuestions = async (materialId) => {
  try {
    const token = localStorage.getItem("token");
    const API_URL = `https://nauka.vps-poliban.my.id/api/materials/${materialId}/questions`;

    const res = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data; // pastikan sesuai struktur API kamu
  } catch (error) {
    console.error("Gagal memuat soal:", error.response?.data || error);
    throw error;
  }
};
