import axios from "axios";

const API_URL = "https://nauka.vps-poliban.my.id/api";

export const toggleLike = async (materialId, token) => {
  const res = await axios.post(`${API_URL}/materials/${materialId}/like`, {}, {
    headers: {
        Authorization:`Bearer ${token}`
    }
  });
  return res.data;
};
