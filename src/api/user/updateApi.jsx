import axios from "axios";

const API_URL = "https://nauka.vps-poliban.my.id/api";

const api = axios.create({
  baseURL: API_URL,
});

// Update profil user
export const updateUserProfile = async (token, updatedData) => {
  const response = await api.put("/user/profile", updatedData, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return response.data;
};
