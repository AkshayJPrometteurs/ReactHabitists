import Axios from '../components/Axios';

export const postData = async (url,formData) => {
    try {
        const response = await Axios.post(url, formData);
        return response.data.data;
    } catch (error) {
        throw error.response.data.errors;
    }
};