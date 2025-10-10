import axios from "axios";

const API_URL = "https://nauka.vps-poliban.my.id/api/materials/newest";

export const getMaterialNew = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data.data;
    } catch (error) {
        console.log('error gagal menangkap api material baru', error);
        throw error;
    }
}
