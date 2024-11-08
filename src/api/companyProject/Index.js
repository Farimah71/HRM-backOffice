import { API_URL } from "../../config";

export const CompanyProjectApi = {
    getCompanyProjects: `${ API_URL }/CompanyProject/Get`,
    getCompanyProject: `${ API_URL }/CompanyProject/Get/`,
    createCompanyProject: `${ API_URL }/CompanyProject/Post`,
    editCompanyProject: `${ API_URL }/CompanyProject/Put/`,
    deleteCompanyProject: `${ API_URL }/CompanyProject/Delete/`
}