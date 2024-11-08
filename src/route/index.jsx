import React, { Suspense } from "react";
import { lazily } from "react-lazily";
import { Routes, Route } from "react-router-dom";
import { Loading } from "../components";
import PrivateRoute from "./private";

// ---------- Layouts ----------
const { MainLayout } = lazily(() => import("../layout/_main"));
const { PanelLayout } = lazily(() => import("../layout/_panel"));

// ---------- Authentication Pages ----------
const { Login } = lazily(() => import("../pages/auth/login"));
const { Signup } = lazily(() => import("../pages/auth/signup"));

// ---------- Dashboard Page ----------
const { Dashboard } = lazily(() => import("../pages/panel/dashboard"));

// ---------- Company Pages ----------
const { Company } = lazily(() => import("../pages/panel/company"));
const { CreateCompany } = lazily(() => import("../pages/panel/company/create"));
const { EditCompany } = lazily(() => import("../pages/panel/company/edit"));

// ---------- CompanyProject Pages ----------
const { CompanyProject } = lazily(() =>
  import("../pages/panel/company-project")
);
const { CreateCompanyProject } = lazily(() =>
  import("../pages/panel/company-project/create")
);
const { EditCompanyProject } = lazily(() =>
  import("../pages/panel/company-project/edit")
);

// ---------- CompanyPosition Pages ----------
const { CompanyPosition } = lazily(() =>
  import("../pages/panel/company-position")
);
const { CreateCompanyPosition } = lazily(() =>
  import("../pages/panel/company-position/create")
);
const { EditCompanyPosition } = lazily(() =>
  import("../pages/panel/company-position/edit")
);

// ---------- PreCandidate Pages ----------
const { PreCandidate } = lazily(() => import("../pages/panel/pre-candidate"));
const { CreatePreCandidate } = lazily(() =>
  import("../pages/panel/pre-candidate/create")
);

// ---------- Account Type Pages ----------
const { AccountType } = lazily(() =>
  import("../pages/panel/settings/account-type")
);
const { CreateAccountType } = lazily(() =>
  import("../pages/panel/settings/account-type/create")
);
const { EditAccountType } = lazily(() =>
  import("../pages/panel/settings/account-type/edit")
);

// ---------- Province Pages ----------
const { Province } = lazily(() => import("../pages/panel/settings/province"));
const { CreateProvince } = lazily(() =>
  import("../pages/panel/settings/province/create")
);
const { EditProvince } = lazily(() =>
  import("../pages/panel/settings/province/edit")
);

// ---------- Country Pages ----------
const { Country } = lazily(() => import("../pages/panel/settings/country"));
const { CreateCountry } = lazily(() =>
  import("../pages/panel/settings/country/create")
);
const { EditCountry } = lazily(() =>
  import("../pages/panel/settings/country/edit")
);

// ---------- Currency Pages ----------
const { Currency } = lazily(() => import("../pages/panel/settings/currency"));
const { CreateCurrency } = lazily(() =>
  import("../pages/panel/settings/currency/create")
);
const { EditCurrency } = lazily(() =>
  import("../pages/panel/settings/currency/edit")
);

// ---------- Language Pages ----------
const { Language } = lazily(() => import("../pages/panel/settings/language"));

// ---------- Contract Type Pages ----------
const { ContractType } = lazily(() =>
  import("../pages/panel/settings/contract-type")
);

// ---------- City Pages ----------
const { City } = lazily(() => import("../pages/panel/settings/city"));
const { CreateCity } = lazily(() =>
  import("../pages/panel/settings/city/create")
);
const { EditCity } = lazily(() => import("../pages/panel/settings/city/edit"));

// ---------- Course Type Pages ----------
const { CourseType } = lazily(() =>
  import("../pages/panel/settings/course-type")
);
const { CreateCourseType } = lazily(() =>
  import("../pages/panel/settings/course-type/create")
);
const { EditCourseType } = lazily(() =>
  import("../pages/panel/settings/course-type/edit")
);

