import axios from "axios";

export const createQuestion = async (materialId, payload, token) => {
  try {
    const API_URL = `https://nauka.vps-poliban.my.id/api/materials/${materialId}/questions`;

    const formData = new FormData();

    formData.append("questions[0][question_text]", payload.question_text || "");
    if (payload.question_image) {
      formData.append("questions[0][question_image]", payload.question_image);
    }

    payload.options.forEach((opt, i) => {
      formData.append(`questions[0][options][${i}][option_text]`, opt.option_text || "");
      if (opt.option_image) {
        formData.append(`questions[0][options][${i}][option_image]`, opt.option_image);
      }
      formData.append(`questions[0][options][${i}][is_correct]`, opt.is_correct);
    });

    const res = await axios.post(API_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Soal berhasil dibuat:", res.data);
    return res.data;
  } catch (error) {
    console.error("Gagal membuat soal:", error.response?.data || error.message);
    throw error;
  }
};
