import axios from "axios";

const API_URL = "http://127.0.0.1:8000/audiograms";

export interface AudiogramData {
  patient_id: number;
  test_date: string;

  right_250: number;
  right_500: number;
  right_1000: number;
  right_2000: number;
  right_4000: number;
  right_8000: number;

  left_250: number;
  left_500: number;
  left_1000: number;
  left_2000: number;
  left_4000: number;
  left_8000: number;
}

export const saveAudiogram = async (data: AudiogramData) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const getAudiograms = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};