// ---------- Expertise Pages ----------
const { Expertise } = lazily(() => import("../pages/panel/settings/expertise"));
const { CreateExpertise } = lazily(() =>
  import("../pages/panel/settings/expertise/create")
);
const { EditExpertise } = lazily(() =>
  import("../pages/panel/settings/expertise/edit")
);

// ---------- Feature Pages ----------
const { Feature } = lazily(() => import("../pages/panel/settings/feature"));
const { CreateFeature } = lazily(() =>
  import("../pages/panel/settings/feature/create")
);
const { EditFeature } = lazily(() =>
  import("../pages/panel/settings/feature/edit")
);

// ---------- Inventory Type Pages ----------
const { InventoryType } = lazily(() =>
  import("../pages/panel/settings/inventory-type")
);
const { CreateInventoryType } = lazily(() =>
  import("../pages/panel/settings/inventory-type/create")
);
const { EditInventoryType } = lazily(() =>
  import("../pages/panel/settings/inventory-type/edit")
);

// ---------- Inventory Pages ----------
const { Inventory } = lazily(() => import("../pages/panel/settings/inventory"));
const { CreateInventory } = lazily(() =>
  import("../pages/panel/settings/inventory/create")
);
const { EditInventory } = lazily(() =>
  import("../pages/panel/settings/inventory/edit")
);

// ---------- Leave Type Pages ----------
const { LeaveType } = lazily(() =>
  import("../pages/panel/settings/leave-type")
);
const { CreateLeaveType } = lazily(() =>
  import("../pages/panel/settings/leave-type/create")
);
const { EditLeaveType } = lazily(() =>
  import("../pages/panel/settings/leave-type/edit")
);

// ---------- Military Status Pages ----------
const { MilitaryStatus } = lazily(() =>
  import("../pages/panel/settings/military-status")
);
const { CreateMilitaryStatus } = lazily(() =>
  import("../pages/panel/settings/military-status/create")
);
const { EditMilitaryStatus } = lazily(() =>
  import("../pages/panel/settings/military-status/edit")
);

// ---------- Permission Type Pages ----------
const { PermissionType } = lazily(() =>
  import("../pages/panel/settings/permission-type")
);
const { CreatePermissionType } = lazily(() =>
  import("../pages/panel/settings/permission-type/create")
);
const { EditPermissionType } = lazily(() =>
  import("../pages/panel/settings/permission-type/edit")
);

// ---------- Role Pages ----------
const { Role } = lazily(() => import("../pages/panel/settings/role"));
const { CreateRole } = lazily(() =>
  import("../pages/panel/settings/role/create")
);
const { EditRole } = lazily(() => import("../pages/panel/settings/role/edit"));

// ---------- Work Type Pages ----------
const { WorkType } = lazily(() => import("../pages/panel/settings/work-type"));
const { CreateWorkType } = lazily(() =>
  import("../pages/panel/settings/work-type/create")
);
const { EditWorkType } = lazily(() =>
  import("../pages/panel/settings/work-type/edit")
);

// ---------- Work Mode Pages ----------
const { WorkMode } = lazily(() => import("../pages/panel/settings/work-mode"));
const { CreateWorkMode } = lazily(() =>
  import("../pages/panel/settings/work-mode/create")
);
const { EditWorkMode } = lazily(() =>
  import("../pages/panel/settings/work-mode/edit")
);

// ---------- Work Location Pages ----------
const { WorkLocation } = lazily(() =>
  import("../pages/panel/settings/work-location")
);
const { CreateWorkLocation } = lazily(() =>
  import("../pages/panel/settings/work-location/create")
);
const { EditWorkLocation } = lazily(() =>
  import("../pages/panel/settings/work-location/edit")
);

