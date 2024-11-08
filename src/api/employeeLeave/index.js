import { API_URL } from "../../config";

export const EmployeeLeaveApi = {
  getEmployeeLeave: `${API_URL}/EmployeeLeave/Get/`,
  createEmployeeLeave: `${API_URL}/EmployeeLeave/Post`,
  editEmployeeLeave: `${API_URL}/EmployeeLeave/Put/`,
  deleteEmployeeLeave: `${API_URL}/EmployeeLeave/Delete/`,
};
