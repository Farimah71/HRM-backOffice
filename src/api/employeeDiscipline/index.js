import { API_URL } from "../../config";

export const EmployeeDisciplineApi = {
  getEmployeeDisciplines: `${API_URL}/EmployeeDiscipline/Get`,
  getEmployeeDiscipline: `${API_URL}/EmployeeDiscipline/Get/`,
  createEmployeeDiscipline: `${API_URL}/EmployeeDiscipline/Post`,
  editEmployeeDiscipline: `${API_URL}/EmployeeDiscipline/Put/`,
  deleteEmployeeDiscipline: `${API_URL}/EmployeeDiscipline/Delete/`,
};
