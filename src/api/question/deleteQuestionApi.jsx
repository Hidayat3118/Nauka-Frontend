import axios from "axios";

const BASE_URL = "https://nauka.vps-poliban.my.id/api/materials/questions";

export const deleteQuestion = async (id, token) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Gagal menghapus soal:", error.response?.data || error);
    throw error;
  }
};
