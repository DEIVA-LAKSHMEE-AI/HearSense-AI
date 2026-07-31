import axios from "axios";

const API = "https://hearsense-ai.onrender.com";

/**
 * Analyze a saved audiogram
 */
export const analyzeAudiogram = async (audiogramId: number) => {
  const response = await axios.get(`${API}/analysis/${audiogramId}`);
  return response.data;
};

/**
 * Download AI Clinical Report (PDF)
 */
export const downloadClinicalReport = async (audiogramId: number) => {
  const response = await axios.get(`${API}/report/${audiogramId}`, {
    responseType: "blob",
  });

  return response.data;
};

/**
 * Get AI Analysis
 */
export const getAnalysis = async (audiogramId: number) => {
  const response = await axios.get(`${API}/analysis/${audiogramId}`);
  return response.data;
};
