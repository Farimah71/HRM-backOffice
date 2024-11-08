import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  MyForm,
  SearchBox,
  Table,
  SelectBox,
} from "../../../components";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  getEmployees,
  getEmployeeSuggestions,
} from "../../../redux/actions/employee";
import { getCompanies } from "../../../redux/actions/company";
import { getCompanyProjects } from "../../../redux/actions/company-project";
import { getCompanyPositions } from "../../../redux/actions/company-position";
import { getDataFromJwtToken } from "../../../helpers/get-data-from-jwt";
import { convertArrayToSelectOptions } from "../../../helpers/convert-array-to-select-options";
import { Tooltip } from "react-tooltip";
import { RiStarHalfSFill } from "react-icons/ri";
import { LuListChecks } from "react-icons/lu";
import { CgToolbox } from "react-icons/cg";
import { FaRegCalendarTimes } from "react-icons/fa";
import { AiOutlineFile } from "react-icons/ai";
import { MdOutlineClearAll } from "react-icons/md";
import { GoStop } from "react-icons/go";
import { Field } from "formik";
import { EmployeeFeature } from "./form/feature";
import { EmployeeExpertise } from "./form/expertise";
import { EmployeeDiscipline } from "./form/discipline";
import { EmployeeFile } from "./form/file";
import { SearchModal } from "./search-modal";
import { Inventory } from "./form/inventory";
import { Leave } from "./form/leave";
import { Quit } from "./form/quit";
import { changeStatusCandidatePosition } from "../../../redux/actions/candidate-position";
import { FiMoreHorizontal } from "react-icons/fi";

