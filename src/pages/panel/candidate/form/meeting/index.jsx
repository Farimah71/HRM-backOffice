import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Field } from "formik";
import {
  Button,
  MyForm,
  Error,
  Input,
  Table,
  CustomDatePicker,
  SelectBox,
  Checkbox,
} from "../../../../../components";
import {
  createCandidatePositionMeeting,
  editCandidatePositionMeeting,
  getByIdCandidatePositionMeeting,
  getCandidatePositionMeeting,
} from "../../../../../redux/actions/candidate-position-meeting/index";
import { ClipLoader } from "react-spinners";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { api } from "../../../../../api";
import { getDataFromJwtToken } from "../../../../../helpers/get-data-from-jwt";
import { convertDateToString } from "../../../../../helpers/convert-date-to-string";
import {
  errorNotification,
  successNotification,
} from "../../../../../helpers/notification";
import axios from "axios";
import * as Yup from "yup";

export const PositionMeeting = ({
  onCloseModal,
  candidatePositionId,
  personId,
}) => {
  // ---------- store ----------
  const {
    info: candidateMeetingData,
    loading,
    editInfo,
  } = useSelector((state) => state.candidatePositionMeetingSlice);
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);

  // ---------- states ----------
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isShowForm, setIsShowForm] = useState({ create: false, edit: false });
  const [formValue, setFormValue] = useState({
    tenantId: +getDataFromJwtToken("TenantId"),
    personId: personId,
    candidatePositionId: candidatePositionId,
    title: "",
    meetingDate: "",
    allDay: true,
    startTime: "",
    endTime: "",
    color: 0,
    meetingResult: "",
    meetingSpeakingPerson: "",
    url: "",
  });

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
      name: t("table.col.title"),
      selector: (row) => <p className="dark:text-dark">{row.title}</p>,
    },
    {
      name: t("table.col.speaking_person"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">
          {row.meetingSpeakingPerson}
        </p>
      ),
    },
    {
      name: t("table.col.start_time"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.startTime}</p>
      ),
    },
    {
      name: t("table.col.end_time"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.endTime}</p>
      ),
    },
    {
      name: t("table.col.result"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.meetingResult}</p>
      ),
    },
    {
      name: t("table.col.action"),
      cell: (row) => (
        <div className="group relative flex items-center justify-center gap-x-2">
          <span
            className="p-2 rounded-md bg-custom-gray-light cursor-pointer"
            onClick={() => {
              setIsShowForm({ create: false, edit: true });
              dispatch(getByIdCandidatePositionMeeting(row.id));
            }}
          >
            <svg
              width="17"
              height="17"
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
          <div
            className="p-2 rounded-md bg-custom-gray-light cursor-pointer"
            onClick={() => deleteHandler(row.id)}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.3">
                <path
                  d="M10.5797 14.6075L5.54634 14.6675C5.11031 14.6737 4.68845 14.5127 4.36736 14.2176C4.04626 13.9226 3.85029 13.5158 3.81968 13.0808L3.33301 6.12081C3.32556 6.01899 3.33946 5.91673 3.37381 5.82058C3.40816 5.72444 3.46221 5.63652 3.5325 5.56247C3.60278 5.48842 3.68776 5.42986 3.78198 5.39054C3.8762 5.35123 3.9776 5.33202 4.07967 5.33414H11.9197C12.0211 5.33209 12.1219 5.35113 12.2157 5.39004C12.3094 5.42896 12.3941 5.48691 12.4642 5.56022C12.5344 5.63354 12.5886 5.72063 12.6234 5.81598C12.6582 5.91132 12.6728 6.01286 12.6663 6.11414L12.273 12.9941C12.2492 13.4281 12.0608 13.8367 11.7461 14.1365C11.4315 14.4363 11.0143 14.6047 10.5797 14.6075Z"
                  fill="#A1A5B7"
                />
              </g>
              <path
                d="M9.487 9.06641H6.51367C6.38106 9.06641 6.25389 9.01373 6.16012 8.91996C6.06635 8.82619 6.01367 8.69901 6.01367 8.56641C6.01367 8.4338 6.06635 8.30662 6.16012 8.21285C6.25389 8.11908 6.38106 8.06641 6.51367 8.06641H9.487C9.61961 8.06641 9.74679 8.11908 9.84056 8.21285C9.93433 8.30662 9.987 8.4338 9.987 8.56641C9.987 8.69901 9.93433 8.82619 9.84056 8.91996C9.74679 9.01373 9.61961 9.06641 9.487 9.06641Z"
                fill="#A1A5B7"
              />
              <path
                d="M8.96654 11.5332H7.0332C6.90059 11.5332 6.77342 11.4805 6.67965 11.3868C6.58588 11.293 6.5332 11.1658 6.5332 11.0332C6.5332 10.9006 6.58588 10.7734 6.67965 10.6796C6.77342 10.5859 6.90059 10.5332 7.0332 10.5332H8.96654C9.09914 10.5332 9.22632 10.5859 9.32009 10.6796C9.41386 10.7734 9.46654 10.9006 9.46654 11.0332C9.46654 11.1658 9.41386 11.293 9.32009 11.3868C9.22632 11.4805 9.09914 11.5332 8.96654 11.5332Z"
                fill="#A1A5B7"
              />
              <path
                d="M13.4999 4.7738H13.4266C9.82798 4.27899 6.17856 4.27899 2.57994 4.7738C2.45102 4.79078 2.32056 4.75687 2.21624 4.67926C2.11191 4.60166 2.04191 4.48647 2.0211 4.35812C2.00028 4.22976 2.03029 4.09835 2.10475 3.99176C2.17921 3.88516 2.29226 3.81176 2.41994 3.78713C6.11947 3.26627 9.87373 3.26627 13.5733 3.78713C13.6965 3.80737 13.8077 3.87301 13.885 3.97114C13.9623 4.06927 14.0001 4.19277 13.9909 4.31734C13.9817 4.44191 13.9262 4.55852 13.8353 4.64424C13.7445 4.72995 13.6248 4.77855 13.4999 4.78047V4.7738Z"
                fill="#A1A5B7"
              />
              <path
                d="M10.6663 3.89398H5.33301L5.63301 2.34732C5.68647 2.0664 5.83489 1.81241 6.05336 1.62792C6.27184 1.44342 6.54711 1.33965 6.83301 1.33398H9.18634C9.47744 1.33509 9.75908 1.43749 9.98292 1.62361C10.2067 1.80974 10.3588 2.06797 10.413 2.35398L10.6663 3.89398Z"
                fill="#A1A5B7"
              />
            </svg>
          </div>
        </div>
      ),
    },
  ];
  const dataSchema = Yup.object({
    meetingDate: Yup.string().required(t("error.meeting_date_required")),
    startTime: Yup.string().required(t("error.start_time_required")),
    endTime: Yup.string().required(t("error.end_time_required")),
  });
  const colors = [
    { value: 1, label: "Red" },
    { value: 2, label: "Blue" },
    { value: 3, label: "Green" },
    { value: 4, label: "Yellow" },
  ];

  // ---------- functions ----------
  const headers = {
    "Content-Type": "application/json",
    Authorization: localStorage.token,
  };
  const deleteHandler = (id) => {
    axios
      .delete(
        api.CandidatePositionMeetingApi.deleteCandidatePositionMeeting + id,
        {
          headers,
        }
      )
      .then((res) => {
        if (res.data.statusCode === "200") {
          successNotification(t("toast.success_delete"));
          reloadPageHandler(true);
        }
      })
      .catch(() => {
        errorNotification(t("toast.error"));
      });
  };
  const reloadPageHandler = (status) => {
    if (status) {
      setIsShowForm({ ...false });
    }
    dispatch(
      getCandidatePositionMeeting({
        pageNumber: 0,
        pageSize: 0,
        filters: [
          {
            property: "CandidatePositionId",
            operation: 5,
            values: [candidatePositionId.toString()],
          },
        ],
        orderBy: "",
        includeProperties: "",
      })
    );
  };
  const closeHandler = () => {
    onCloseModal();
  };
  const onSubmit = (values) => {
    const clone = { ...values };
    const dataToSend = {
      ...clone,
      meetingDate: clone.meetingDate
        ? convertDateToString(clone.meetingDate)
        : editInfo.meetingDate,
      startTime: clone.startTime
        ? convertDateToString(clone.startTime).split("T")[1].slice(0, 5)
        : editInfo.startTime,
      endTime: clone.endTime
        ? convertDateToString(clone.endTime).split("T")[1].slice(0, 5)
        : editInfo.endTime,
    };
    isShowForm.create &&
      dispatch(
        createCandidatePositionMeeting(dataToSend, (status) =>
          reloadPageHandler(status)
        )
      );
    isShowForm.edit &&
      dispatch(
        editCandidatePositionMeeting(values.id, dataToSend, (status) =>
          reloadPageHandler(status)
        )
      );
  };
  const timeToDate = (time) => {
    let d = new Date();
    let [hours, minutes, seconds] = time.split(":");
    d.setHours(hours);
    d.setMinutes(minutes);
    d.setSeconds(seconds);
    return d;
  };

  // ---------- lifeCycles ----------
  useEffect(() => {
    dispatch(
      getCandidatePositionMeeting({
        pageNumber: 0,
        pageSize: 0,
        filters: [
          {
            property: "CandidatePositionId",
            operation: 5,
            values: [candidatePositionId.toString()],
          },
        ],
        orderBy: "",
        includeProperties: "",
      })
    );
  }, []);
  useEffect(() => {
    if (candidateMeetingData.length) {
      const values = candidateMeetingData.map((item, index) => ({
        rowId: index + 1,
        id: item.id,
        title: item.title,
        meetingSpeakingPerson: item.meetingSpeakingPerson,
        meetingDate: item.meetingDate,
        startTime: item.startTime.slice(0, 5),
        endTime: item.endTime.slice(0, 5),
        meetingResult: item.meetingResult,
      }));
      setData(values);
    } else {
      setData([]);
    }
  }, [candidateMeetingData]);
  useEffect(() => {
    setFormValue({
      id: editInfo.id,
      tenantId: editInfo.tenantId,
      personId: editInfo.personId,
      candidatePositionId: editInfo.candidatePositionId,
      title: editInfo.title,
      meetingDate: editInfo.meetingDate && new Date(editInfo.meetingDate),
      allDay: editInfo.allDay,
      startTime: editInfo.startTime && timeToDate(editInfo.startTime),
      endTime: editInfo.endTime && timeToDate(editInfo.endTime),
      color: editInfo.color,
      meetingResult: editInfo.meetingResult,
      meetingSpeakingPerson: editInfo.meetingSpeakingPerson,
      url: editInfo.url,
    });
    setSelectedOption(colors.filter((color) => color.value === editInfo.color));
  }, [editInfo]);

  // ---------- render jsx ----------
  return (
    <>
      <div className="flex items-center justify-between p-4 select-none border-b dark:rounded-t-lg border-custom-gray-light dark:bg-dark_custom-average-black">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white">
          {t("page_title.position_meeting")}
        </h4>
        <div
          className="cursor-pointer dark:text-dark_custom-full-white"
          onClick={closeHandler}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.5"
              x="6"
              y="17.3137"
              width="16"
              height="2"
              rx="1"
              transform="rotate(-45 6 17.3137)"
              fill="currentColor"
            />
            <rect
              x="7.41422"
              y="6"
              width="16"
              height="2"
              rx="1"
              transform="rotate(45 7.41422 6)"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <div className="ml-auto mr-3 m-5 mb-0">
        <Button
          title={t("button.create_title")}
          classes={"outline-none"}
          onClick={() => {
            setIsShowForm({ edit: false, create: true });
            setFormValue({
              tenantId: +getDataFromJwtToken("TenantId"),
              personId: personId,
              candidatePositionId: candidatePositionId,
              title: "",
              meetingDate: "",
              allDay: true,
              startTime: "",
              endTime: "",
              color: null,
              meetingResult: "",
              meetingSpeakingPerson: "",
              url: "",
            });
          }}
        />
      </div>
      <div className="flex flex-col p-3 mb-10">
        {isLoading ? (
          <ClipLoader color="#FE6601" className="w-full mx-auto" />
        ) : (
          <Table data={data} cols={cols} />
        )}

        {(isShowForm.create || isShowForm.edit) && (
          <MyForm
            initialValues={formValue}
            validation={dataSchema}
            submit={onSubmit}
            classes="p-4 select-none mt-10 bg-orange-50 rounded border-2 border-orange-200 dark:border-0"
          >
            <span className="flex justify-between">
              <p className="font-semibold mb-5 dark:text-dark_custom-full-white">
                {isShowForm.create
                  ? t("page_title.new_position_meeting")
                  : t("page_title.edit_position_meeting")}
              </p>
              {/* Form buttons start */}
              <div className="w-1/10 flex gap-x-1 -mt-2">
                <Field
                  component={Button}
                  title={<RxCross2 size={20} />}
                  theme="light"
                  classes="!px-2"
                  onClick={() => {
                    setIsShowForm({ ...false });
                  }}
                />
                <Field
                  component={Button}
                  title={<TiTick size={20} />}
                  loading={loading}
                  type="submit"
                  theme="dark"
                  classes="!px-2"
                />
              </div>
              {/* Form buttons end */}
            </span>
            <hr />
            <div className="w-full flex flex-col gap-y-1">
              <div className="w-full flex gap-x-2 mt-2">
                <div className="w-1/3">
                  <Field
                    component={Input}
                    placeholder={t("input.title.placeholder")}
                    label={t("input.title.label")}
                    name="title"
                  />
                </div>
                <div className="w-1/3">
                  <Field
                    component={CustomDatePicker}
                    placeholder={t("input.meeting_date.placeholder")}
                    label={t("input.meeting_date.label")}
                    name="meetingDate"
                  />
                  <Error name="meetingDate" />
                </div>

                <div className="w-1/3">
                  <Field
                    component={CustomDatePicker}
                    placeholder={t("input.start_time.placeholder")}
                    label={t("input.start_time.label")}
                    name="startTime"
                    timeOnly
                  />
                  <Error name="startTime" />
                </div>
              </div>
              <div className="w-full flex gap-2">
                <div className="w-1/3">
                  <Field
                    component={CustomDatePicker}
                    placeholder={t("input.end_time.placeholder")}
                    label={t("input.end_time.label")}
                    name="endTime"
                    timeOnly
                  />
                  <Error name="endTime" />
                </div>
                <div className="w-1/3">
                  <Field
                    component={SelectBox}
                    placeholder={t("input.color.placeholder")}
                    label={t("input.color.label")}
                    name="color"
                    options={colors}
                    selectedOption={selectedOption}
                  />
                </div>

                <div className="w-1/3">
                  <Field
                    component={Input}
                    placeholder={t("input.meeting_result.placeholder")}
                    label={t("input.meeting_result.label")}
                    name="meetingResult"
                  />
                </div>
              </div>
              <div className="w-full flex gap-2">
                <div className="w-1/3">
                  <Field
                    component={Input}
                    placeholder={t("input.meeting_speaking_person.placeholder")}
                    label={t("input.meeting_speaking_person.label")}
                    name="meetingSpeakingPerson"
                  />
                </div>

                <div className="w-1/3">
                  <Field
                    component={Input}
                    placeholder={t("input.url.placeholder")}
                    label={t("input.url.label")}
                    name="url"
                  />
                </div>
                <div className="mt-10">
                  <Field
                    component={Checkbox}
                    placeholder={t("input.all_day.placeholder")}
                    label={t("input.all_day.label")}
                    name="allDay"
                  />
                </div>
              </div>
            </div>
          </MyForm>
        )}
      </div>
    </>
  );
};
