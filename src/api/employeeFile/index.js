import { API_URL } from "../../config";

export const EmployeeFileApi = {
  getEmployeeFiles: `${API_URL}/EmployeeFile/Get`,
  getEmployeeFile: `${API_URL}/EmployeeFile/Get/`,
  createEmployeeFile: `${API_URL}/EmployeeFile/Post`,
  editEmployeeFile: `${API_URL}/EmployeeFile/Put/`,
  deleteEmployeeFile: `${API_URL}/EmployeeFile/Delete/`,
};
