import { API_URL } from "../../config";

export const CandidateApi = {
    getCandidates: `${API_URL}/Candidate/Get`,
    createCandidate: `${API_URL}/Candidate/Post`,
    editCandidate: `${API_URL}/Candidate/Put/`,
    deleteCandidate: `${API_URL}/Candidate/Delete/`,
    suggestionCandidate: `${API_URL}/Candidate/Suggestion`,
}