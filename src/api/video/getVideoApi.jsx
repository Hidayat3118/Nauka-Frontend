import axios from "axios";

const API_URL = "https://nauka.vps-poliban.my.id/api/videos";

export const getVideos = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data.data;
  } catch (error) {
    console.error("Gagal nangkap api material", error);
    throw error;
  }
};
