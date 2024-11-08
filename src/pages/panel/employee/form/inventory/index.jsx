import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  MyForm,
  CustomDatePicker,
  Input,
  Error,
  SelectBox,
} from "../../../../../components";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployeeInventory,
  editEmployeeInventory,
  getByIdEmployeeInventory,
  getEmployeeInventory,
} from "../../../../../redux/actions/employee-inventory";
import {
  errorNotification,
  successNotification,
} from "../../../../../helpers/notification";
import { api } from "../../../../../api";
import { useTranslation } from "react-i18next";
import { getDataFromJwtToken } from "../../../../../helpers/get-data-from-jwt";
import { convertArrayToSelectOptions } from "../../../../../helpers/convert-array-to-select-options";
import { convertDateToString } from "../../../../../helpers/convert-date-to-string";
import { getInventories } from "../../../../../redux/actions/settings/inventory";
import { Field } from "formik";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import axios from "axios";
import * as Yup from "yup";

export const Inventory = ({ state, onCloseModal }) => {
  // ----------store-----------
  const {
    info: employeeInventoryData,
    count,
    editInfo,
    loading,
  } = useSelector((state) => state.employeeInventorySlice);
  const inventoryData = useSelector((state) => state.inventorySlice.info);

  // ----------states----------
  const [data, setData] = useState([]);
  const [isShowForm, setIsShowForm] = useState({ create: false, edit: false });
  const [selectOption, setSelectOption] = useState({});
  const [selectedOption, setSelectedOption] = useState();
  const [formValue, setFormValue] = useState({
    tenantId: getDataFromJwtToken("TenantId"),
    personId: state?.personId,
    employeeId: state?.id,
    inventoryId: 0,
    assignDate: "",
    returnDate: "",
    description: "",
  });

  // ----------hooks----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ----------lifeCycle----------
  useEffect(() => {
    dispatch(
      getEmployeeInventory({
        pageNumber: 0,
        pageSize: 0,
        filters: [
          {
            property: "EmployeeId",
            operation: 5,
            values: [`${state?.id}`],
          },
        ],
        includeProperties: "Employee.CandidatePosition.Candidate,Inventory",
      })
    );
    dispatch(getInventories({}));
  }, []);
  useEffect(() => {
    if (employeeInventoryData.count && employeeInventoryData?.data.length > 0) {
      const values = employeeInventoryData.data.map((item, index) => ({
        rowId: index + 1,
        id: item.id,
        name: `${item.employee.candidatePosition.candidate.name} ${item.employee.candidatePosition.candidate.family}`,
        serialNumber: item.inventory.serialNumber,
        brand: item.inventory.brand,
        model: item.inventory.model,
        assignDate: item.assignDate.split("T")[0],
        returnDate: item.returnDate.split("T")[0],
      }));
      setData(values);
    } else {
      setData([]);
    }
  }, [employeeInventoryData]);
  useEffect(() => {
    setFormValue({
      id: editInfo.id,
      tenantId: editInfo.tenantId,
      personId: editInfo.personId,
      employeeId: editInfo.employeeId,
      inventoryId: editInfo.inventoryId,
      assignDate: editInfo.assignDate && new Date(editInfo.assignDate),
      returnDate: editInfo.returnDate && new Date(editInfo.returnDate),
      description: editInfo.description,
    });
    setSelectedOption({
      value: editInfo.inventory?.id,
      label: editInfo.inventory?.brand,
    });
  }, [editInfo]);
  useEffect(() => {
    if (inventoryData.count && inventoryData?.data.length > 0) {
      const option = convertArrayToSelectOptions(inventoryData.data, [
        "id",
        "brand",
      ]);
      setSelectOption(option);
    }
  }, [inventoryData]);

  // ----------variables----------
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
      name: t("table.col.inventory_serialNumber"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.serialNumber}</p>
      ),
    },
    {
      name: t("table.col.inventory_brand"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.brand}</p>
      ),
    },
    {
      name: t("table.col.inventory_model"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.model}</p>
      ),
    },
    {
      name: t("table.col.assign_date"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.assignDate}</p>
      ),
    },
    {
      name: t("table.col.return_date"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.returnDate}</p>
      ),
    },
    {
      name: t("table.col.action"),
      cell: (row) => (
        <div className="flex gap-x-1">
          <span
            className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
            onClick={() => {
              setIsShowForm({ create: false, edit: true });
              dispatch(getByIdEmployeeInventory(row.id, "Inventory"));
            }}
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
          <div
            className="p-[6px] rounded-md bg-custom-gray-light cursor-pointer"
            onClick={() => deleteHandler(row.id)}
          >
            <svg
              width="15"
              height="15"
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
    inventoryId: Yup.number().required(t("error.inventory_required")),
    assignDate: Yup.string().required(t("error.assign_date_required")),
    returnDate: Yup.string().required(t("error.return_date_required")),
  });
  const headers = {
    "Content-Type": "application/json",
    Authorization: localStorage.token,
  };

  // --------- function ---------
  const reloadPageHandler = (status) => {
    if (status) {
      setIsShowForm({ ...false });
    }
    dispatch(
      getEmployeeInventory({
        pageNumber: 0,
        pageSize: 0,
        filters: [
          {
            property: "EmployeeId",
            operation: 5,
            values: [`${state?.id}`],
          },
        ],
        includeProperties: "Employee.CandidatePosition.Candidate,Inventory",
      })
    );
  };
  const deleteHandler = (id) => {
    axios
      .delete(api.EmployeeInventoryApi.deleteEmployeeInventory + id, {
        headers,
      })
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
  const onSubmit = (values) => {
    const clone = { ...values };
    const dataToSend = {
      ...clone,
      assignDate: clone.assignDate
        ? convertDateToString(clone.assignDate)
        : editInfo.assignDate,
      returnDate: clone.returnDate
        ? convertDateToString(clone.returnDate)
        : editInfo.returnDate,
    };
    isShowForm.create &&
      dispatch(
        createEmployeeInventory(dataToSend, (status) =>
          reloadPageHandler(status)
        )
      );
    isShowForm.edit &&
      dispatch(
        editEmployeeInventory(values.id, dataToSend, (status) =>
          reloadPageHandler(status)
        )
      );
  };

  // -------- render jsx ---------
  return (
    <div className="dark:bg-dark_custom-light-black rounded-10 overflow-hidden">
      <div className="flex flex-col gap-y-8 w-full p-6 bg-white dark:bg-dark_custom-light-black">
        <div>
          <div className="flex justify-between gap-y-1 mb-5">
            <h4 className="text-19 text-custom-dark font-bold dark:text-dark_custom-full-white">
              {t("page_title.employee_inventory")}
            </h4>
            <div
              className="cursor-pointer dark:text-dark_custom-full-white"
              onClick={() => onCloseModal()}
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
          <hr />
        </div>
        <div className="flex justify-end mx-5 mt-0">
          <Button
            title={t("button.create_title")}
            classes={"outline-none"}
            onClick={() => {
              setIsShowForm({ edit: false, create: true });
              setSelectedOption(null);
              setFormValue({
                tenantId: getDataFromJwtToken("TenantId"),
                personId: state?.personId,
                employeeId: state?.id,
                inventoryId: null,
                assignDate: "",
                returnDate: "",
                description: "",
              });
            }}
          />
        </div>
        <h4 className="text-14 flex gap-x-2 text-custom-gray-muted dark:text-dark_custom-light-white">
          {t("table.result")}
          <span className="text-custom-gray-200 font-bold dark:text-dark_custom-light-white">
            {count}
          </span>
        </h4>
        {loading ? (
          <ClipLoader color="#FE6601" className="w-full mx-auto" />
        ) : (
          <Table cols={cols} data={data} />
        )}
      </div>
      <div className="m-5">
        {(isShowForm.create || isShowForm.edit) && (
          <MyForm
            initialValues={formValue}
            validation={dataSchema}
            submit={onSubmit}
            classes="p-4 select-none mt-10 bg-orange-50 rounded border-2 border-orange-200 dark:border-0"
          >
            <p className="font-semibold mb-5 dark:text-dark_custom-full-white">
              {isShowForm.create
                ? t("page_title.new_employee_inventory")
                : t("page_title.edit_employee_inventory")}
            </p>
            <hr />
            <div className="w-full flex flex-col gap-4 my-3">
              <div className="flex gap-x-2">
                <div className="w-1/3">
                  <Field
                    component={SelectBox}
                    placeholder={t("input.inventory.placeholder")}
                    label={t("input.inventory.label")}
                    name="inventoryId"
                    options={selectOption}
                    selectedOption={selectedOption}
                  />
                  <Error name="inventoryId" />
                </div>
                <div className="w-1/3">
                  <Field
                    component={CustomDatePicker}
                    placeholder={t("input.assign_date.placeholder")}
                    label={t("input.assign_date.label")}
                    name="assignDate"
                  />
                  <Error name="assignDate" />
                </div>
                <div className="w-1/3">
                  <Field
                    component={CustomDatePicker}
                    placeholder={t("input.return_date.placeholder")}
                    label={t("input.return_date.label")}
                    name="returnDate"
                  />
                  <Error name="returnDate" />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/2">
                  <Field
                    component={Input}
                    type="textarea"
                    placeholder={t("input.description.placeholder")}
                    label={t("input.description.label")}
                    name="description"
                  />
                </div>
                <div className="w-1/10 flex gap-x-1 mt-20 mr-2">
                  <Field
                    component={Button}
                    title={<RxCross2 size={20} />}
                    theme="light"
                    classes="!px-2"
                    onClick={() => setIsShowForm({ ...false })}
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
              </div>
            </div>
          </MyForm>
        )}
      </div>
    </div>
  );
};
