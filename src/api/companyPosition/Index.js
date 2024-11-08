import { API_URL } from "../../config";

export const CompanyPositionApi = {
    getCompanyPositions: `${API_URL}/CompanyPosition/Get`,
    getCompanyPosition: `${API_URL}/CompanyPosition/Get/`,
    createCompanyPosition: `${API_URL}/CompanyPosition/Post`,
    editCompanyPosition: `${API_URL}/CompanyPosition/Put/`,
    deleteCompanyPosition: `${API_URL}/CompanyPosition/Delete/`
}