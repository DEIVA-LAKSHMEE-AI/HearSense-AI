import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export interface UploadResponse {
  status: string;
  filename: string;
  original: string;
  processed: string;
  grid_image: string;
  cropped_graph: string;
  vertical_lines: number;
  horizontal_lines: number;
}

export const uploadAudiogramImage = async (
  file: File
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${API_BASE}/image-analysis/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};