// ---------- Packet Pages ----------
const { Packet } = lazily(() => import("../pages/panel/settings/packet"));
const { CreatePacket } = lazily(() =>
  import("../pages/panel/settings/packet/create")
);
const { EditPacket } = lazily(() =>
  import("../pages/panel/settings/packet/edit")
);

const { TimeSheet } = lazily(() => import("../pages/panel/time-sheet"));

// ---------- Employee Title Pages ----------
const { EmployeeTitle } = lazily(() =>
  import("../pages/panel/settings/employee-title")
);
const { CreateEmployeeTitle } = lazily(() =>
  import("../pages/panel/settings/employee-title/create")
);
const { EditEmployeeTitle } = lazily(() =>
  import("../pages/panel/settings/employee-title/edit")
);

// ---------- Employee Pages ----------
const { Employee } = lazily(() => import("../pages/panel/employee"));
const { EditEmployee } = lazily(() => import("../pages/panel/employee/edit"));

// ---------- Company Position Status Pages ----------
const { CompanyPositionStatus } = lazily(() =>
  import("../pages/panel/settings/company-position-status")
);
const { CreateCompanyPositionStatus } = lazily(() =>
  import("../pages/panel/settings/company-position-status/create")
);
const { EditCompanyPositionStatus } = lazily(() =>
  import("../pages/panel/settings/company-position-status/edit")
);

// ---------- Company Position Group Pages ----------
const { CompanyPositionGroup } = lazily(() =>
  import("../pages/panel/settings/company-position-group")
);
const { CreateCompanyPositionGroup } = lazily(() =>
  import("../pages/panel/settings/company-position-group/create")
);
const { EditCompanyPositionGroup } = lazily(() =>
  import("../pages/panel/settings/company-position-group/edit")
);

// ---------- Candidate Position Status Pages ----------
const { CandidatePositionStatus } = lazily(() =>
  import("../pages/panel/settings/candidate-position-status")
);
const { CreateCandidatePositionStatus } = lazily(() =>
  import("../pages/panel/settings/candidate-position-status/create")
);
const { EditCandidatePositionStatus } = lazily(() =>
  import("../pages/panel/settings/candidate-position-status/edit")
);

const { ComingSoon } = lazily(() => import("../pages/coming-soon/index"));

// ---------- Candidate Pages ----------
const { Candidate } = lazily(() => import("../pages/panel/candidate"));
const { CandidateFeature } = lazily(() =>
  import("../pages/panel/candidate/form/feature")
);
const { CandidateExpertise } = lazily(() =>
  import("../pages/panel/candidate/form/expertise")
);

// ---------- file Type Pages ----------
const { FileType } = lazily(() =>
  import("../pages/panel/settings/file-type/index")
);
const { CreateFileType } = lazily(() =>
  import("../pages/panel/settings/file-type/create")
);
const { EditFileType } = lazily(() =>
  import("../pages/panel/settings/file-type/edit")
);

// ---------- discipline Type Pages ----------
const { DisciplineType } = lazily(() =>
  import("../pages/panel/settings/discipline-type/index")
);
const { CreateDisciplineType } = lazily(() =>
  import("../pages/panel/settings/discipline-type/create")
);
const { EditDisciplineType } = lazily(() =>
  import("../pages/panel/settings/discipline-type/edit")
);

