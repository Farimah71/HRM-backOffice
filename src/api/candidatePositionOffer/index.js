import { API_URL } from "../../config";

export const CandidatePositionOfferApi = {
  getCandidatePositionOffers: `${API_URL}/CandidatePositionOffer/Get/`,
  createCandidatePositionOffer: `${API_URL}/CandidatePositionOffer/Post`,
  editCandidatePositionOffer: `${API_URL}/CandidatePositionOffer/Put/`,
  deleteCandidatePositionOffer: `${API_URL}/CandidatePositionOffer/Delete/`,
  suggestionCandidatePositionOffer: `${API_URL}/CandidatePositionOffer/Suggestion`,
};
