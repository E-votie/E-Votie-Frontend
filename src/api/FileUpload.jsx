// fileUpload.js

import axios from 'axios';
const BaseURL = import.meta.env.VITE_API_BASE_URL;

// Helper function for uploading a file
export const uploadFile = async (fileData, fileName, baseUrl = BaseURL) => {
    const formData = new FormData();
    const file = new File([fileData[0]], fileName, { type: fileData.type });
    formData.append('file', file);

    try {
        const response = await axios.post(`${baseUrl}/api/files/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Error uploading file');
    }
};
