import { API_URL } from "../../config";

export const CandidatePositionMeetingApi = {
  getCandidatePositionMeetings: `${API_URL}/CandidatePositionMeeting/Get/`,
  createCandidatePositionMeeting: `${API_URL}/CandidatePositionMeeting/Post`,
  editCandidatePositionMeeting: `${API_URL}/CandidatePositionMeeting/Put/`,
  deleteCandidatePositionMeeting: `${API_URL}/CandidatePositionMeeting/Delete/`,
  suggestionCandidatePositionMeeting: `${API_URL}/CandidatePositionMeeting/Suggestion`,
};
