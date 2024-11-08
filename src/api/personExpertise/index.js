import { API_URL } from "../../config";

export const personExpertiseApi = {
  getPersonExpertise: `${API_URL}/PersonExpertise/Get/`,
  createPersonExpertise: `${API_URL}/PersonExpertise/Post`,
  editPersonExpertise: `${API_URL}/PersonExpertise/Put/`,
  deletePersonExpertise: `${API_URL}/PersonExpertise/Delete/`,
  getPersonExpertiseSuggestion: `${API_URL}/PersonExpertise/Suggestion`,
};
