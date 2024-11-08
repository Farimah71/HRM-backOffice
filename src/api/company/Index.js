import { API_URL } from "../../config";

export const CompanyApi = {
    getCompanies: `${ API_URL }/Company/Get`,
    getCompany: `${ API_URL }/Company/Get/`,
    createCompany: `${ API_URL }/Company/Post`,
    editCompany: `${ API_URL }/Company/Put/`,
    deleteCompany: `${ API_URL }/Company/Delete/`,
    getCompanySuggestion: `${ API_URL }/Company/Suggestion`
}