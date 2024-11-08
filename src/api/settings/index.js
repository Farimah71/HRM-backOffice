import { API_URL } from "../../config";

export const SettingsApi = {
  // ========== AccountType ==========
  getAccountTypes: `${API_URL}/AccountType/Get`,
  getAccountType: `${API_URL}/AccountType/Get/`,
  createAccountType: `${API_URL}/AccountType/Post`,
  editAccountType: `${API_URL}/AccountType/Put/`,
  deleteAccountType: `${API_URL}/AccountType/Delete/`,

  // ========== City ==========
  getCities: `${API_URL}/City/Get`,
  getCity: `${API_URL}/City/Get/`,
  createCity: `${API_URL}/City/Post`,
  editCity: `${API_URL}/City/Put/`,
  deleteCity: `${API_URL}/City/Delete/`,

  // ========== Currency ==========
  getCurrencies: `${API_URL}/Currency/Get`,
  getCurrency: `${API_URL}/Currency/Get/`,
  createCurrency: `${API_URL}/Currency/Post`,
  editCurrency: `${API_URL}/Currency/Put/`,
  deleteCurrency: `${API_URL}/Currency/Delete/`,
  getCurrencySuggestion: `${API_URL}/Currency/Suggestion`,

  // ========== Country ==========
  getCountries: `${API_URL}/Country/Get`,
  getCountry: `${API_URL}/Country/Get/`,
  createCountry: `${API_URL}/Country/Post`,
  editCountry: `${API_URL}/Country/Put/`,
  deleteCountry: `${API_URL}/Country/Delete/`,
  getCountrySuggestion: `${API_URL}/Country/Suggestion`,

  // ========== Course Type ==========
  getCourseTypes: `${API_URL}/CourseType/Get`,
  getCourseType: `${API_URL}/CourseType/Get/`,
  createCourseType: `${API_URL}/CourseType/Post`,
  editCourseType: `${API_URL}/CourseType/Put/`,
  deleteCourseType: `${API_URL}/CourseType/Delete/`,

  // ========== Contract Type ==========
  getContractTypes: `${API_URL}/ContractType/Get`,
  getContractType: `${API_URL}/ContractType/Get/`,
  createContractType: `${API_URL}/ContractType/Post`,
  editContractType: `${API_URL}/ContractType/Put/`,
  deleteContractType: `${API_URL}/ContractType/Delete/`,

  // ========== Expertise ==========
  getExpertises: `${API_URL}/Expertise/Get`,
  getExpertise: `${API_URL}/Expertise/Get/`,
  createExpertise: `${API_URL}/Expertise/Post`,
  editExpertise: `${API_URL}/Expertise/Put/`,
  deleteExpertise: `${API_URL}/Expertise/Delete/`,

  // ========== Feature ==========
  getFeatures: `${API_URL}/Feature/Get`,
  getFeature: `${API_URL}/Feature/Get/`,
  createFeature: `${API_URL}/Feature/Post`,
  editFeature: `${API_URL}/Feature/Put/`,
  deleteFeature: `${API_URL}/Feature/Delete/`,

  // ========== Inventory Type ==========
  getInventoryTypes: `${API_URL}/InventoryType/Get`,
  getInventoryType: `${API_URL}/InventoryType/Get/`,
  createInventoryType: `${API_URL}/InventoryType/Post`,
  editInventoryType: `${API_URL}/InventoryType/Put/`,
  deleteInventoryType: `${API_URL}/InventoryType/Delete/`,

  // ========== Language ==========
  getLanguages: `${API_URL}/Language/Get`,
  getLanguage: `${API_URL}/Language/Get/`,
  createLanguage: `${API_URL}/Language/Post`,
  editLanguage: `${API_URL}/Language/Put/`,
  deleteLanguage: `${API_URL}/Language/Delete/`,
  getLanguageSuggestion: `${API_URL}/Language/Suggestion`,

  // ========== Province ==========
  getProvinces: `${API_URL}/Province/Get`,
  getProvince: `${API_URL}/Province/Get/`,
  createProvince: `${API_URL}/Province/Post`,
  editProvince: `${API_URL}/Province/Put/`,
  deleteProvince: `${API_URL}/Province/Delete/`,
  getProvinceSuggestion: `${API_URL}/Province/Suggestion`,

  // ========== Packet ==========
  getPackets: `${API_URL}/Packet/Get`,
  getPacket: `${API_URL}/Packet/Get/`,
  createPacket: `${API_URL}/Packet/Post`,
  editPacket: `${API_URL}/Packet/Put/`,
  deletePacket: `${API_URL}/Packet/Delete/`,

  // ========== Employee Title ==========
  getEmployeeTitles: `${API_URL}/EmployeeTitle/Get`,
  getEmployeeTitle: `${API_URL}/EmployeeTitle/Get/`,
  createEmployeeTitle: `${API_URL}/EmployeeTitle/Post`,
  editEmployeeTitle: `${API_URL}/EmployeeTitle/Put/`,
  deleteEmployeeTitle: `${API_URL}/EmployeeTitle/Delete/`,

  // ========== Company Position Status ==========
  getAllCompanyPositionStatus: `${API_URL}/CompanyPositionStatus/Get`,
  getCompanyPositionStatus: `${API_URL}/CompanyPositionStatus/Get/`,
  createCompanyPositionStatus: `${API_URL}/CompanyPositionStatus/Post`,
  editCompanyPositionStatus: `${API_URL}/CompanyPositionStatus/Put/`,
  deleteCompanyPositionStatus: `${API_URL}/CompanyPositionStatus/Delete/`,

  // ========== Company Position Group ==========
  getCompanyPositionGroups: `${API_URL}/CompanyPositionGroup/Get`,
  getCompanyPositionGroup: `${API_URL}/CompanyPositionGroup/Get/`,
  createCompanyPositionGroup: `${API_URL}/CompanyPositionGroup/Post`,
  editCompanyPositionGroup: `${API_URL}/CompanyPositionGroup/Put/`,
  deleteCompanyPositionGroup: `${API_URL}/CompanyPositionGroup/Delete/`,

  // ========== Candidate Position Status ==========
  getAllCandidatePositionStatus: `${API_URL}/CandidatePositionStatus/Get`,
  getCandidatePositionStatus: `${API_URL}/CandidatePositionStatus/Get/`,
  createCandidatePositionStatus: `${API_URL}/CandidatePositionStatus/Post`,
  editCandidatePositionStatus: `${API_URL}/CandidatePositionStatus/Put/`,
  deleteCandidatePositionStatus: `${API_URL}/CandidatePositionStatus/Delete/`,

  // ========== Inventory ==========
  getInventories: `${API_URL}/Inventory/Get`,
  getInventory: `${API_URL}/Inventory/Get/`,
  createInventory: `${API_URL}/Inventory/Post`,
  editInventory: `${API_URL}/Inventory/Put/`,
  deleteInventory: `${API_URL}/Inventory/Delete/`,

  // ========== Leave Type ==========
  getLeaveTypes: `${API_URL}/LeaveType/Get`,
  getLeaveType: `${API_URL}/LeaveType/Get/`,
  createLeaveType: `${API_URL}/LeaveType/Post`,
  editLeaveType: `${API_URL}/LeaveType/Put/`,
  deleteLeaveType: `${API_URL}/LeaveType/Delete/`,

  // ========== Military Status ==========
  getAllMilitaryStatus: `${API_URL}/MilitaryStatus/Get`,
  getMilitaryStatus: `${API_URL}/MilitaryStatus/Get/`,
  createMilitaryStatus: `${API_URL}/MilitaryStatus/Post`,
  editMilitaryStatus: `${API_URL}/MilitaryStatus/Put/`,
  deleteMilitaryStatus: `${API_URL}/MilitaryStatus/Delete/`,

  // ========== Permission Type ==========
  getPermissionTypes: `${API_URL}/PermissionType/Get`,
  getPermissionType: `${API_URL}/PermissionType/Get/`,
  createPermissionType: `${API_URL}/PermissionType/Post`,
  editPermissionType: `${API_URL}/PermissionType/Put/`,
  deletePermissionType: `${API_URL}/PermissionType/Delete/`,

  // ========== Person ==========
  getPersons: `${API_URL}/Person/Get`,
  getPerson: `${API_URL}/Person/Get/`,
  createPerson: `${API_URL}/Person/Post`,
  editPerson: `${API_URL}/Person/Put/`,
  deletePerson: `${API_URL}/Person/Delete/`,
  getPersonSuggestion: `${API_URL}/Person/Suggestion`,

  // ========== Role ==========
  getRoles: `${API_URL}/Role/Get`,
  getRole: `${API_URL}/Role/Get/`,
  createRole: `${API_URL}/Role/Post`,
  editRole: `${API_URL}/Role/Put/`,
  deleteRole: `${API_URL}/Role/Delete/`,

  // ========== Role Permission ==========
  getRolePermissions: `${API_URL}/RolePermission/Get`,
  getRolePermission: `${API_URL}/RolePermission/Get/`,
  createRolePermission: `${API_URL}/RolePermission/Post`,
  editRolePermission: `${API_URL}/RolePermission/Put/`,
  deleteRolePermission: `${API_URL}/RolePermission/Delete/`,

  // ========== Work Type ==========
  getWorkTypes: `${API_URL}/WorkType/Get`,
  getWorkType: `${API_URL}/WorkType/Get/`,
  createWorkType: `${API_URL}/WorkType/Post`,
  editWorkType: `${API_URL}/WorkType/Put/`,
  deleteWorkType: `${API_URL}/WorkType/Delete/`,

  // ========== Work Mode ==========
  getWorkModes: `${API_URL}/WorkMode/Get`,
  getWorkMode: `${API_URL}/WorkMode/Get/`,
  createWorkMode: `${API_URL}/WorkMode/Post`,
  editWorkMode: `${API_URL}/WorkMode/Put/`,
  deleteWorkMode: `${API_URL}/WorkMode/Delete/`,

  // ========== Work Location ==========
  getWorkLocations: `${API_URL}/WorkLocation/Get`,
  getWorkLocation: `${API_URL}/WorkLocation/Get/`,
  createWorkLocation: `${API_URL}/WorkLocation/Post`,
  editWorkLocation: `${API_URL}/WorkLocation/Put/`,
  deleteWorkLocation: `${API_URL}/WorkLocation/Delete/`,

  // ========== File Type ==========
  getFileTypes: `${API_URL}/FileType/Get`,
  getFileType: `${API_URL}/FileType/Get/`,
  createFileType: `${API_URL}/FileType/Post`,
  editFileType: `${API_URL}/FileType/Put/`,
  deleteFileType: `${API_URL}/FileType/Delete/`,

  // ========== discipline Type ==========
  getDisciplineTypes: `${API_URL}/DisciplineType/Get`,
  getDisciplineType: `${API_URL}/DisciplineType/Get/`,
  createDisciplineType: `${API_URL}/DisciplineType/Post`,
  editDisciplineType: `${API_URL}/DisciplineType/Put/`,
  deleteDisciplineType: `${API_URL}/DisciplineType/Delete/`,
};
