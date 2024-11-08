import { useRef, useState } from "react";
import {
  Button,
  Modal,
  MyForm,
  SearchBox,
  SelectBox,
  Table,
} from "../../../components";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromJwtToken } from "../../../helpers/get-data-from-jwt";
import { getCompanies } from "../../../redux/actions/company";
import { getCompanyProjects } from "../../../redux/actions/company-project";
import { getCompanyPositions } from "../../../redux/actions/company-position";
import {
  getCandidates,
  getCandidateSuggestions,
} from "../../../redux/actions/candidate";
import { getAllCandidatePositionStatus } from "../../../redux/actions/settings/candidate-position-status";
import {
  changeStatusCandidatePosition,
  createCandidatePosition,
} from "../../../redux/actions/candidate-position";
import { getCountries } from "../../../redux/actions/settings/country";
import { convertArrayToSelectOptions } from "../../../helpers/convert-array-to-select-options";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { CreateCandidate } from "./form/candidate";
import { ChangeStatus } from "./form/status";
import { PositionOffer } from "./form/offer";
import { PositionMeeting } from "./form/meeting";
import { SearchModal } from "./search-modal";
import { CgExpand } from "react-icons/cg";
import { TbArrowBackUp } from "react-icons/tb";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaRegHandshake } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import { LuUpload, LuDownload } from "react-icons/lu";
import { EditModal } from "./edit";
import { Tooltip } from "react-tooltip";
import { useComponentToggle } from "../../../hooks/useComponentToggle";
import { UploadCV } from "./form/CV";
import { getByIdPersonCV } from "../../../redux/actions/personCV";
import { warningNotification } from "../../../helpers/notification";
import { useNavigate } from "react-router-dom";
import { RiStarHalfSFill } from "react-icons/ri";
import { LuListChecks } from "react-icons/lu";
import { CandidateExpertise } from "./form/expertise";
import { CandidateFeature } from "./form/feature";

