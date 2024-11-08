import { API_URL } from "../../config";

export const CandidatePositionApi = {
  getCandidatePosition: `${API_URL}/CandidatePosition/Get/`,
  createCandidatePosition: `${API_URL}/CandidatePosition/Post`,
  editCandidatePosition: `${API_URL}/CandidatePosition/Put/`,
  deleteCandidatePosition: `${API_URL}/CandidatePosition/Delete/`,
  changeStatusCandidatePosition: `${API_URL}/CandidatePosition/ChangeStatus/`,
};
