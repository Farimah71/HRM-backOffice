import { API_URL } from "../../config";

export const EmployeeApi = {
  getAllEmployees: `${API_URL}/Employee/Get`,
  getEmployee: `${API_URL}/Employee/Get/`,
  createEmployee: `${API_URL}/Employee/Post`,
  editEmployee: `${API_URL}/Employee/Put/`,
  deleteEmployee: `${API_URL}/Employee/Delete/`,
  suggestionEmployee: `${API_URL}/Employee/Suggestion`,
};
