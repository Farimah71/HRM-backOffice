import { API_URL } from "../../config";

export const EmployeeInventoryApi = {
  getEmployeeInventory: `${API_URL}/EmployeeInventory/Get/`,
  createEmployeeInventory: `${API_URL}/EmployeeInventory/Post`,
  editEmployeeInventory: `${API_URL}/EmployeeInventory/Put/`,
  deleteEmployeeInventory: `${API_URL}/EmployeeInventory/Delete/`,
};