const Index = () => {
  // ---------- render jsx ----------
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<PanelLayout />}>
            <Route index element={<Dashboard />} />
            {/* ---------- Company Routes ---------- */}
            <Route path="/company" element={<Company />} />
            <Route path="/company/create" element={<CreateCompany />} />
            <Route path="/company/edit/:id" element={<EditCompany />} />

            {/* ---------- CompanyProject Routes ---------- */}
            <Route path="/companyProject" element={<CompanyProject />} />
            <Route
              path="/companyProject/create"
              element={<CreateCompanyProject />}
            />
            <Route
              path="/companyProject/edit/:id"
              element={<EditCompanyProject />}
            />

            {/* ---------- CompanyPosition Routes ---------- */}
            <Route path="/companyPosition" element={<CompanyPosition />} />
            <Route
              path="/companyPosition/create"
              element={<CreateCompanyPosition />}
            />
            <Route
              path="/companyPosition/edit/:id"
              element={<EditCompanyPosition />}
            />

            {/* ---------- Candidate Routes ---------- */}
            <Route path="/candidate" element={<Candidate />} />
            <Route path="/candidate/feature" element={<CandidateFeature />} />
            <Route
              path="/candidate/expertise"
              element={<CandidateExpertise />}
            />

            {/* ---------- Employee Routes ---------- */}
            <Route path="/employee" element={<Employee />} />
            <Route path="/employee/edit/:id" element={<EditEmployee />} />

            {/* ---------- Account Type Routes ---------- */}
            <Route path="/accountType" element={<AccountType />} />
            <Route path="/accountType/create" element={<CreateAccountType />} />
            <Route path="/accountType/edit/:id" element={<EditAccountType />} />

            {/* ---------- Province Routes ---------- */}
            <Route path="/province" element={<Province />} />
            <Route path="/province/create" element={<CreateProvince />} />
            <Route path="/province/edit/:id" element={<EditProvince />} />

            {/* ---------- Country Routes ---------- */}
            <Route path="/country" element={<Country />} />
            <Route path="/country/create" element={<CreateCountry />} />
            <Route path="/country/edit/:id" element={<EditCountry />} />

            {/* ---------- Currency Pages ---------- */}
            <Route path="/currency" element={<Currency />} />
            <Route path="/currency/create" element={<CreateCurrency />} />
            <Route path="/currency/edit/:id" element={<EditCurrency />} />

            {/* ---------- Language Pages ---------- */}
            <Route path="/language" element={<Language />} />

            {/* ---------- Contract Type Pages ---------- */}
            <Route path="/contractType" element={<ContractType />} />

            {/* ---------- City Routes ---------- */}
            <Route path="/city" element={<City />} />
            <Route path="/city/create" element={<CreateCity />} />
            <Route path="/city/edit/:id" element={<EditCity />} />

            {/* ---------- Course Type Routes ---------- */}
            <Route path="/courseType" element={<CourseType />} />
            <Route path="/courseType/create" element={<CreateCourseType />} />
            <Route path="/courseType/edit/:id" element={<EditCourseType />} />

            {/* ---------- Expertise Routes ---------- */}
            <Route path="/expertise" element={<Expertise />} />
            <Route path="/expertise/create" element={<CreateExpertise />} />
            <Route path="/expertise/edit/:id" element={<EditExpertise />} />

            {/* ---------- Feature Routes ---------- */}
            <Route path="/feature" element={<Feature />} />
            <Route path="/feature/create" element={<CreateFeature />} />
            <Route path="/feature/edit/:id" element={<EditFeature />} />

            {/* ----------File Type Routes---------- */}
            <Route path="/fileType" element={<FileType />} />
            <Route path="/fileType/create" element={<CreateFileType />} />
            <Route path="/fileType/edit/:id" element={<EditFileType />} />

            {/* ----------discipline Type Routes---------- */}
            <Route path="/disciplineType" element={<DisciplineType />} />
            <Route
              path="/disciplineType/create"
              element={<CreateDisciplineType />}
            />
            <Route
              path="/disciplineType/edit/:id"
              element={<EditDisciplineType />}
            />

            {/* ---------- Inventory Type Routes ---------- */}
            <Route path="/inventoryType" element={<InventoryType />} />
            <Route
              path="/inventoryType/create"
              element={<CreateInventoryType />}
            />
            <Route
              path="/inventoryType/edit/:id"
              element={<EditInventoryType />}
            />

            {/* ---------- Inventory Routes ---------- */}
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/create" element={<CreateInventory />} />
            <Route path="/inventory/edit/:id" element={<EditInventory />} />

            {/* ---------- Leave Type Routes ---------- */}
            <Route path="/leaveType" element={<LeaveType />} />
            <Route path="/leaveType/create" element={<CreateLeaveType />} />
            <Route path="/leaveType/edit/:id" element={<EditLeaveType />} />

            {/* ---------- Military Status Routes ---------- */}
            <Route path="/militaryStatus" element={<MilitaryStatus />} />
            <Route
              path="/militaryStatus/create"
              element={<CreateMilitaryStatus />}
            />
            <Route
              path="/militaryStatus/edit/:id"
              element={<EditMilitaryStatus />}
            />

            {/* ---------- Permission Type Routes ---------- */}
            <Route path="/permissionType" element={<PermissionType />} />
            <Route
              path="/permissionType/create"
              element={<CreatePermissionType />}
            />
            <Route
              path="/permissionType/edit/:id"
              element={<EditPermissionType />}
            />

            {/* ---------- Role Routes ---------- */}
            <Route path="/role" element={<Role />} />
            <Route path="/role/create" element={<CreateRole />} />
            <Route path="/role/edit/:id" element={<EditRole />} />

            {/* ---------- Work Type Routes ---------- */}
            <Route path="/workType" element={<WorkType />} />
            <Route path="/workType/create" element={<CreateWorkType />} />
            <Route path="/workType/edit/:id" element={<EditWorkType />} />

            {/* ---------- Work Mode Routes ---------- */}
            <Route path="/workMode" element={<WorkMode />} />
            <Route path="/workMode/create" element={<CreateWorkMode />} />
            <Route path="/workMode/edit/:id" element={<EditWorkMode />} />

            {/* ---------- Work Location Routes ---------- */}
            <Route path="/workLocation" element={<WorkLocation />} />
            <Route
              path="/workLocation/create"
              element={<CreateWorkLocation />}
            />
            <Route
              path="/workLocation/edit/:id"
              element={<EditWorkLocation />}
            />

            <Route path="/timesheet" element={<TimeSheet />} />

            {/* ---------- Packet Routes ---------- */}
            <Route path="/packet" element={<Packet />} />
            <Route path="/packet/create" element={<CreatePacket />} />
            <Route path="/packet/edit/:id" element={<EditPacket />} />

            {/* ---------- Employee Title Routes ---------- */}
            <Route path="/employeeTitle" element={<EmployeeTitle />} />
            <Route
              path="/employeeTitle/create"
              element={<CreateEmployeeTitle />}
            />
            <Route
              path="/employeeTitle/edit/:id"
              element={<EditEmployeeTitle />}
            />

            {/* ---------- Company Position Status Routes ---------- */}
            <Route
              path="/companyPositionStatus"
              element={<CompanyPositionStatus />}
            />
            <Route
              path="/companyPositionStatus/create"
              element={<CreateCompanyPositionStatus />}
            />
            <Route
              path="/companyPositionStatus/edit/:id"
              element={<EditCompanyPositionStatus />}
            />

            {/* ---------- Company Position Group Routes ---------- */}
            <Route
              path="/companyPositionGroup"
              element={<CompanyPositionGroup />}
            />
            <Route
              path="/companyPositionGroup/create"
              element={<CreateCompanyPositionGroup />}
            />
            <Route
              path="/companyPositionGroup/edit/:id"
              element={<EditCompanyPositionGroup />}
            />

            {/* ---------- Candidate Position Status Routes ---------- */}
            <Route
              path="/candidatePositionStatus"
              element={<CandidatePositionStatus />}
            />
            <Route
              path="/candidatePositionStatus/create"
              element={<CreateCandidatePositionStatus />}
            />
            <Route
              path="/candidatePositionStatus/edit/:id"
              element={<EditCandidatePositionStatus />}
            />
            <Route path="*" element={<ComingSoon />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Index;
