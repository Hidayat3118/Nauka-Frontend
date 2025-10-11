import axios from "axios";

export const createQuestion = async (materialId, payload, token) => {
  try {
    const API_URL = `https://nauka.vps-poliban.my.id/api/materials/${materialId}/questions`;

    const res = await axios.post(
      API_URL,
      {
        questions: [payload], // ✅ wrap di dalam array sesuai format backend
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Soal berhasil dibuat:", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "Gagal membuat soal:",
      error.response?.data || error.message
    );
    throw error;
  }
};
