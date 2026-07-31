import axios from "axios";

const API = "https://hearsense-ai.onrender.com";

export const getDashboardSummary = async () => {
  const response = await axios.get(`${API}/dashboard/summary`);
  return response.data;
};