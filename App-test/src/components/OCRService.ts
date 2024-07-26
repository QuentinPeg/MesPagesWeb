import axios from 'axios';

export const extractTextFromImage = async (imageUrl: string): Promise<string> => {
  try {
    const response = await axios.post('YOUR_OCR_API_ENDPOINT', { imageUrl });
    return response.data.text;
  } catch (error) {
    console.error('Error extracting text from image:', error);
    return '';
  }
};