export const Candidate = () => {
  // ----------- store ------------
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
  const {
    info: { data: candidateData },
    loading: candidateLoading,
  } = useSelector((state) => state.candidateSlice);
  const {
    info: { data: candidatePositionStatusData },
  } = useSelector((state) => state.candidatePositionStatusSlice);
  const {
    info: { data: countryData },
  } = useSelector((state) => state.countrySlice);

  // ----------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  useComponentToggle(ref, () => setIsStatusIndex({ ...null }));

  // ---------- variables ----------
  const preCandidateCol = [
    {
      name: t("table.col.name"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.name}</p>
      ),
    },
    {
      name: t("table.col.family"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.family}</p>
      ),
    },
    {
      name: t("table.col.email"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.email}</p>
      ),
    },
    {
      name: t("table.col.phone_number"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.phoneNumber}</p>
      ),
    },
    {
      name: t("table.col.status"),
      cell: (row) => (
        <span
          className={`rounded-lg p-3 ${
            row.candidateGroup === 1
              ? "text-custom-yellow-dark bg-custom-yellow-light"
              : row.candidateGroup === 2
              ? "text-custom-purple-dark bg-custom-purple-light"
              : row.candidateGroup === 3
              ? "text-custom-red-dark bg-custom-red-light"
              : row.candidateGroup === 4
              ? "text-custom-green-dark bg-custom-green-light"
              : "text-black bg-gray-300"
          }`}
        >
          {row.candidatePositionStatus.title}
        </span>
      ),
    },
    {
      name: t("table.col.action"),
      cell: (row) => (
        <div className="group relative flex items-center justify-center gap-x-1">
          <span
            className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
            onClick={() =>
              handleOpenModal("editPerson", {
                ...row,
              })
            }
          >
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
          <span
            className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
            onClick={() => handleOpenModal("uploadCv", { ...row })}
          >
            <LuUpload
              size={15}
              color="gray"
              data-tooltip-id="upload_CV"
              data-tooltip-content={t("popup.upload_CV")}
              className="outline-none opacity-80"
            />
            <Tooltip id="upload_CV" />
          </span>
          <a
            className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
            onClick={(event) => {
              row.candidatePosition.personCvId
                ? dispatch(
                    getByIdPersonCV(row.candidatePosition.personCvId, (state) =>
                      (function getReady(s) {
                        if (s) {
                          downloadURI(s.cvContent, s.fileName);
                        }
                      })(state)
                    )
                  )
                : warningNotification(t("toast.no_CV"));
            }}
          >
            <LuDownload
              size={15}
              color="gray"
              data-tooltip-id="download_CV"
              data-tooltip-content={t("popup.download_CV")}
              className={`outline-none ${
                row.candidatePosition.personCvId ? "opacity-70" : "opacity-30"
              }`}
            />
            <Tooltip id="download_CV" />
          </a>
        </div>
      ),
    },
  ];
  const candidateCol = [
    {
      name: t("table.col.name"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.name}</p>
      ),
    },
    {
      name: t("table.col.family"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.family}</p>
      ),
    },
    {
      name: t("table.col.email"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.email}</p>
      ),
    },
    {
      name: t("table.col.phone_number"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.phoneNumber}</p>
      ),
    },
    {
      name: t("table.col.status"),
      cell: (row) => (
        <span
          className={`rounded-lg p-3 ${
            row.candidateGroup === 1
              ? "text-custom-yellow-dark bg-custom-yellow-light"
              : row.candidateGroup === 2
              ? "text-custom-purple-dark bg-custom-purple-light"
              : row.candidateGroup === 3
              ? "text-custom-red-dark bg-custom-red-light"
              : row.candidateGroup === 4
              ? "text-custom-green-dark bg-custom-green-light"
              : "text-black bg-gray-300"
          }`}
        >
          {row.candidatePositionStatus.title}
        </span>
      ),
    },
    {
      name: t("table.col.action"),
      cell: (row) => (
        <div className="group relative flex items-center justify-center gap-x-2">
          <FiMoreHorizontal
            size={20}
            className="ml-2 cursor-pointer dark:text-dark_custom-full-white"
          />
          <div className="group-hover:block group-hover:opacity-100 transition duration-500 -translate-x-10 opacity-0">
            <div className="w-[140px] flex flex-wrap gap-1 bg-white p-2 rounded-md dark:bg-dark_custom-light-black">
              <span
                className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
                onClick={() =>
                  handleOpenModal("editPerson", {
                    ...row,
                  })
                }
              >
                <svg
                  width="15"
                  height="15"
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
              <span
                className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
                onClick={() => handleOpenModal("positionOffer", { ...row })}
              >
                <FaRegHandshake
                  size={14}
                  color="gray"
                  data-tooltip-id="offer"
                  data-tooltip-content={t("popup.offer")}
                  data-tooltip-place="top"
                  className="outline-none opacity-80"
                />
                <Tooltip place="top" id="offer" />
              </span>
              <span
                className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
                onClick={() => handleOpenModal("positionMeeting", { ...row })}
              >
                <IoMdPeople
                  size={14}
                  color="gray"
                  data-tooltip-id="meeting"
                  data-tooltip-content={t("popup.meeting")}
                  className="outline-none opacity-80"
                />
                <Tooltip place="top" id="meeting" />
              </span>
              <span
                className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
                onClick={() => handleOpenModal("uploadCv", { ...row })}
              >
                <LuUpload
                  size={14}
                  color="gray"
                  data-tooltip-id="upload_CV"
                  data-tooltip-content={t("popup.upload_CV")}
                  className="outline-none opacity-80"
                />
                <Tooltip place="top" id="upload_CV" />
              </span>
              <a
                className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
                onClick={(event) => {
                  row.candidatePosition.personCvId
                    ? dispatch(
                        getByIdPersonCV(
                          row.candidatePosition.personCvId,
                          (state) =>
                            (function getReady(s) {
                              if (s) {
                                downloadURI(s.cvContent, s.fileName);
                              }
                            })(state)
                        )
                      )
                    : warningNotification(t("toast.no_CV"));
                }}
              >
                <LuDownload
                  size={14}
                  color="gray"
                  data-tooltip-id="download_CV"
                  data-tooltip-content={t("popup.download_CV")}
                  className={`outline-none ${
                    row.candidatePosition.personCvId
                      ? "opacity-70"
                      : "opacity-30"
                  }`}
                />
                <Tooltip place="top" id="download_CV" />
              </a>
              <span
                className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
                onClick={() => {
                  row.candidatePosition.personCvId
                    ? handleOpenModal("expertise", { ...row })
                    : warningNotification(t("toast.CV_upload_first"));
                }}
              >
                <RiStarHalfSFill
                  size={15}
                  color="gray"
                  data-tooltip-id="expertise"
                  data-tooltip-content={t("popup.expertise")}
                  className={`outline-none ${
                    row.candidatePosition.personCvId
                      ? "opacity-70"
                      : "opacity-30"
                  }`}
                />
                <Tooltip place="top" id="expertise" />
              </span>

              <span
                className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
                onClick={() => {
                  row.candidatePosition.personCvId
                    ? handleOpenModal("feature", { ...row })
                    : warningNotification(t("toast.CV_upload_first"));
                }}
              >
                <Tooltip place="bottom" id="feature" />
                <LuListChecks
                  size={15}
                  color="gray"
                  data-tooltip-id="feature"
                  data-tooltip-content={t("popup.feature")}
                  className={`outline-none ${
                    row.candidatePosition.personCvId
                      ? "opacity-70"
                      : "opacity-30"
                  }`}
                />
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];
  const rejectedCol = [
    {
      name: t("table.col.name"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.name}</p>
      ),
    },
    {
      name: t("table.col.family"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.family}</p>
      ),
    },
    {
      name: t("table.col.email"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.email}</p>
      ),
    },
    {
      name: t("table.col.phone_number"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.phoneNumber}</p>
      ),
    },
    {
      name: t("table.col.status"),
      cell: (row) => (
        <span
          className={`rounded-lg p-3 ${
            row.candidateGroup === 1
              ? "text-custom-yellow-dark bg-custom-yellow-light"
              : row.candidateGroup === 2
              ? "text-custom-purple-dark bg-custom-purple-light"
              : row.candidateGroup === 3
              ? "text-custom-red-dark bg-custom-red-light"
              : row.candidateGroup === 4
              ? "text-custom-green-dark bg-custom-green-light"
              : "text-black bg-gray-300"
          }`}
        >
          {row.candidatePositionStatus.title}
        </span>
      ),
    },
    {
      name: t("table.col.action"),
      cell: (row) => (
        <div className="group relative flex items-center justify-center gap-x-2">
          <div className="dark:text-dark_custom-full-white">
            <div className="flex gap-1 bg-white dark:bg-dark_custom-light-black p-2 rounded-md">
              <span
                className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
                onClick={() =>
                  handleOpenModal("editPerson", {
                    ...row,
                  })
                }
              >
                <svg
                  width="15"
                  height="15"
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
              <span
                className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
                onClick={() => handleOpenModal("positionOffer", { ...row })}
              >
                <FaRegHandshake
                  size={14}
                  color="gray"
                  data-tooltip-id="offer"
                  data-tooltip-content={t("popup.offer")}
                  className="outline-none opacity-80"
                />
                <Tooltip place="top" id="offer" />
              </span>
              <span
                className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
                onClick={() => handleOpenModal("positionMeeting", { ...row })}
              >
                <IoMdPeople
                  size={14}
                  color="gray"
                  data-tooltip-id="meeting"
                  data-tooltip-content={t("popup.meeting")}
                  className="outline-none opacity-80"
                />
                <Tooltip id="meeting" />
              </span>
              <a
                className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
                onClick={(event) => {
                  row.candidatePosition.personCvId
                    ? dispatch(
                        getByIdPersonCV(
                          row.candidatePosition.personCvId,
                          (state) =>
                            (function getReady(s) {
                              if (s) {
                                downloadURI(s.cvContent, s.fileName);
                              }
                            })(state)
                        )
                      )
                    : warningNotification(t("toast.no_CV"));
                }}
              >
                <LuDownload
                  size={14}
                  color="gray"
                  data-tooltip-id="download_CV"
                  data-tooltip-content={t("popup.download_CV")}
                  className={`outline-none ${
                    row.candidatePosition.personCvId
                      ? "opacity-70"
                      : "opacity-30"
                  }`}
                />
                <Tooltip id="download_CV" />
              </a>
            </div>
          </div>
        </div>
      ),
    },
  ];
  const employeeCol = [
    {
      name: t("table.col.name"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.name}</p>
      ),
    },
    {
      name: t("table.col.family"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.family}</p>
      ),
    },
    {
      name: t("table.col.email"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.email}</p>
      ),
    },
    {
      name: t("table.col.phone_number"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.phoneNumber}</p>
      ),
    },
    {
      name: t("table.col.status"),
      cell: (row) => (
        <span
          className={`rounded-lg p-3 ${
            row.candidateGroup === 1
              ? "text-custom-yellow-dark bg-custom-yellow-light"
              : row.candidateGroup === 2
              ? "text-custom-purple-dark bg-custom-purple-light"
              : row.candidateGroup === 3
              ? "text-custom-red-dark bg-custom-red-light"
              : row.candidateGroup === 4
              ? "text-custom-green-dark bg-custom-green-light"
              : "text-black bg-gray-300"
          }`}
        >
          {row.candidatePositionStatus.title}
        </span>
      ),
    },
    {
      name: t("table.col.action"),
      cell: (row) => (
        <div className="group relative flex items-center justify-center gap-x-1">
          <span
            className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
            onClick={() => {
              row.candidatePosition.personCvId
                ? handleOpenModal("expertise", { ...row })
                : warningNotification(t("toast.CV_upload_first"));
            }}
          >
            <RiStarHalfSFill
              size={16}
              color="gray"
              data-tooltip-id="expertise"
              data-tooltip-content={t("popup.expertise")}
              className={`outline-none ${
                row.candidatePosition.personCvId ? "opacity-70" : "opacity-30"
              }`}
            />
            <Tooltip id="expertise" />
          </span>

          <span
            className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
            onClick={() => {
              row.candidatePosition.personCvId
                ? handleOpenModal("feature", { ...row })
                : warningNotification(t("toast.CV_upload_first"));
            }}
          >
            <LuListChecks
              size={16}
              color="gray"
              data-tooltip-id="feature"
              data-tooltip-content={t("popup.feature")}
              className={`outline-none ${
                row.candidatePosition.personCvId ? "opacity-70" : "opacity-30"
              }`}
            />
            <Tooltip id="feature" />
          </span>
        </div>
      ),
    },
  ];
  const quittedCol = [
    {
      name: t("table.col.name"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.name}</p>
      ),
    },
    {
      name: t("table.col.family"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.family}</p>
      ),
    },
    {
      name: t("table.col.email"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.email}</p>
      ),
    },
    {
      name: t("table.col.phone_number"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.phoneNumber}</p>
      ),
    },
    {
      name: t("table.col.status"),
      cell: (row) => (
        <span
          className={`rounded-lg p-3 ${
            row.candidateGroup === 1
              ? "text-custom-yellow-dark bg-custom-yellow-light"
              : row.candidateGroup === 2
              ? "text-custom-purple-dark bg-custom-purple-light"
              : row.candidateGroup === 3
              ? "text-custom-red-dark bg-custom-red-light"
              : row.candidateGroup === 4
              ? "text-custom-green-dark bg-custom-green-light"
              : "text-black bg-gray-300"
          }`}
        >
          {row.candidatePositionStatus.title}
        </span>
      ),
    },
  ];

  // ----------- states ------------
  const [searched, setSearched] = useState(false);
  const [searchFilterData, setSearchFilterData] = useState({
    companyId: null,
    companyProjectId: null,
    companyPositionId: null,
  });
  const [statusIndex, setIsStatusIndex] = useState({
    candidate: null,
    preCandidate: null,
    rejected: null,
    employee: null,
  });
  const [openModal, setOpenModal] = useState(false);
  const [reFetchData, setReFetchData] = useState(false);
  const [infoModal, setInfoModal] = useState({
    type: "",
    data: null,
  });
  const [isActiveCards, setIsActiveCards] = useState(false);
  const [companyPositionId, setCompanyPositionId] = useState();
  const [columns, setColumns] = useState([
    {
      id: "1",
      title: t("card.pre_candidate"),
      data: [],
      cols: preCandidateCol,
    },
    {
      id: "2",
      title: t("card.candidate"),
      data: [],
      cols: candidateCol,
    },
    {
      id: "3",
      title: t("card.rejected"),
      data: [],
      cols: rejectedCol,
    },
    {
      id: "4",
      title: t("card.employee"),
      data: [],
      cols: employeeCol,
    },
    {
      id: "5",
      title: t("card.quitted"),
      data: [],
      cols: quittedCol,
    },
  ]);
  const [columnId, setColumnId] = useState();
  const [selectOptions, setSelectOptions] = useState({
    company: [],
    companyProject: [],
    companyPosition: [],
  });

  // ----------- function ----------
  const statusClickHandler = (key, index) => {
    if (key === "candidate") {
      statusIndex[key] !== index &&
        setIsStatusIndex({ candidate: +index, ...null });
    } else if (key === "preCandidate") {
      statusIndex[key] !== index &&
        setIsStatusIndex({ preCandidate: +index, ...null });
    } else if (key === "rejected") {
      statusIndex[key] !== index &&
        setIsStatusIndex({ rejected: +index, ...null });
    } else {
      statusIndex[key] !== index &&
        setIsStatusIndex({ employee: +index, ...null });
    }
  };
  const handleOnDragEnd = (result) => {
    let params;
    const droppableId = result.source.droppableId;
    const index = result.source.index;
    const item = columns[droppableId].data[index];
    const filteredItems = columns[droppableId].data.filter(
      (candidate) => candidate.id !== item.id
    );
    if (
      (result.source.droppableId == 0 && result.destination.droppableId == 1) ||
      (result.source.droppableId == 2 && result.destination.droppableId == 1) ||
      (result.source.droppableId == 4 && result.destination.droppableId == 1)
    ) {
      params = {
        candidatePositionId: item.candidatePositionId,
        candidatePositionStatusId: 7,
      };
    } else if (
      (result.source.droppableId == 1 && result.destination.droppableId == 0) ||
      (result.source.droppableId == 2 && result.destination.droppableId == 0) ||
      (result.source.droppableId == 4 && result.destination.droppableId == 0)
    ) {
      params = {
        candidatePositionId: item.candidatePositionId,
        candidatePositionStatusId: 1,
      };
    } else if (
      (result.source.droppableId == 0 && result.destination.droppableId == 2) ||
      (result.source.droppableId == 1 && result.destination.droppableId == 2) ||
      (result.source.droppableId == 1 && result.destination.droppableId == 3)
    ) {
      handleOpenModal("changeStatus", {
        item,
        destination: result.destination,
        droppableId,
        filteredItems,
      });
    } else if (
      result.source.droppableId == 3 &&
      result.destination.droppableId == 4
    ) {
      params = {
        candidatePositionId: item.candidatePositionId,
        candidatePositionStatusId: 29,
      };
    }
    if (params) {
      dispatch(
        changeStatusCandidatePosition(
          params,
          (status) => setReFetchData(status)

          // handleDragItems(
          //   status,
          //   params,
          //   result.destination,
          //   item,
          //   droppableId,
          //   filteredItems
          // )
        )
      );
    }
  };
  // const handleDragItems = (
  //   status,
  //   params,
  //   destination,
  //   item,
  //   droppableId,
  //   filteredItems
  // ) => {
  //   // if (status && destination) {
  //   //   columns[+destination.droppableId].data.push({
  //   //     ...item,
  //   //     candidatePositionStatusId: params.candidatePositionStatusId,
  //   //     candidatePositionStatus: candidatePositionStatusData.find(
  //   //       (positionStatus) =>
  //   //         positionStatus.id === params.candidatePositionStatusId
  //   //     ),
  //   //   });
  //   //   columns[droppableId].data = filteredItems;
  //   //   setColumns(columns);
  //   //   setReFetchData(status);
  //   // }
  //   setReFetchData(true);
  // };
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
  const handleOpenModal = (type, data) => {
    setOpenModal(true);
    setInfoModal({
      type,
      data,
    });
    setIsStatusIndex({ ...null });
  };
  const handleFilteredSearch = (id, value, dataList) => {
    const itemIndex = columns.findIndex((item) => item.id == id);
    const item = columns[itemIndex];
    const updateItem = {
      ...item,
      data: dataList.filter((item) => item.name.toLowerCase().includes(value)),
    };
    const newColumns = [...columns];
    newColumns[itemIndex] = updateItem;
    setColumns(newColumns);
  };
  const handleCompanyPositionSelect = (selected) => {
    setCompanyPositionId(selected.value);
    if (selected.value) {
      dispatch(getCandidates({ companyPositionId: selected.value }));
      setIsActiveCards(true);
    }
  };
  const handleChangeStatus = (item) => {
    let params = {
      candidatePositionId: item.candidatePositionId,
      candidatePositionStatusId: item.candidatePositionStatus.parentId,
    };
    dispatch(
      changeStatusCandidatePosition(params, (status) => setReFetchData(status))
    );
  };
  const handleSearchCandidate = (event) => {
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
        companyPositionId: null,
      };
      dispatch(
        getCandidateSuggestions(params, (data) =>
          handleOpenModal("searchCandidate", data)
        )
      );
      setSearched(true);
    }
  };
  const reFetchCandidates = (id) => {
    dispatch(
      getCandidates({
        pageNumber: 0,
        pageSize: 0,
        filters: [],
        orderBy: "",
        includeProperties: "",
        companyPositionId: id,
      })
    );
    setOpenModal(false);
    setReFetchData(false);
  };
  const downloadURI = (uri, name) => {
    let link = document.createElement("a");
    link.setAttribute("download", name);
    link.href = `https://${uri}`;
    document.body.appendChild(link);
    link.target = "_blank";
    link.click();
    link.remove();
  };

  // ----------- lifeCycles ----------
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
  }, []);
  useEffect(() => {
    dispatch(getCountries({}));
    isActiveCards && dispatch(getAllCandidatePositionStatus({}));
    isActiveCards &&
      dispatch(
        getCandidates({
          pageNumber: 0,
          pageSize: 0,
          filters: [],
          orderBy: "",
          includeProperties: "",
          companyPositionId: companyPositionId,
        })
      );
  }, [isActiveCards]);
  useEffect(() => {
    if (reFetchData) {
      reFetchCandidates(companyPositionId);
    }
  }, [reFetchData]);
  useEffect(() => {
    if (candidateData && candidateData.length) {
      const findPreCandidate = columns.find((item) => item.id === "1");
      const findCandidate = columns.find((item) => item.id === "2");
      const findRejected = columns.find((item) => item.id === "3");
      const findEmployee = columns.find((item) => item.id === "4");
      const findQuitted = columns.find((item) => item.id === "5");
      const filterPrecandidate = candidateData.filter(
        (item) => item.candidateGroup === 1
      );
      const filterCandidate = candidateData.filter(
        (item) => item.candidateGroup === 2
      );
      const filteredRejected = candidateData.filter(
        (item) => item.candidateGroup === 3
      );
      const filteredEmployee = candidateData.filter(
        (item) => item.candidateGroup === 4
      );
      const filteredQuitted = candidateData.filter(
        (item) => item.candidateGroup === 5
      );
      findPreCandidate.data = filterPrecandidate;
      findCandidate.data = filterCandidate;
      findRejected.data = filteredRejected;
      findEmployee.data = filteredEmployee;
      findQuitted.data = filteredQuitted;
      setColumns([...columns]);
    } else if (candidateData && !candidateData.length) {
      const findPreCandidate = columns.find((item) => item.id === "1");
      const findCandidate = columns.find((item) => item.id === "2");
      const findRejected = columns.find((item) => item.id === "3");
      const findEmployee = columns.find((item) => item.id === "4");
      const findQuitted = columns.find((item) => item.id === "5");
      const filterPrecandidate = candidateData.filter(
        (item) => item.candidateGroup === 1
      );
      const filterCandidate = candidateData.filter(
        (item) => item.candidateGroup === 2
      );
      const filteredRejected = candidateData.filter(
        (item) => item.candidateGroup === 3
      );
      const filteredEmployee = candidateData.filter(
        (item) => item.candidateGroup === 4
      );
      const filteredQuitted = candidateData.filter(
        (item) => item.candidateGroup === 5
      );
      findPreCandidate.data = filterPrecandidate;
      findCandidate.data = filterCandidate;
      findRejected.data = filteredRejected;
      findEmployee.data = filteredEmployee;
      findQuitted.data = filteredQuitted;
      setColumns([...columns]);
    }
  }, [candidateData, candidateLoading]);
  useEffect(() => {
    if (searched) {
      dispatch(
        getCompanyProjects({
          pageNumber: 0,
          pageSize: 0,
          filters: [
            {
              property: "TenantId",
              operation: 5,
              values: [getDataFromJwtToken("TenantId")],
            },
          ],
        })
      );

      dispatch(
        getCompanyPositions({
          pageNumber: 0,
          pageSize: 0,
          filters: [
            {
              property: "TenantId",
              operation: 5,
              values: [getDataFromJwtToken("TenantId")],
            },
          ],
        })
      );
    }
  }, [searched]);
  useEffect(() => {
    if (companyData) {
      const options = convertArrayToSelectOptions(companyData, ["id", "title"]);
      setSelectOptions((prevState) => ({
        ...prevState,
        company: options,
      }));
    } else if (searchFilterData.companyId) {
      const options = convertArrayToSelectOptions(companyData, ["id", "title"]);
      setSelectOptions((prevState) => ({
        ...prevState,
        company: options,
      }));
    }
  }, [companyData, searchFilterData.companyId]);
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
    } else if (searchFilterData.companyProjectId) {
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
  }, [companyProjectData, searchFilterData.companyProjectId]);
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
    } else if (searchFilterData.companyPositionId) {
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
    if (!companyPositionData?.length) {
      const emptyColumns = columns.map((col) => ({ ...col, data: [] }));
      setColumns(emptyColumns);
    }
  }, [companyPositionData, searchFilterData.companyPositionId]);
  useEffect(() => {
    searchFilterData.companyPositionId && setIsActiveCards(true);
  }, [searchFilterData]);

  // ----------- render JSX -------------
  return (
    <>
      <Modal
        modalName={infoModal.type}
        state={openModal}
        onCloseModal={() => setOpenModal(false)}
      >
        {infoModal.type === "feature" && (
          <CandidateFeature
            state={infoModal.data}
            onCloseModal={() => setOpenModal(false)}
          />
        )}
        {infoModal.type === "expertise" && (
          <CandidateExpertise
            state={infoModal.data}
            onCloseModal={() => setOpenModal(false)}
          />
        )}
        {infoModal.type === "createCandidate" && (
          <CreateCandidate
            onCloseModal={() => setOpenModal(false)}
            companyPositionId={companyPositionId}
            countries={
              countryData && countryData.map((country) => country.countryCode)
            }
          />
        )}
        {infoModal.type === "changeStatus" && (
          <ChangeStatus
            onCloseModal={() => setOpenModal(false)}
            reFetchData={() => setReFetchData((prevState) => !prevState)}
            statusData={infoModal.data}
            candidatePositionStatus={candidatePositionStatusData}
            // handleDrag={handleDragItems}
          />
        )}
        {infoModal.type === "searchCandidate" && (
          <SearchModal
            infoCandidate={infoModal.data}
            onCloseModal={() => setOpenModal(false)}
            onClick={(companyId, projectId, positionId) => {
              reFetchCandidates(positionId);
              setSearchFilterData({
                companyId: companyId,
                companyProjectId: projectId,
                companyPositionId: positionId,
              });
            }}
          />
        )}
        {infoModal.type === "editPerson" && (
          <EditModal
            data={infoModal.data}
            onCloseModal={() => setOpenModal(false)}
          />
        )}
        {infoModal.type === "positionOffer" && (
          <PositionOffer
            candidatePositionId={infoModal.data.candidatePositionId}
            onCloseModal={() => setOpenModal(false)}
          />
        )}
        {infoModal.type === "positionMeeting" && (
          <PositionMeeting
            candidatePositionId={infoModal.data.candidatePositionId}
            onCloseModal={() => setOpenModal(false)}
          />
        )}
        {infoModal.type === "uploadCv" && (
          <UploadCV
            candidatePositionId={infoModal.data.candidatePositionId}
            onCloseModal={() => setOpenModal(false)}
            reFetchData={() => reFetchCandidates(companyPositionId)}
          />
        )}
      </Modal>
      <div className="h-full flex flex-col">
        <div
          className={
            "flex font-semibold border-b-2 pb-2 mb-4 gap-x-4 select-none z-20"
          }
        >
          <MyForm initialValues={searchFilterData}>
            <div className="flex items-center gap-x-4">
              <Field
                component={SelectBox}
                placeholder={t("input.company.placeholder")}
                options={selectOptions.company}
                name="company"
                onChangeHandler={(data) =>
                  handleChangeSelect("company", "CompanyId", data.value)
                }
                loading={companyLoading}
                searchValue={searchFilterData.companyId}
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
                searchValue={searchFilterData.companyProjectId}
              />
              <Field
                component={SelectBox}
                placeholder={t("input.company_position.placeholder")}
                options={selectOptions.companyPosition}
                name="companyPosition"
                loading={companyPositionLoading}
                onChangeHandler={handleCompanyPositionSelect}
                searchValue={searchFilterData.companyPositionId}
              />
              <Field
                component={SearchBox}
                placeholder={t("input.search.placeholder")}
                name="search"
                onChange={handleSearchCandidate}
              />
            </div>
          </MyForm>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="relative flex flex-col flex-grow overflow-y-hidden">
            {!isActiveCards && (
              <div className="absolute top-0 left-0 w-full h-full bg-custom-gray-light bg-opacity-70 backdrop-blur-[3px] z-10 rounded-md flex justify-center items-center">
                <p className="text-18">{t("text.select_company_position")}</p>
              </div>
            )}
            {candidateLoading && (
              <div className="absolute top-0 left-0 w-full h-full bg-custom-gray-light bg-opacity-70 backdrop-blur-[3px] z-10 rounded-md flex justify-center items-center">
                <ClipLoader color="#FE6601" className="w-full mx-auto" />
              </div>
            )}

            <div
              className={`flex justify-between flex-grow items-start gap-x-2 gap-y-3 select-none mt-8 pb-4 ${
                isActiveCards ? "overflow-x-auto" : "overflow-x-hidden"
              }`}
            >
              {/* Render cards */}
              {columns.map((column, index) => (
                <div
                  className={`bg-white flex flex-col rounded-11 max-h-full relative p-3 duration-500 dark:bg-dark_custom-light-black ${
                    columnId === column.id
                      ? "grow"
                      : columnId === undefined
                      ? "flex-none w-80"
                      : "w-2 overflow-hidden h-52"
                  }
                  ${
                    statusIndex.candidate ||
                    statusIndex.preCandidate ||
                    statusIndex.rejected ||
                    statusIndex.employee
                      ? "overflow-visible"
                      : "overflow-hidden"
                  }`}
                  key={index}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-16 font-semibold dark:text-dark_custom-full-white">
                      {column.title}
                    </p>
                    {isActiveCards && (
                      <CgExpand
                        className="cursor-pointer rotate-90 dark:text-dark_custom-full-white"
                        onClick={() =>
                          setColumnId((prev) =>
                            prev === undefined ? column.id : undefined
                          )
                        }
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-x-1 my-4 border-b border-gray-100 pb-4">
                    <SearchBox
                      placeholder={t("input.search.placeholder")}
                      classes={"w-full"}
                      onChange={(event) =>
                        handleFilteredSearch(
                          column.id,
                          event.target.value,
                          columns[0].data
                        )
                      }
                      disabled={!isActiveCards}
                    />
                    {column.id === "1" && (
                      <Button
                        classes={`!px-3 ${!isActiveCards && "!cursor-default"}`}
                        onClick={() =>
                          isActiveCards &&
                          handleOpenModal("createCandidate", column)
                        }
                      >
                        <MdOutlinePersonAddAlt1 size={18} />
                      </Button>
                    )}
                  </div>
                  <Droppable droppableId={index.toString()}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`flex flex-col gap-y-2 rounded-lg border-gray-200 h-full  ${
                          columnId !== column.id && column.data.length > 0
                            ? ""
                            : "border-none"
                        }`}
                      >
                        {columnId === column.id ? (
                          <Table data={column.data} cols={column.cols} />
                        ) : column.id === "1" ? (
                          column.data.length > 0 ? (
                            <>
                              {column.data.map((item, index) => (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id.toString()}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <div className="text-gray-700 p-3 rounded-md bg-zinc-200 relative hover:bg-gray-100 flex flex-col text-14 dark:bg-dark_custom-average-black">
                                        <div className="flex justify-between items-start">
                                          <div className="flex gap-1">
                                            <p className="dark:text-dark_custom-full-white">
                                              {item.name}
                                            </p>
                                            <p className="dark:text-dark_custom-full-white">
                                              {item.family}
                                            </p>
                                          </div>
                                          <span
                                            className="flex items-center gap-x-4 text-[#7E8299] p-1 rounded-md cursor-pointer text-14 dark:text-dark_custom-full-white"
                                            onClick={() =>
                                              statusClickHandler(
                                                "candidate",
                                                index + 1
                                              )
                                            }
                                          >
                                            <FiMoreHorizontal size={20} />
                                          </span>
                                        </div>
                                        <p
                                          className="text-xs text-custom-yellow-dark bg-custom-yellow-light rounded-md font-semibold w-fit px-2 py-1 cursor-pointer"
                                          onClick={() =>
                                            handleOpenModal(
                                              "changeStatus",
                                              item
                                            )
                                          }
                                        >
                                          {item.candidatePositionStatus?.title}
                                        </p>

                                        {/* Popup menu start */}
                                        <div
                                          className={`flex flex-col gap-y-2 duration-200 ease-in-out cursor-pointer bg-white shadow-md text-sm border absolute right-3 top-8 rounded-md z-50 ${
                                            statusIndex.candidate === index + 1
                                              ? "visible opacity-100 translate-y-0 overflow-auto h-auto py-3 px-4"
                                              : "translate-y-6 opacity-0 invisible overflow-hidden h-0 py-0 px-0"
                                          }`}
                                          ref={ref}
                                        >
                                          <span
                                            className="flex gap-x-0.5"
                                            onClick={() =>
                                              handleOpenModal("editPerson", {
                                                ...item,
                                              })
                                            }
                                          >
                                            <svg
                                              width="16"
                                              height="16"
                                              viewBox="0 0 16 16"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                              opacity={0.8}
                                            >
                                              <path
                                                opacity="0.3"
                                                d="M14.2667 5.56754L12.8334 7.00754L8.99337 3.16754L10.4334 1.73421C10.5577 1.60516 10.7069 1.50252 10.8718 1.43241C11.0368 1.36231 11.2141 1.32617 11.3934 1.32617C11.5726 1.32617 11.75 1.36231 11.9149 1.43241C12.0799 1.50252 12.229 1.60516 12.3534 1.73421L14.2667 3.64754C14.3957 3.77192 14.4984 3.92104 14.5685 4.08598C14.6386 4.25093 14.6747 4.42831 14.6747 4.60754C14.6747 4.78677 14.6386 4.96415 14.5685 5.1291C14.4984 5.29404 14.3957 5.44316 14.2667 5.56754ZM2.46003 14.6209L6.59337 13.2475L2.75337 9.40754L1.38003 13.5409C1.3297 13.6913 1.32229 13.8528 1.35865 14.0072C1.39501 14.1616 1.4737 14.3029 1.58587 14.415C1.69805 14.5272 1.83927 14.6059 1.99368 14.6423C2.1481 14.6786 2.30959 14.6712 2.46003 14.6209Z"
                                                fill="orange"
                                              />
                                              <path
                                                d="M3.71337 14.2013L2.46003 14.6213C2.30959 14.6716 2.1481 14.679 1.99368 14.6427C1.83927 14.6063 1.69805 14.5276 1.58587 14.4155C1.4737 14.3033 1.39501 14.1621 1.35865 14.0077C1.32229 13.8532 1.3297 13.6917 1.38003 13.5413L1.80003 12.288L3.71337 14.2013ZM2.75337 9.40797L6.59337 13.248L12.8334 7.00797L8.99337 3.16797L2.75337 9.40797Z"
                                                fill="orange"
                                              />
                                            </svg>
                                            {t("popup.edit")}
                                          </span>
                                          <span
                                            className="flex gap-x-0.5"
                                            onClick={() =>
                                              handleOpenModal("uploadCv", {
                                                ...item,
                                              })
                                            }
                                          >
                                            <LuUpload
                                              size={17}
                                              color="orange"
                                              className="outline-none opacity-80"
                                            />
                                            {t("popup.upload_CV")}
                                          </span>
                                          <a
                                            download
                                            className={`flex gap-x-0.5 outline-none ${
                                              !item.candidatePosition
                                                .personCvId && "opacity-60"
                                            }`}
                                            onClick={(event) => {
                                              item.candidatePosition.personCvId
                                                ? dispatch(
                                                    getByIdPersonCV(
                                                      item.candidatePosition
                                                        .personCvId,
                                                      (state) =>
                                                        (function getReady(s) {
                                                          if (s) {
                                                            downloadURI(
                                                              s.cvContent,
                                                              s.fileName
                                                            );
                                                          }
                                                        })(state)
                                                    )
                                                  )
                                                : warningNotification(
                                                    t("toast.no_CV")
                                                  );
                                            }}
                                          >
                                            <LuDownload
                                              size={18}
                                              color="orange"
                                              className="-mt-0.5 outline-none"
                                            />
                                            {t("popup.download_CV")}
                                          </a>
                                        </div>
                                        {/* Popup menu end */}
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </>
                          ) : (
                            <div className="border border-transparent"></div>
                          )
                        ) : column.id === "2" ? (
                          column.data.length > 0 ? (
                            <>
                              {column.data.map((item, index) => (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id.toString()}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <div className="text-gray-700 p-3 rounded-md bg-zinc-200 hover:bg-gray-100 text-14 relative dark:bg-dark_custom-average-black">
                                        <div className="flex justify-between items-start">
                                          <div className="flex gap-1">
                                            <p className="dark:text-dark_custom-full-white">
                                              {item.name}
                                            </p>
                                            <p className="dark:text-dark_custom-full-white">
                                              {item.family}
                                            </p>
                                          </div>
                                          <span
                                            className="flex items-center gap-x-4 text-[#7E8299] p-1 rounded-md cursor-pointer text-14 dark:text-dark_custom-full-white"
                                            onClick={() =>
                                              statusClickHandler(
                                                "preCandidate",
                                                index + 1
                                              )
                                            }
                                          >
                                            <FiMoreHorizontal size={20} />
                                          </span>
                                        </div>
                                        <p
                                          className="text-xs text-custom-purple-dark bg-custom-purple-light rounded-md font-semibold w-fit px-2 py-1 cursor-pointer"
                                          onClick={() =>
                                            handleOpenModal(
                                              "changeStatus",
                                              item
                                            )
                                          }
                                        >
                                          {item.candidatePositionStatus?.title}
                                        </p>

                                        {/* Popup menu start */}
                                        <div
                                          className={`flex flex-col gap-y-2 duration-200 cursor-pointer ease-in-out bg-white shadow-md text-sm border absolute right-3 top-8 z-50 rounded-md ${
                                            statusIndex.preCandidate ===
                                            index + 1
                                              ? "visible opacity-100 translate-y-0 overflow-auto h-auto py-3 px-4"
                                              : "translate-y-6 opacity-0 invisible overflow-hidden h-0 py-0 px-0"
                                          }`}
                                        >
                                          <span
                                            className="flex gap-x-0.5"
                                            onClick={() =>
                                              handleOpenModal("editPerson", {
                                                ...item,
                                              })
                                            }
                                          >
                                            <svg
                                              width="16"
                                              height="16"
                                              viewBox="0 0 16 16"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                              opacity={0.8}
                                            >
                                              <path
                                                opacity="0.3"
                                                d="M14.2667 5.56754L12.8334 7.00754L8.99337 3.16754L10.4334 1.73421C10.5577 1.60516 10.7069 1.50252 10.8718 1.43241C11.0368 1.36231 11.2141 1.32617 11.3934 1.32617C11.5726 1.32617 11.75 1.36231 11.9149 1.43241C12.0799 1.50252 12.229 1.60516 12.3534 1.73421L14.2667 3.64754C14.3957 3.77192 14.4984 3.92104 14.5685 4.08598C14.6386 4.25093 14.6747 4.42831 14.6747 4.60754C14.6747 4.78677 14.6386 4.96415 14.5685 5.1291C14.4984 5.29404 14.3957 5.44316 14.2667 5.56754ZM2.46003 14.6209L6.59337 13.2475L2.75337 9.40754L1.38003 13.5409C1.3297 13.6913 1.32229 13.8528 1.35865 14.0072C1.39501 14.1616 1.4737 14.3029 1.58587 14.415C1.69805 14.5272 1.83927 14.6059 1.99368 14.6423C2.1481 14.6786 2.30959 14.6712 2.46003 14.6209Z"
                                                fill="orange"
                                              />
                                              <path
                                                d="M3.71337 14.2013L2.46003 14.6213C2.30959 14.6716 2.1481 14.679 1.99368 14.6427C1.83927 14.6063 1.69805 14.5276 1.58587 14.4155C1.4737 14.3033 1.39501 14.1621 1.35865 14.0077C1.32229 13.8532 1.3297 13.6917 1.38003 13.5413L1.80003 12.288L3.71337 14.2013ZM2.75337 9.40797L6.59337 13.248L12.8334 7.00797L8.99337 3.16797L2.75337 9.40797Z"
                                                fill="orange"
                                              />
                                            </svg>
                                            {t("popup.edit")}
                                          </span>
                                          <span
                                            className="flex gap-x-0.5"
                                            onClick={() =>
                                              handleOpenModal(
                                                "positionOffer",
                                                item
                                              )
                                            }
                                          >
                                            <FaRegHandshake
                                              size={18}
                                              color="orange"
                                              className="mt-0.5 outline-none opacity-80"
                                            />
                                            {t("popup.offer")}
                                          </span>
                                          <span
                                            className="flex gap-x-0.5"
                                            onClick={() =>
                                              handleOpenModal(
                                                "positionMeeting",
                                                item
                                              )
                                            }
                                          >
                                            <IoMdPeople
                                              size={22}
                                              color="orange"
                                              className="-mt-0.5 outline-none opacity-80"
                                            />
                                            {t("popup.meeting")}
                                          </span>
                                          <span
                                            className="flex gap-x-0.5"
                                            onClick={() =>
                                              handleOpenModal("uploadCv", {
                                                ...item,
                                              })
                                            }
                                          >
                                            <LuUpload
                                              size={17}
                                              color="orange"
                                              className="outline-none opacity-80"
                                            />
                                            {t("popup.upload_CV")}
                                          </span>
                                          <a
                                            download
                                            className={`flex gap-x-0.5 outline-none ${
                                              !item.candidatePosition
                                                .personCvId && "opacity-60"
                                            }`}
                                            onClick={(event) => {
                                              item.candidatePosition.personCvId
                                                ? dispatch(
                                                    getByIdPersonCV(
                                                      item.candidatePosition
                                                        .personCvId,
                                                      (state) =>
                                                        (function getReady(s) {
                                                          if (s) {
                                                            downloadURI(
                                                              s.cvContent,
                                                              s.fileName
                                                            );
                                                          }
                                                        })(state)
                                                    )
                                                  )
                                                : warningNotification(
                                                    t("toast.no_CV")
                                                  );
                                            }}
                                          >
                                            <LuDownload
                                              size={18}
                                              color="orange"
                                              className="-mt-0.5 outline-none opacity-80"
                                            />
                                            {t("popup.download_CV")}
                                          </a>
                                          <span
                                            className={`flex gap-x-0.5 outline-none ${
                                              !item.candidatePosition
                                                .personCvId && "opacity-60"
                                            }`}
                                            onClick={() => {
                                              item.candidatePosition.personCvId
                                                ? handleOpenModal("feature", {
                                                    ...item,
                                                  })
                                                : warningNotification(
                                                    t("toast.CV_upload_first")
                                                  );
                                            }}
                                          >
                                            <LuListChecks
                                              size={20}
                                              color="orange"
                                              className="outline-none opacity-80"
                                            />
                                            {t("popup.feature")}
                                          </span>
                                          <span
                                            className={`flex gap-x-0.5 outline-none ${
                                              !item.candidatePosition
                                                .personCvId && "opacity-60"
                                            }`}
                                            onClick={() => {
                                              item.candidatePosition.personCvId
                                                ? handleOpenModal("expertise", {
                                                    ...item,
                                                  })
                                                : warningNotification(
                                                    t("toast.CV_upload_first")
                                                  );
                                            }}
                                          >
                                            <RiStarHalfSFill
                                              size={20}
                                              color="orange"
                                              className="outline-none opacity-80"
                                            />
                                            {t("popup.expertise")}
                                          </span>
                                        </div>
                                        {/* Popup menu end */}
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </>
                          ) : (
                            <div className="border border-transparent"></div>
                          )
                        ) : column.id === "3" ? (
                          column.data.length > 0 ? (
                            <>
                              {column.data.map((item, index) => (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id.toString()}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <div className="text-gray-700 p-3 rounded-md bg-zinc-200 hover:bg-gray-100 relative text-14 dark:bg-dark_custom-average-black">
                                        <div className="flex">
                                          <div className="w-full flex flex-col">
                                            <div className="flex justify-between">
                                              <div>
                                                <span className="dark:text-dark_custom-full-white">
                                                  {item.name}
                                                </span>{" "}
                                                <span className="dark:text-dark_custom-full-white">
                                                  {item.family}
                                                </span>
                                              </div>
                                              <span
                                                className="text-[#7E8299] p-1 rounded-md cursor-pointer text-14 dark:text-dark_custom-full-white"
                                                onClick={() =>
                                                  statusClickHandler(
                                                    "rejected",
                                                    index + 1
                                                  )
                                                }
                                              >
                                                <FiMoreHorizontal size={20} />
                                              </span>
                                            </div>

                                            <div className="flex items-center gap-x-2">
                                              <p
                                                className="text-xs text-custom-red-dark bg-custom-red-light rounded-md font-semibold w-fit px-2 py-1 cursor-pointer"
                                                onClick={() =>
                                                  handleOpenModal(
                                                    "changeStatus",
                                                    item
                                                  )
                                                }
                                              >
                                                {
                                                  item.candidatePositionStatus
                                                    ?.title
                                                }
                                              </p>
                                              <div
                                                className="bg-custom-gray-medium rounded-md px-2 py-1 cursor-pointer"
                                                onClick={() => {
                                                  handleChangeStatus(item);
                                                }}
                                              >
                                                <TbArrowBackUp color="#99a1b7" />
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Popup menu start */}
                                        <div
                                          className={`flex flex-col gap-y-2 duration-200 cursor-pointer ease-in-out bg-white shadow-md text-sm border absolute right-3 top-8 z-50 rounded-md ${
                                            statusIndex.rejected === index + 1
                                              ? "visible opacity-100 translate-y-0 overflow-auto h-auto py-3 px-4"
                                              : "translate-y-6 opacity-0 invisible overflow-hidden h-0 py-0 px-0"
                                          }`}
                                        >
                                          <span
                                            className="flex gap-x-0.5"
                                            onClick={() =>
                                              handleOpenModal("editPerson", {
                                                ...item,
                                              })
                                            }
                                          >
                                            <svg
                                              width="17"
                                              height="17"
                                              viewBox="0 0 16 16"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                              opacity={0.8}
                                            >
                                              <path
                                                opacity="0.3"
                                                d="M14.2667 5.56754L12.8334 7.00754L8.99337 3.16754L10.4334 1.73421C10.5577 1.60516 10.7069 1.50252 10.8718 1.43241C11.0368 1.36231 11.2141 1.32617 11.3934 1.32617C11.5726 1.32617 11.75 1.36231 11.9149 1.43241C12.0799 1.50252 12.229 1.60516 12.3534 1.73421L14.2667 3.64754C14.3957 3.77192 14.4984 3.92104 14.5685 4.08598C14.6386 4.25093 14.6747 4.42831 14.6747 4.60754C14.6747 4.78677 14.6386 4.96415 14.5685 5.1291C14.4984 5.29404 14.3957 5.44316 14.2667 5.56754ZM2.46003 14.6209L6.59337 13.2475L2.75337 9.40754L1.38003 13.5409C1.3297 13.6913 1.32229 13.8528 1.35865 14.0072C1.39501 14.1616 1.4737 14.3029 1.58587 14.415C1.69805 14.5272 1.83927 14.6059 1.99368 14.6423C2.1481 14.6786 2.30959 14.6712 2.46003 14.6209Z"
                                                fill="orange"
                                              />
                                              <path
                                                d="M3.71337 14.2013L2.46003 14.6213C2.30959 14.6716 2.1481 14.679 1.99368 14.6427C1.83927 14.6063 1.69805 14.5276 1.58587 14.4155C1.4737 14.3033 1.39501 14.1621 1.35865 14.0077C1.32229 13.8532 1.3297 13.6917 1.38003 13.5413L1.80003 12.288L3.71337 14.2013ZM2.75337 9.40797L6.59337 13.248L12.8334 7.00797L8.99337 3.16797L2.75337 9.40797Z"
                                                fill="orange"
                                              />
                                            </svg>
                                            {t("popup.edit")}
                                          </span>
                                          <span
                                            className="flex gap-x-0.5"
                                            onClick={() =>
                                              handleOpenModal(
                                                "positionOffer",
                                                item
                                              )
                                            }
                                          >
                                            <FaRegHandshake
                                              size={19}
                                              color="orange"
                                              className="outline-none opacity-80"
                                            />
                                            {t("popup.offer")}
                                          </span>
                                          <span
                                            className="flex gap-x-0.5"
                                            onClick={() =>
                                              handleOpenModal(
                                                "positionMeeting",
                                                item
                                              )
                                            }
                                          >
                                            <IoMdPeople
                                              size={22}
                                              color="orange"
                                              className="-mt-0.5 outline-none opacity-80"
                                            />
                                            {t("popup.meeting")}
                                          </span>
                                          <a
                                            download
                                            className={`flex gap-x-0.5 outline-none ${
                                              !item.candidatePosition
                                                .personCvId && "opacity-60"
                                            }`}
                                            onClick={(event) => {
                                              item.candidatePosition.personCvId
                                                ? dispatch(
                                                    getByIdPersonCV(
                                                      item.candidatePosition
                                                        .personCvId,
                                                      (state) =>
                                                        (function getReady(s) {
                                                          if (s) {
                                                            downloadURI(
                                                              s.cvContent,
                                                              s.fileName
                                                            );
                                                          }
                                                        })(state)
                                                    )
                                                  )
                                                : warningNotification(
                                                    t("toast.no_CV")
                                                  );
                                            }}
                                          >
                                            <LuDownload
                                              size={19}
                                              color="orange"
                                              className="-mt-0.5 outline-none opacity-80"
                                            />
                                            {t("popup.download_CV")}
                                          </a>
                                        </div>
                                        {/* Popup menu end */}
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </>
                          ) : (
                            <div className="border border-transparent"></div>
                          )
                        ) : column.id === "4" ? (
                          column.data.length > 0 ? (
                            <>
                              {column.data.map((item, index) => (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id.toString()}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <div className="text-gray-700 p-3 rounded-md relative bg-zinc-200 hover:bg-gray-100 text-14 dark:bg-dark_custom-average-black">
                                        <div className="flex justify-between items-start">
                                          <div className="flex flex-col gap-y-1">
                                            <div className="flex gap-1">
                                              <p className="dark:text-dark_custom-full-white">
                                                {item.name}
                                              </p>
                                              <p className="dark:text-dark_custom-full-white">
                                                {item.family}
                                              </p>
                                            </div>
                                            <p
                                              className="text-xs text-custom-green-dark bg-custom-green-light rounded-md font-semibold w-fit px-2 py-1 cursor-pointer"
                                              onClick={() =>
                                                handleOpenModal(
                                                  "changeStatus",
                                                  item
                                                )
                                              }
                                            >
                                              {
                                                item.candidatePositionStatus
                                                  ?.title
                                              }
                                            </p>
                                          </div>
                                          <span
                                            className="flex items-center gap-x-4 text-[#7E8299] p-1 rounded-md cursor-pointer text-14 dark:text-dark_custom-full-white"
                                            onClick={() =>
                                              statusClickHandler(
                                                "employee",
                                                index + 1
                                              )
                                            }
                                          >
                                            <FiMoreHorizontal size={20} />
                                          </span>
                                        </div>
                                        {/* Popup menu start */}
                                        <div
                                          className={`flex flex-col gap-y-2 duration-200 cursor-pointer ease-in-out bg-white shadow-md text-sm border absolute right-3 top-8 z-50 rounded-md ${
                                            statusIndex.employee === index + 1
                                              ? "visible opacity-100 translate-y-0 overflow-auto h-auto py-3 px-4"
                                              : "translate-y-6 opacity-0 invisible overflow-hidden h-0 py-0 px-0"
                                          }`}
                                        >
                                          <span
                                            className={`flex gap-x-0.5 outline-none ${
                                              !item.candidatePosition
                                                .personCvId && "opacity-60"
                                            }`}
                                            onClick={() => {
                                              item.candidatePosition.personCvId
                                                ? handleOpenModal("feature", {
                                                    ...item,
                                                  })
                                                : warningNotification(
                                                    t("toast.CV_upload_first")
                                                  );
                                            }}
                                          >
                                            <LuListChecks
                                              size={20}
                                              color="orange"
                                              className="outline-none opacity-80"
                                            />
                                            {t("popup.feature")}
                                          </span>
                                          <span
                                            className={`flex gap-x-0.5 outline-none ${
                                              !item.candidatePosition
                                                .personCvId && "opacity-60"
                                            }`}
                                            onClick={() => {
                                              item.candidatePosition.personCvId
                                                ? handleOpenModal("expertise", {
                                                    ...item,
                                                  })
                                                : warningNotification(
                                                    t("toast.CV_upload_first")
                                                  );
                                            }}
                                          >
                                            <RiStarHalfSFill
                                              size={20}
                                              color="orange"
                                              className="outline-none opacity-80"
                                            />
                                            {t("popup.expertise")}
                                          </span>
                                        </div>
                                        {/* Popup menu end */}
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </>
                          ) : (
                            <div className="border border-transparent"></div>
                          )
                        ) : column.id === "5" ? (
                          column.data.length > 0 ? (
                            <>
                              {column.data.map((item, index) => (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id.toString()}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <div className="text-gray-700 p-3 rounded-md bg-zinc-200 hover:bg-gray-100 text-14 dark:bg-dark_custom-average-black">
                                        <div className="flex flex-col gap-y-1">
                                          <div className="flex gap-1">
                                            <p className="dark:text-dark_custom-full-white">
                                              {item.name}
                                            </p>
                                            <p className="dark:text-dark_custom-full-white">
                                              {item.family}
                                            </p>
                                          </div>
                                          <p
                                            className="text-xs text-black bg-gray-300 rounded-md font-semibold w-fit px-2 py-1 cursor-pointer"
                                            onClick={() =>
                                              handleOpenModal(
                                                "changeStatus",
                                                item
                                              )
                                            }
                                          >
                                            {
                                              item.candidatePositionStatus
                                                ?.title
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </>
                          ) : (
                            <div className="border border-transparent"></div>
                          )
                        ) : null}
                      </div>
                    )}
                  </Droppable>
                  <div
                    className={`bg-white w-full h-full absolute top-0 left-0 ${
                      columnId === undefined || columnId === column.id
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <div
                      className="w-max text-16 font-semibold absolute rotate-90 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer text-red-500"
                      onClick={() => setColumnId(column.id)}
                    >
                      {column.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DragDropContext>
      </div>
    </>
  );
};
