import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Field } from "formik";
import {
  Button,
  MyForm,
  // Error,
  // Input,
  SelectBox,
} from "../../../../../components";
// import { getCandidates } from "../../../../../redux/actions/candidate";
import * as Yup from "yup";
// import { getAllCandidatePositionStatus } from "../../../../../redux/actions/settings/candidate-position-status";
import { convertArrayToSelectOptions } from "../../../../../helpers/convert-array-to-select-options";
import { changeStatusCandidatePosition } from "../../../../../redux/actions/candidate-position";

export const ChangeStatus = ({
  onCloseModal,
  reFetchData,
  statusData,
  candidatePositionStatus,
  // handleDrag,
}) => {
  // ---------- store ----------
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);

  // ---------- state ----------
  const [statusItems, setStatusItems] = useState();
  const [formValue, setFormValue] = useState({
    candidatePositionId: statusData.item
      ? statusData.item.candidatePositionId
      : statusData.candidatePositionId,
    candidatePositionStatusId: null,
  });

  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ---------- functions ----------
  const reloadPageHandler = (status) => {
    if (status) {
      onCloseModal();
      reFetchData();
    }
  };

  const closeHandler = () => {
    onCloseModal();
  };
  const onSubmit = (params) => {
    dispatch(
      changeStatusCandidatePosition(params, (status) => {
        reloadPageHandler(status);
        // handleDrag(
        //   status,
        //   params,
        //   statusData.destination,
        //   statusData.item,
        //   statusData.droppableId,
        //   statusData.filteredItems
        // );
        // reloadPageHandler(status);
      })
    );
    // onCloseModal();
    // reloadPageHandler(true);
  };

  // ---------- lifeCycle ----------
  useEffect(() => {
    if (candidatePositionStatus) {
      const filteredItems = candidatePositionStatus.filter(
        (candidatePosition) =>
          statusData.item
            ? candidatePosition.parentId ===
              statusData.item.candidatePositionStatusId
            : candidatePosition.parentId ===
              statusData.candidatePositionStatusId
      );
      const selectOptions = convertArrayToSelectOptions(filteredItems, [
        "id",
        "title",
      ]);
      if (
        statusData.item?.candidateGroup === 3 ||
        statusData.candidateGroup === 3
      ) {
        setStatusItems([
          {
            value: 1,
            label: "Saved",
          },
        ]);
      } else {
        setStatusItems(selectOptions);
      }
    }
  }, [candidatePositionStatus]);

  // ---------- render jsx ----------
  return (
    <>
      <div className="flex items-center justify-between p-4 select-none border-b border-custom-gray-light dark:bg-dark_custom-average-black">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white">
          {t("page_title.change_status")}
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
      <div className="p-4 flex justify-between">
        <p className="text-14">
          <span className="text-custom-gray-muted dark:text-dark_custom-full-white">
            {t("text.name")}:
          </span>{" "}
          <span className="dark:text-custom-gray-muted">
            {statusData.item ? statusData.item.name : statusData.name}
          </span>
        </p>
        <p className="text-14">
          <span className="text-custom-gray-muted dark:text-dark_custom-full-white">
            {t("text.family")}:
          </span>{" "}
          <span className="dark:text-custom-gray-muted">
            {statusData.item ? statusData.item.family : statusData.family}
          </span>
        </p>
        <p className="text-14">
          <span className="text-custom-gray-muted dark:text-dark_custom-full-white">
            {t("text.email")}:
          </span>{" "}
          <span className="dark:text-custom-gray-muted">
            {statusData.item ? statusData.item.email : statusData.email}
          </span>
        </p>
      </div>
      <MyForm
        initialValues={formValue}
        submit={onSubmit}
        classes="flex flex-col gap-y-10 p-4 select-none rounded-b-lg"
      >
        <div className="flex flex-col gap-y-4">
          <div className="w-full flex gap-4">
            <div className="w-1/2">
              <label className="text-14 font-medium dark:text-dark_custom-full-white">
                {t("input.current_status")}
              </label>
              <div className="w-max h-9 leading-9 px-2 rounded-md text-14 bg-custom-gray-light text-custom-gray-muted mt-2">
                {statusData.item
                  ? statusData.item.candidatePositionStatus.title
                  : statusData.candidatePositionStatus.title}
              </div>
            </div>
            <div className="w-1/2">
              <Field
                component={SelectBox}
                label={t("input.choose_status")}
                name="candidatePositionStatusId"
                options={statusItems}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex gap-x-2 items-center justify-end">
          <div className="flex items-center gap-x-2">
            <Field
              component={Button}
              title={t("button.save_title")}
              loading={isLoading}
              type="submit"
              theme="dark"
            />
          </div>
        </div>
      </MyForm>
    </>
  );
};