export const Employee = () => {
  // ---------- states ----------
  const [isReload, setIsReload] = useState(false);
  const [reFetchData, setReFetchData] = useState(false);
  const [data, setData] = useState();
  const [companyPositionId, setCompanyPositionId] = useState();
  const [employee, setEmployee] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [infoModal, setInfoModal] = useState({
    type: "",
    data: null,
  });
  const [selectOptions, setSelectOptions] = useState({
    company: [],
    companyProject: [],
    companyPosition: [],
  });

  // ---------- store ----------
  const {
    info: employeeData,
    loading,
    count,
  } = useSelector((state) => state.employeeSlice);
  const {
    info: { data: companyData },
    loading: companyLoading,
  } = useSelector((state) => state.companySlice);
  const {
    info: { data: companyProjectData },
    loading: companyProjectLoading,
  } = useSelector((state) => state.companyProjectSlice);
  const {
    info: { data: companyPositionData },
    loading: companyPositionLoading,
  } = useSelector((state) => state.companyPositionSlice);

  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ---------- variables ----------
  const cols = [
    {
      name: t("table.col.no"),
      cell: (row) => (
        <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
          {row.rowId}
        </div>
      ),
    },
    {
      name: t("table.col.name"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.name}</p>
      ),
    },
    {
      name: t("table.col.employee_title"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.employeeTitle}</p>
      ),
    },
    {
      name: t("table.col.phone_number"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.phone}</p>
      ),
    },
    {
      name: t("table.col.company_email"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.email}</p>
      ),
    },
    {
      name: t("table.col.action"),
      cell: (row) => (
        <div className="group relative flex items-center justify-center gap-x-2">
          <FiMoreHorizontal
            size={20}
            className={`ml-2 cursor-pointer absolute -translate-x-16 dark:text-dark_custom-full-white`}
          />
          <div
            className={`group-hover:block group-hover:opacity-100 opacity-0 transition duration-500 dark:bg-dark_custom-light-black`}
          >
            <div className="w-[140px] relative flex flex-wrap gap-1 bg-white dark:bg-dark_custom-light-black p-1 rounded-md mb-1 cursor-pointer">
              <Link
                to={`/employee/edit/${row.id}`}
                state={{
                  info: employee,
                }}
                className="group relative flex justify-center items-center"
              >
                <span className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.3"
                      d="M14.2667 5.56754L12.8334 7.00754L8.99337 3.16754L10.4334 1.73421C10.5577 1.60516 10.7069 1.50252 10.8718 1.43241C11.0368 1.36231 11.2141 1.32617 11.3934 1.32617C11.5726 1.32617 11.75 1.36231 11.9149 1.43241C12.0799 1.50252 12.229 1.60516 12.3534 1.73421L14.2667 3.64754C14.3957 3.77192 14.4984 3.92104 14.5685 4.08598C14.6386 4.25093 14.6747 4.42831 14.6747 4.60754C14.6747 4.78677 14.6386 4.96415 14.5685 5.1291C14.4984 5.29404 14.3957 5.44316 14.2667 5.56754ZM2.46003 14.6209L6.59337 13.2475L2.75337 9.40754L1.38003 13.5409C1.3297 13.6913 1.32229 13.8528 1.35865 14.0072C1.39501 14.1616 1.4737 14.3029 1.58587 14.415C1.69805 14.5272 1.83927 14.6059 1.99368 14.6423C2.1481 14.6786 2.30959 14.6712 2.46003 14.6209Z"
                      fill="#A1A5B7"
                    />
                    <path
                      d="M3.71337 14.2013L2.46003 14.6213C2.30959 14.6716 2.1481 14.679 1.99368 14.6427C1.83927 14.6063 1.69805 14.5276 1.58587 14.4155C1.4737 14.3033 1.39501 14.1621 1.35865 14.0077C1.32229 13.8532 1.3297 13.6917 1.38003 13.5413L1.80003 12.288L3.71337 14.2013ZM2.75337 9.40797L6.59337 13.248L12.8334 7.00797L8.99337 3.16797L2.75337 9.40797Z"
                      fill="#A1A5B7"
                    />
                  </svg>
                </span>
              </Link>
              <span
                className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
                onClick={() =>
                  row.personCvId && handleOpenModal("expertise", { ...row })
                }
              >
                <RiStarHalfSFill
                  size={14}
                  color="gray"
                  data-tooltip-id="expertise"
                  data-tooltip-content={t("popup.expertise")}
                  className={`outline-none ${
                    row.personCvId ? "opacity-70" : "opacity-30"
                  }`}
                />
                <Tooltip id="expertise" />
              </span>
              <span
                className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
                onClick={() =>
                  row.personCvId && handleOpenModal("feature", { ...row })
                }
              >
                <LuListChecks
                  size={14}
                  color="gray"
                  data-tooltip-id="feature"
                  data-tooltip-content={t("popup.feature")}
                  className={`outline-none ${
                    row.personCvId ? "opacity-70" : "opacity-30"
                  }`}
                />
                <Tooltip id="feature" />
              </span>
              <span
                className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
                onClick={() => handleOpenModal("inventory", { ...row })}
              >
                <CgToolbox
                  size={14}
                  color="gray"
                  data-tooltip-id="inventory"
                  data-tooltip-content={t("tooltip.inventory")}
                  className="outline-none opacity-70"
                />
                <Tooltip id="inventory" />
              </span>
              <span
                className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
                onClick={() => handleOpenModal("leave", { ...row })}
              >
                <FaRegCalendarTimes
                  size={14}
                  color="gray"
                  data-tooltip-id="leave"
                  data-tooltip-content={t("tooltip.leave")}
                  className="outline-none opacity-70"
                />
                <Tooltip id="leave" />
              </span>
              <span
                className="relative p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
                onClick={() => {
                  handleOpenModal("quit", { ...row });
                }}
              >
                <GoStop
                  size={14}
                  color="gray"
                  data-tooltip-id="quit"
                  data-tooltip-content={t("tooltip.quit")}
                  className="outline-none opacity-70"
                />
                <Tooltip id="quit" />
              </span>
              <span
                className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
                onClick={() => handleOpenModal("discipline", { ...row })}
              >
                <MdOutlineClearAll
                  size={15}
                  color="gray"
                  data-tooltip-id="discipline"
                  data-tooltip-content={t("tooltip.discipline")}
                  className="outline-none opacity-70"
                />
                <Tooltip id="discipline" />
              </span>
              <span
                className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
                onClick={() => handleOpenModal("file", { ...row })}
              >
                <AiOutlineFile
                  size={15}
                  color="gray"
                  data-tooltip-id="file"
                  data-tooltip-content={t("tooltip.file")}
                  className="outline-none opacity-70"
                />
                <Tooltip id="file" />
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];
  const searchFieldData = {};

  // ---------- lifeCycle ----------
  useEffect(() => {
    const options = {
      pageNumber: 0,
      pageSize: 0,
      filters: [
        {
          property: "TenantId",
          operation: 5,
          values: [getDataFromJwtToken("TenantId")],
        },
      ],
    };
    dispatch(getCompanies(options));
    setIsReload(true);
  }, []);
  useEffect(() => {
    if (isReload) {
      dispatch(
        getEmployees({
          pageNumber: 0,
          pageSize: 0,
          filters: [
            {
              property: "TenantId",
              operation: 5,
              values: [`${getDataFromJwtToken("TenantId")}`],
            },
          ],
          includeProperties:
            "CandidatePosition.Candidate,CandidatePosition.CompanyPosition",
        })
      );
    }
  }, [isReload]);
  useEffect(() => {
    if (employeeData.length > 0) {
      const values = employeeData.map((item, index) => ({
        rowId: index + 1,
        id: item.id,
        name: `${item.candidatePosition.candidate.name} ${item.candidatePosition.candidate.family}`,
        employeeTitle: item.candidatePosition.companyPosition.title,
        phone: item.candidatePosition.candidate.phoneNumber,
        email: item.companyEmail,
        personCvId: item.candidatePosition.personCvId,
        personId: item.candidatePosition.candidate.personId,
        candidatePositionId: item.candidatePositionId,
      }));
      setData(values);
    }

    if (employeeData.length) {
      const x = employeeData.map((item) => ({
        id: item.id,
        companyPosition: item.candidatePosition.companyPosition.title,
        candidateName: item.candidatePosition.candidate.name,
        candidateFamily: item.candidatePosition.candidate.family,
      }));
      setEmployee(x);
    }
  }, [employeeData]);
  useEffect(() => {
    if (reFetchData) {
      reFetchEmployees();
    }
  }, [reFetchData]);
  useEffect(() => {
    if (companyData) {
      const options = convertArrayToSelectOptions(companyData, ["id", "title"]);
      setSelectOptions((prevState) => ({
        ...prevState,
        company: options,
      }));
    }
  }, [companyData]);
  useEffect(() => {
    if (companyProjectData) {
      const options = convertArrayToSelectOptions(companyProjectData, [
        "id",
        "title",
      ]);
      setSelectOptions((prevState) => ({
        ...prevState,
        companyProject: options,
      }));
    } else {
      setSelectOptions((prevState) => ({
        ...prevState,
        companyProject: [],
      }));
    }
  }, [companyProjectData]);
  useEffect(() => {
    if (companyPositionData) {
      const options = convertArrayToSelectOptions(companyPositionData, [
        "id",
        "title",
      ]);
      setSelectOptions((prevState) => ({
        ...prevState,
        companyPosition: options,
      }));
    } else {
      setSelectOptions((prevState) => ({
        ...prevState,
        companyPosition: [],
      }));
    }
    // if (!companyPositionData?.length) {
    //   const emptyColumns = columns.map((col) => ({ ...col, data: [] }));
    //   setColumns(emptyColumns);
    // }
  }, [companyPositionData]);

  // ---------- functions ----------
  const handleOpenModal = (type, data) => {
    setOpenModal(true);
    setInfoModal({
      type,
      data,
    });
  };
  const reFetchEmployees = () => {
    dispatch(
      getEmployees({
        pageNumber: 0,
        pageSize: 0,
        filters: [
          {
            property: "TenantId",
            operation: 5,
            values: [`${getDataFromJwtToken("TenantId")}`],
          },
        ],
        includeProperties:
          "CandidatePosition.Candidate,CandidatePosition.CompanyPosition",
      })
    );
    setOpenModal(false);
  };
  const handleSearchEmployee = (event) => {
    if (event.keyCode === 13) {
      let params = {
        pageNumber: 0,
        pageSize: 0,
        filters: [
          {
            property: "PhoneNumber",
            operation: 7,
            values: [`${event.target.value}`],
          },
        ],
        includeProperties:
          "CandidatePositions,CandidatePositions.CandidatePositionStatus,CandidatePositions.CompanyPosition,CandidatePositions.CompanyPosition.Company",
        // companyPositionId: null,
      };
      dispatch(
        getEmployeeSuggestions(params, (data) =>
          handleOpenModal("searchEmployee", data)
        )
      );
    }
  };
  const handleChangeStatus = (id, status) => {
    setIsReload(false);
    dispatch(
      changeStatusCandidatePosition(
        {
          candidatePositionId: id,
          candidatePositionStatusId:
            status === "company" ? 30 : status === "position" ? 29 : null,
        },
        (status) => setIsReload(status)
        )
    );
  };
  const handleChangeSelect = (title, property, id) => {
    const options = {
      pageNumber: 0,
      pageSize: 0,
      filters: [
        {
          property: property,
          operation: 5,
          values: [`${id}`],
        },
      ],
    };
    if (title === "company") {
      dispatch(getCompanyProjects(options));
    } else if (title === "companyProject") {
      dispatch(getCompanyPositions(options));
    }
  };
  const handleCompanyPositionSelect = (selected) => {
    setCompanyPositionId(selected.value);
    if (selected.value) {
      // dispatch(getEmployees({ companyPositionId: selected.value }));
    }
  };

  // ---------- render jsx ----------
  return (
    <>
      <Modal state={openModal} onCloseModal={setOpenModal}>
        {infoModal.type === "feature" && (
          <EmployeeFeature
            state={infoModal.data}
            onCloseModal={() => setOpenModal(false)}
          />
        )}
        {infoModal.type === "expertise" && (
          <EmployeeExpertise
            state={infoModal.data}
            onCloseModal={() => setOpenModal(false)}
          />
        )}
        {infoModal.type === "inventory" && (
          <Inventory
            state={infoModal.data}
            onCloseModal={() => setOpenModal(false)}
          />
        )}
        {infoModal.type === "leave" && (
          <Leave
            state={infoModal.data}
            onCloseModal={() => setOpenModal(false)}
          />
        )}
        {infoModal.type === "searchEmployee" && (
          <SearchModal
            infoEmployee={infoModal.data}
            onCloseModal={() => setOpenModal(false)}
            onClick={(id) => reFetchEmployees(id)}
          />
        )}
        {infoModal.type === "discipline" && (
          <EmployeeDiscipline
            state={infoModal.data}
            onCloseModal={() => setOpenModal(false)}
          />
        )}
        {infoModal.type === "file" && (
          <EmployeeFile
            state={infoModal.data}
            onCloseModal={() => setOpenModal(false)}
          />
        )}
        {infoModal.type === "quit" && (
          <Quit
            handleChangeStatus={handleChangeStatus}
            onCloseModal={() => setOpenModal(false)}
            data={infoModal.data}
          />
        )}
      </Modal>
      <div className="dark:bg-dark_custom-light-black rounded-10 bg-white">
        <div className="flex flex-col gap-y-8 w-full p-6 dark:bg-dark_custom-light-black">
          <div className="flex justify-between items-center">
            <div className="w-full flex flex-col gap-y-1">
              <h4 className="text-19 text-custom-dark font-bold dark:text-dark_custom-full-white mb-5">
                {t("page_title.employee")}
              </h4>

              <div>
                <MyForm initialValues={searchFieldData}>
                  <div className="flex items-center gap-x-4 dark:bg-dark_custom-light-black">
                    <Field
                      component={SelectBox}
                      placeholder={t("input.company.placeholder")}
                      options={selectOptions.company}
                      name="company"
                      onChangeHandler={(data) =>
                        handleChangeSelect("company", "CompanyId", data.value)
                      }
                      loading={companyLoading}
                    />
                    <Field
                      component={SelectBox}
                      placeholder={t("input.company_project.placeholder")}
                      options={selectOptions.companyProject}
                      name="companyProject"
                      onChangeHandler={(data) =>
                        handleChangeSelect(
                          "companyProject",
                          "CompanyProjectId",
                          data.value
                        )
                      }
                      loading={companyProjectLoading}
                    />
                    <Field
                      component={SelectBox}
                      placeholder={t("input.company_position.placeholder")}
                      options={selectOptions.companyPosition}
                      name="companyPosition"
                      loading={companyPositionLoading}
                      onChangeHandler={handleCompanyPositionSelect}
                    />
                    <Field
                      component={SearchBox}
                      placeholder={t("input.search.placeholder")}
                      name="search"
                      onChange={handleSearchEmployee}
                    />
                  </div>
                </MyForm>
              </div>
              <h4 className="text-14 flex gap-x-2 mt-10 text-custom-gray-muted dark:text-dark_custom-light-white">
                {t("table.result")}
                <span className="text-custom-gray-200 font-bold dark:text-dark_custom-light-white">
                  {count}
                </span>
              </h4>
            </div>
          </div>
          {loading ? (
            <ClipLoader color="#FE6601" className="w-full mx-auto" />
          ) : (
            <Table cols={cols} data={data} />
          )}
        </div>
      </div>
    </>
  );
};
