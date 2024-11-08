import { combineReducers } from "redux";

import authSlice from "./auth/index";
import loadingSlice from "./ui/loading/index";
import companySlice from "./company/index";
import companyProjectSlice from "./company-project/index";
import companyPositionSlice from "./company-position/index";
import serviceSlice from "./service/index";
import candidateSlice from "./candidate/index";
import personSlice from "./person/index";
import employeeSlice from "./employee/index";
import themeSlice from "./theme/index";

// ========== Settings ==========
import accountTypeSlice from "./settings/account-type/index";
import provinceSlice from "./settings/province/index";
import countrySlice from "./settings/country/index";
import currencySlice from "./settings/currency/index";
import languageSlice from "./settings/language/index";
import contractTypeSlice from "./settings/contract-type/index";
import citySlice from "./settings/city/index";
import courseTypeSlice from "./settings/course-type/index";
import expertiseSlice from "./settings/expertise/index";
import featureSlice from "./settings/feature/index";
import inventoryTypeSlice from "./settings/inventory-type/index";
import leaveTypeSlice from "./settings/leave-type/index";
import militaryStatusSlice from "./settings/military-status/index";
import permissionTypeSlice from "./settings/permission-type/index";
import workTypeSlice from "./settings/work-type/index";
import workModeSlice from "./settings/work-mode/index";
import workLocationSlice from "./settings/work-location/index";
import roleSlice from "./settings/role/index";
import packetSlice from "./settings/packet/index";
import employeeTitleSlice from "./settings/employee-title/index";
import companyPositionStatusSlice from "./settings/company-position-status/index";
import companyPositionGroupSlice from "./settings/comapny-position-group/index";
import candidatePositionStatusSlice from "./settings/candidate-position-status/index";
import inventorySlice from "./settings/inventory/index";
import candidatePositionSlice from "./candidate-position/index";
import candidatePositionOfferSlice from "./candidate-position-offer/index";
import candidatePositionMeetingSlice from "./candidate-position-meeting/index";
import personCVSlice from "./personCV/index";
import personExpertiseSlice from "./person-expertise/index";
import personFeatureSlice from "./person-feature/index";
import employeeInventorySlice from "./employee-inventory/index";
import employeeLeaveSlice from "./employee-leave/index";
import fileTypeSlice from "./settings/file-type/index";
import disciplineTypeSlice from "./settings/discipline-type/index";
import employeeFileSlice from "./employee-file/index";
import employeeDisciplineSlice from "./employee-discipline/index";

export const reducers = combineReducers({
  authSlice,
  loadingSlice,
  companySlice,
  companyProjectSlice,
  companyPositionSlice,
  serviceSlice,
  candidateSlice,
  personSlice,
  employeeSlice,
  candidatePositionSlice,
  themeSlice,
  candidatePositionOfferSlice,
  candidatePositionMeetingSlice,
  personCVSlice,
  personExpertiseSlice,
  personFeatureSlice,
  employeeLeaveSlice,
  employeeInventorySlice,
  employeeFileSlice,
  employeeDisciplineSlice,

  // ========== Settings ==========
  accountTypeSlice,
  provinceSlice,
  countrySlice,
  currencySlice,
  languageSlice,
  contractTypeSlice,
  citySlice,
  courseTypeSlice,
  expertiseSlice,
  featureSlice,
  inventoryTypeSlice,
  leaveTypeSlice,
  militaryStatusSlice,
  permissionTypeSlice,
  roleSlice,
  workTypeSlice,
  workModeSlice,
  workLocationSlice,
  packetSlice,
  employeeTitleSlice,
  companyPositionStatusSlice,
  companyPositionGroupSlice,
  candidatePositionStatusSlice,
  inventorySlice,
  fileTypeSlice,
  disciplineTypeSlice,
});
