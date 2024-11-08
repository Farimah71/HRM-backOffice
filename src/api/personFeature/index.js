import { API_URL } from "../../config";

export const personFeatureApi = {
  getPersonFeature: `${API_URL}/PersonFeature/Get/`,
  createPersonFeature: `${API_URL}/PersonFeature/Post`,
  editPersonFeature: `${API_URL}/PersonFeature/Put/`,
  deletePersonFeature: `${API_URL}/PersonFeature/Delete/`,
  getPersonFeatureSuggestion: `${API_URL}/PersonFeature/Suggestion`,
};
