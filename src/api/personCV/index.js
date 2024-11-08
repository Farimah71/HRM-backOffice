import { API_URL } from "../../config";

export const PersonCVApi = {
  getPersonCV: `${API_URL}/PersonCv/Get/`,
  createPersonCV: `${API_URL}/PersonCv/Post`,
  editPersonCV: `${API_URL}/PersonCv/Put/`,
  deletePersonCV: `${API_URL}/PersonCv/Delete/`,
  suggestionPersonCV: `${API_URL}/PersonCv/Suggestion`,
};
