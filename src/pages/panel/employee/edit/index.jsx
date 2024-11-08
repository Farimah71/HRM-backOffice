import { useTranslation } from "react-i18next";
import { getDataFromJwtToken } from "../../../../helpers/get-data-from-jwt";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Field } from "formik";
import {
  Button,
  MyForm,
  Error,
  Input,
  SelectBox,
  CustomDatePicker,
} from "../../../../components";
import * as Yup from "yup";
import {
  editEmployee,
  getByIdEmployee,
} from "../../../../redux/actions/employee";
import { useEffect, useState } from "react";
import { getMilitaryStatus } from "../../../../redux/actions/settings/military-status";
import { getContractTypes } from "../../../../redux/actions/settings/contract-type";
import { getEmployeeTitles } from "../../../../redux/actions/settings/employee-title";
import { getWorkLocations } from "../../../../redux/actions/settings/work-location";
import { convertArrayToSelectOptions } from "../../../../helpers/convert-array-to-select-options";
import { TabWrapper } from "./../../../../components/tab/index";
import { TabPanel } from "react-tabs";
import { convertDateToString } from "./../../../../helpers/convert-date-to-string";

export const EditEmployee = () => {
  // ---------- store ----------
  const { editInfo, loading } = useSelector((state) => state.employeeSlice);
  // const isLoading = useSelector((state) => state.loadingSlice.isLoading);
  const { info: militaryStatusData, loading: militaryStatusLoading } =
    useSelector((state) => state.militaryStatusSlice);
  const { info: contractTypeData, loading: contractTypeLoading } = useSelector(
    (state) => state.contractTypeSlice
  );
  const { info: employeeTitleData, loading: employeeTitleLoading } =
    useSelector((state) => state.employeeTitleSlice);
  const { info: workLocationData, loading: workLocationLoading } = useSelector(
    (state) => state.workLocationSlice
  );

  // ---------- state ----------
  const [selectOptions, setSelectOptions] = useState({
    candidatePosition: [],
    militaryStatus: [],
    contractType: [],
    employeeTitle: [],
    workLocation: [],
  });
  const [selectedOption, setSelectedOption] = useState({
    candidatePosition: {},
    militaryStatus: {},
    contractType: {},
    employeeTitle: {},
    workLocation: {},
  });
  const [empInfo, setEmpInfo] = useState([]);
  const [formValue, setFormValue] = useState({
    id: null,
    tenantId: 0,
    candidatePositionId: 0,
    militaryStatusId: 0,
    identityNumber: "",
    accommodationAddress: "",
    postponementdDate: "",
    contractTypeId: 0,
    contractDuration: "",
    employeeTitleId: 0,
    workLocationId: 0,
    schoolOfGraduation: "",
    departmentOfGraduation: "",
    dateOfGraduation: "",
    ibanNumber: "",
    companyEmail: "",
    bloodGroup: "",
    emergencyContactInformation: "",
    birthCertificateNumber: "",
    manager: "",
  });

  // ---------- hooks ----------
  const { t } = useTranslation();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlParams = useParams();

  // ---------- variables ----------
  const dataSchema = Yup.object({
    identityNumber: Yup.string().required(t("error.identity_number_required")),
  });
  const { info } = state;

  // ---------- lifeCycles ----------
  useEffect(() => {
    dispatch(
      getByIdEmployee(
        urlParams.id,
        "EmployeeTitle,MilitaryStatus,WorkLocation,ContractType"
      )
    );
    dispatch(getMilitaryStatus({}));
    dispatch(getContractTypes({}));
    dispatch(getEmployeeTitles({}));
    dispatch(getWorkLocations({}));
    const x = info.filter((info) => info.id === +urlParams.id);
    setEmpInfo(x);
  }, []);
  useEffect(() => {
    if (editInfo) {
      setFormValue({
        id: editInfo.id,
        tenantId: getDataFromJwtToken("TenantId"),
        candidatePositionId: editInfo.candidatePositionId,
        militaryStatusId: editInfo.militaryStatusId,
        identityNumber: editInfo.identityNumber,
        accommodationAddress: editInfo.accommodationAddress,
        postponementdDate:
          editInfo.postponementdDate && editInfo.postponementdDate.slice(0, 10),
        contractTypeId: editInfo.contractTypeId,
        contractDuration: editInfo.contractDuration,
        employeeTitleId: editInfo.employeeTitleId,
        workLocationId: editInfo.workLocationId,
        schoolOfGraduation: editInfo.schoolOfGraduation,
        departmentOfGraduation: editInfo.departmentOfGraduation,
        dateOfGraduation:
          editInfo.dateOfGraduation && editInfo.dateOfGraduation.slice(0, 10),
        ibanNumber: editInfo.ibanNumber,
        companyEmail: editInfo.companyEmail,
        bloodGroup: editInfo.bloodGroup,
        emergencyContactInformation: editInfo.emergencyContactInformation,
        birthCertificateNumber: editInfo.birthCertificateNumber,
        manager: editInfo.manager,
      });
      setSelectedOption((prevState) => ({
        ...prevState,
        employeeTitle: {
          value: editInfo.employeeTitle?.id,
          label: editInfo.employeeTitle?.title,
        },
        militaryStatus: {
          value: editInfo.militaryStatus?.id,
          label: editInfo.militaryStatus?.title,
        },
        workLocation: {
          value: editInfo.workLocation?.id,
          label: editInfo.workLocation?.title,
        },
        contractType: {
          value: editInfo.contractType?.id,
          label: editInfo.contractType?.title,
        },
      }));
    }
  }, [editInfo]);
  useEffect(() => {
    if (militaryStatusData.length) {
      const options = convertArrayToSelectOptions(militaryStatusData, [
        "id",
        "title",
      ]);
      setSelectOptions((prev) => ({
        ...prev,
        militaryStatus: options,
      }));
    }
  }, [militaryStatusData]);
  useEffect(() => {
    if (contractTypeData.length) {
      const options = convertArrayToSelectOptions(contractTypeData, [
        "id",
        "title",
      ]);
      setSelectOptions((prev) => ({
        ...prev,
        contractType: options,
      }));
    }
  }, [contractTypeData]);
  useEffect(() => {
    if (employeeTitleData.length) {
      const options = convertArrayToSelectOptions(employeeTitleData, [
        "id",
        "title",
      ]);
      setSelectOptions((prev) => ({
        ...prev,
        employeeTitle: options,
      }));
    }
  }, [employeeTitleData]);
  useEffect(() => {
    if (workLocationData.length) {
      const options = convertArrayToSelectOptions(workLocationData, [
        "id",
        "title",
      ]);
      setSelectOptions((prev) => ({
        ...prev,
        workLocation: options,
      }));
    }
  }, [workLocationData]);

  // ---------- functions ----------
  const onSubmit = (values) => {
    const clone = { ...values };
    const dataToSend = {
      ...clone,
      postponementdDate: clone.postponementdDate
        ? convertDateToString(new Date(clone.postponementdDate))
        : editInfo.postponementdDate,
      dateOfGraduation: clone.dateOfGraduation
        ? convertDateToString(new Date(clone.dateOfGraduation))
        : editInfo.dateOfGraduation,
    };
    dispatch(editEmployee(urlParams.id, dataToSend, navigate));
  };
  
  // ---------- render jsx ----------
  return (
    <div className="bg-white rounded-lg">
      <MyForm
        initialValues={formValue}
        validation={dataSchema}
        submit={onSubmit}
        classes="flex flex-col gap-y-10 p-4"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-18 font-bold dark:text-dark_custom-full-white">
            {t("page_title.edit_employee")}
          </h4>
          <div className="flex items-center justify-end gap-x-2">
            <Field
              component={Button}
              title={t("button.back_title")}
              theme="light"
              onClick={() => navigate("/employee")}
            />
            <Field
              component={Button}
              title={t("button.save_title")}
              loading={loading}
              type="submit"
              theme="dark"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <TabWrapper
            tabs={[
              t("tab.base_info"),
              t("tab.contract_info"),
              t("tab.employment_info"),
            ]}
          >
            <TabPanel>
              <div className="w-full flex gap-x-4 mb-4">
                <div className="w-1/2">
                  <div className="text-14 text-custom-dark font-medium capitalize dark:text-dark_custom-full-white">
                    {t("input.name.label")}
                  </div>
                  <div className="w-full h-10 rounded-md border mt-2 bg-slate-50 border-custom-gray text-custom-dark text-14 placeholder:text-14 placeholder:text-custom-gray-muted p-2 outline-none dark:bg-dark_custom-average-black dark:text-dark_custom-full-white">
                    {empInfo.length && empInfo[0].candidateName}
                  </div>
                  {/* <Field
                component={Input}
                label={t("input.name.label")}
                name="name"
                // value={empInfo && empInfo.candidateName}
                readOnly
              /> */}
                </div>
                <div className="w-1/2">
                  <div className="text-14 text-custom-dark font-medium capitalize dark:text-dark_custom-full-white">
                    {t("input.family.label")}
                  </div>
                  <div className="w-full h-10 rounded-md border mt-2 bg-slate-50 border-custom-gray text-custom-dark text-14 placeholder:text-14 placeholder:text-custom-gray-muted p-2 outline-none dark:bg-dark_custom-average-black dark:text-dark_custom-full-white">
                    {empInfo.length && empInfo[0].candidateFamily}
                  </div>
                  {/* <Field
                component={Input}
                label={t("input.family.label")}
                name="family"
                // value={empInfo && empInfo.candidateFamily}
                readOnly
              /> */}
                </div>
              </div>
              <div className="w-full flex gap-x-4 mb-4">
                <div className="w-1/2">
                  <div className="text-14 text-custom-dark font-medium capitalize dark:text-dark_custom-full-white">
                    {t("input.company_position.label")}
                  </div>
                  <div className="w-full h-10 rounded-md border mt-2 bg-slate-50 border-custom-gray text-custom-dark text-14 placeholder:text-14 placeholder:text-custom-gray-muted p-2 outline-none dark:bg-dark_custom-average-black dark:text-dark_custom-full-white">
                    {empInfo.length && empInfo[0].companyPosition}
                  </div>
                  {/* <Field
                component={Input}
                label={t("input.company_position.label")}
                value={empInfo && empInfo.companyPosition}
                readOnly
              /> */}
                </div>
                <div className="w-1/2">
                  <Field
                    component={SelectBox}
                    label={t("input.military_status.label")}
                    placeholder={t("input.military_status.placeholder")}
                    name="militaryStatusId"
                    options={selectOptions.militaryStatus}
                    selectedOption={selectedOption.militaryStatus}
                    loading={militaryStatusLoading}
                  />
                </div>
              </div>
              <div className="w-full flex gap-x-4 mb-4">
                <div className="w-1/2">
                  <Field
                    component={Input}
                    type="number"
                    name="identityNumber"
                    label={t("input.identity_number.label")}
                    placeholder={t("input.identity_number.placeholder")}
                  />
                  <Error name="identityNumber" />
                </div>
                <div className="w-1/2">
                  <Field
                    component={Input}
                    name="accommodationAddress"
                    label={t("input.accommodation_address.label")}
                    placeholder={t("input.accommodation_address.placeholder")}
                    complex
                  />
                </div>
              </div>
              <div className="w-full flex gap-x-4 mb-4">
                <div className="w-1/2">
                  <Field
                    component={CustomDatePicker}
                    name="postponementdDate"
                    label={t("input.postponement_date.label")}
                    placeholder={t("input.postponement_date.placeholder")}
                  />
                </div>
                <div className="w-1/2">
                  <Field
                    component={SelectBox}
                    name="contractTypeId"
                    label={t("input.contract_type.label")}
                    placeholder={t("input.contract_type.placeholder")}
                    options={selectOptions.contractType}
                    selectedOption={selectedOption.contractType}
                    loading={contractTypeLoading}
                  />
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="w-full flex gap-x-4 mb-4">
                <div className="w-1/2">
                  <Field
                    component={SelectBox}
                    name="employeeTitleId"
                    label={t("input.employee_title.label")}
                    placeholder={t("input.employee_title.placeholder")}
                    options={selectOptions.employeeTitle}
                    selectedOption={selectedOption.employeeTitle}
                    loading={employeeTitleLoading}
                  />
                </div>
                <div className="w-1/2">
                  <Field
                    component={SelectBox}
                    name="workLocationId"
                    label={t("input.work_location.label")}
                    placeholder={t("input.work_location.placeholder")}
                    options={selectOptions.workLocation}
                    selectedOption={selectedOption.workLocation}
                    loading={workLocationLoading}
                  />
                </div>
              </div>
              <div className="w-full flex gap-x-4 mb-4">
                <div className="w-1/2">
                  <Field
                    component={Input}
                    name="contractDuration"
                    label={t("input.contract_duration.label")}
                    placeholder={t("input.contract_duration.placeholder")}
                    complex
                  />
                </div>
                <div className="w-1/2">
                  <Field
                    component={Input}
                    name="schoolOfGraduation"
                    label={t("input.school_of_graduation.label")}
                    placeholder={t("input.school_of_graduation.placeholder")}
                  />
                </div>
              </div>
              <div className="w-full flex gap-x-4 mb-4">
                <div className="w-1/2">
                  <Field
                    component={Input}
                    name="departmentOfGraduation"
                    label={t("input.department_of_graduation.label")}
                    placeholder={t(
                      "input.department_of_graduation.placeholder"
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <Field
                    component={CustomDatePicker}
                    name="dateOfGraduation"
                    label={t("input.date_of_graduation.label")}
                    placeholder={t("input.date_of_graduation.placeholder")}
                  />
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="w-full flex gap-x-4 mb-4">
                <div className="w-1/2">
                  <Field
                    component={Input}
                    type="number"
                    name="ibanNumber"
                    label={t("input.IBAN_number.label")}
                    placeholder={t("input.IBAN_number.placeholder")}
                  />
                </div>
                <div className="w-1/2">
                  <Field
                    component={Input}
                    name="companyEmail"
                    label={t("input.company_email.label")}
                    placeholder={t("input.company_email.placeholder")}
                    complex
                  />
                </div>
              </div>
              <div className="w-full flex gap-x-4 mb-4">
                <div className="w-1/2">
                  <Field
                    component={Input}
                    name="bloodGroup"
                    label={t("input.blood_group.label")}
                    placeholder={t("input.blood_group.placeholder")}
                  />
                </div>
                <div className="w-1/2">
                  <Field
                    component={Input}
                    type="number"
                    name="emergencyContactInformation"
                    label={t("input.emergency_contact_information.label")}
                    placeholder={t(
                      "input.emergency_contact_information.placeholder"
                    )}
                  />
                </div>
              </div>
              <div className="w-full flex gap-x-4 mb-4">
                <div className="w-1/2">
                  <Field
                    component={Input}
                    type="number"
                    name="birthCertificateNumber"
                    label={t("input.birth_certificate_number.label")}
                    placeholder={t(
                      "input.birth_certificate_number.placeholder"
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <Field
                    component={Input}
                    name="manager"
                    label={t("input.manager.label")}
                    placeholder={t("input.manager.placeholder")}
                  />
                </div>
              </div>
            </TabPanel>
          </TabWrapper>
        </div>
      </MyForm>
    </div>
  );
};
