import axios from "axios";
const API_URL = "https://nauka.vps-poliban.my.id/api/videos/most-liked";

export const videosMostLikeApi = async () => {
    try {
        res = await axios.get(API_URL);
        return res.data; 
    } catch (error) {
        console.error('gagal di api most-like video' ,error);
        throw error;
    }
}
