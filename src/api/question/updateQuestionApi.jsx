import axios from "axios";

const BASE_URL = "https://nauka.vps-poliban.my.id/api/materials/questions";

export const updateQuestion = async (questionId, formData, token) => {
  try {
    const res = await axios.post(`${BASE_URL}/${questionId}?_method=PUT`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Gagal update soal:", error.response?.data || error);
    throw error;
  }
};
