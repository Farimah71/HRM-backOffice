import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  MyForm,
  Input,
  UploadFile,
  Error,
  SelectBox,
} from "../../../../../components";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeFiles } from "../../../../../redux/actions/employee-file";
import { useTranslation } from "react-i18next";
import { convertArrayToSelectOptions } from "../../../../../helpers/convert-array-to-select-options";
import { createEmployeeFile } from "../../../../../redux/actions/employee-file/index";
import { getFileTypes } from "../../../../../redux/actions/settings/file-type/index";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { Field } from "formik";
import * as Yup from "yup";

export const EmployeeFile = ({ state, onCloseModal }) => {
  // ---------- store -----------
  const {
    info: employeeFileData,
    count,
    loading,
  } = useSelector((state) => state.employeeFileSlice);
  const { info: fileTypeData, loading: fileTypeLoading } = useSelector(
    (state) => state.fileTypeSlice
  );

  // ---------- states ----------
  const [data, setData] = useState([]);
  const [isShowForm, setIsShowForm] = useState(false);
  const [selectOption, setSelectOption] = useState();
  const [formValue, setFormValue] = useState({
    employeeId: state?.id,
    title: "",
    myFile: null,
    fileTypeId: null,
    description: "",
  });

  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ---------- lifeCycle ----------
  useEffect(() => {
    dispatch(
      getEmployeeFiles({
        pageNumber: 0,
        pageSize: 0,
        filters: [
          {
            property: "EmployeeId",
            operation: 5,
            values: [`${state?.id}`],
          },
        ],
        includeProperties: "FileType",
      })
    );
    dispatch(getFileTypes({}));
  }, []);
  useEffect(() => {
    if (employeeFileData.length > 0) {
      const values = employeeFileData.map((item, index) => ({
        rowId: index + 1,
        id: item.id,
        title: item.title,
        fileType: item.fileType?.title,
        description: item.description,
      }));
      setData(values);
    } else {
      setData([]);
    }
  }, [employeeFileData]);
  useEffect(() => {
    if (fileTypeData.count && fileTypeData?.data.length > 0) {
      const option = convertArrayToSelectOptions(fileTypeData.data, [
        "id",
        "title",
      ]);
      setSelectOption(option);
    }
  }, [fileTypeData]);

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
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.title}</p>
      ),
    },
    {
      name: t("table.col.file_type"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.fileType}</p>
      ),
    },
    {
      name: t("table.col.description"),
      selector: (row) => (
        <p className="dark:text-dark_custom-full-white">{row.description}</p>
      ),
    },
  ];
  const dataSchema = Yup.object({
    title: Yup.string().required(t("error.title_required")),
    myFile: Yup.mixed().required(t("error.file_required")),
    fileTypeId: Yup.number().required(t("error.file_type_required")),
  });

  // --------- function ---------
  const reloadPageHandler = (status) => {
    if (status) {
      setIsShowForm(false);
    }
    dispatch(
      getEmployeeFiles({
        pageNumber: 0,
        pageSize: 0,
        filters: [
          {
            property: "EmployeeId",
            operation: 5,
            values: [`${state?.id}`],
          },
        ],
        includeProperties: "FileType",
      })
    );
  };
  const fileHandler = (file) => {
    setFormValue((prev) => ({ ...prev, myFile: file.get("myFile") }));
  };
  const onSubmit = (values) => {
    dispatch(createEmployeeFile(values, (status) => reloadPageHandler(status)));
  };

  // -------- render jsx ---------
  return (
    <div className="dark:bg-dark_custom-light-black rounded-10 overflow-hidden overflow-y-auto">
      <div className="flex flex-col gap-y-3 w-full p-6 bg-white dark:bg-dark_custom-light-black">
        <div className="items-center dark:bg-dark_custom-light-black">
          <div className="flex justify-between gap-y-1 mb-5">
            <h4 className="text-19 text-custom-dark font-bold dark:text-dark_custom-full-white">
              {t("page_title.employee_file")}
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
          <div className="flex justify-end m-5 mb-0">
            <Button
              title={t("button.create_title")}
              classes={"outline-none"}
              onClick={() => setIsShowForm(true)}
            />
          </div>
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
        {isShowForm && (
          <MyForm
            initialValues={formValue}
            validation={dataSchema}
            submit={onSubmit}
            doNotInitialize
            classes="p-4 select-none mt-10 bg-orange-50 rounded border-2 border-orange-200 dark:border-0"
          >
            <p className="font-semibold mb-5 dark:text-dark_custom-full-white">
              {t("page_title.new_employee_file")}
            </p>
            <hr />
            <div className="w-full flex flex-col gap-y-4 gap-x-3 my-3">
              <div className="w-full flex gap-x-2">
                <div className="w-1/2">
                  <Field
                    component={Input}
                    placeholder={t("input.title.placeholder")}
                    label={t("input.title.label")}
                    name="title"
                  />
                  <Error name="title" />
                </div>
                <div className="w-1/2">
                  <Field
                    component={SelectBox}
                    placeholder={t("input.file_type.placeholder")}
                    label={t("input.file_type.label")}
                    name="fileTypeId"
                    options={selectOption}
                  />
                  <Error name="fileTypeId" />
                </div>
              </div>
              <div className="w-full flex justify-start gap-x-2">
                <div className="w-1/3">
                  <Field
                    component={Input}
                    type="textarea"
                    placeholder={t("input.description.placeholder")}
                    label={t("input.description.label")}
                    name="description"
                  />
                </div>

                <div className="w-1/2 mt-32">
                  <Field
                    component={UploadFile}
                    label={t("button.upload_file")}
                    name="myFile"
                    formData
                    fileHandler={fileHandler}
                  />
                  <Error name="myFile" />
                </div>

                <div className="w-1/10 flex gap-x-1 mt-32 ml-auto">
                  <Field
                    component={Button}
                    title={<RxCross2 size={20} />}
                    theme="light"
                    classes="!px-2"
                    onClick={() => setIsShowForm(false)}
                  />
                  <Field
                    component={Button}
                    title={<TiTick size={20} />}
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
