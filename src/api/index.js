import { AuthApi } from "./auth";
import { CompanyApi } from "./company/Index";
import { CompanyProjectApi } from "./companyProject/Index";
import { CompanyPositionApi } from "./companyPosition/Index";
import { PreCandidateApi } from "./preCandidate/Index";
import { ServiceApi } from "./service/Index";
import { CandidateApi } from "./candidate";
import { EmployeeApi } from "./employee";
import { CandidatePositionApi } from "./candidatePosition";
import { CandidatePositionOfferApi } from "./candidatePositionOffer";
import { CandidatePositionMeetingApi } from "./candidatePositionMeeting";
import { PersonCVApi } from "./personCV";
import { personExpertiseApi } from "./personExpertise";
import { personFeatureApi } from "./personFeature";
import { EmployeeInventoryApi } from "./employeeInventory";
import { EmployeeLeaveApi } from "./employeeLeave";
import { EmployeeDisciplineApi } from "./employeeDiscipline";
import { EmployeeFileApi } from "./employeeFile";

// ========== Settings ==========
import { SettingsApi } from "./settings";

export const api = {
  AuthApi,
  CompanyApi,
  CompanyProjectApi,
  CompanyPositionApi,
  PreCandidateApi,
  ServiceApi,
  CandidateApi,
  EmployeeApi,
  CandidatePositionApi,
  CandidatePositionOfferApi,
  CandidatePositionMeetingApi,
  PersonCVApi,
  personExpertiseApi,
  personFeatureApi,
  EmployeeInventoryApi,
  EmployeeLeaveApi,
  EmployeeDisciplineApi,
  EmployeeFileApi,

  // ========== Settings ==========
  SettingsApi,
};
