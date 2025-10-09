import axios from "axios";

const API_URL = "https://nauka.vps-poliban.my.id/api";

/**
 * Ambil semua soal dari satu materi
 * @param {number|string} materialId
 * @param {string} token
 * @returns {Promise<Array>} - Array of questions
 */
export const getQuestionsByMaterialId = async (materialId, token) => {
  try {
    const response = await axios.get(`${API_URL}/materials/${materialId}/questions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
