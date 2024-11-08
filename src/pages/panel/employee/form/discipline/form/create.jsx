import { useState, useEffect } from "react";
import {
  Button,
  MyForm,
  Input,
  UploadFile,
  Error,
  SelectBox,
  CustomDatePicker,
} from "../../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Field } from "formik";
import { convertArrayToSelectOptions } from "../../../../../../helpers/convert-array-to-select-options";
import { convertDateToString } from "../../../../../../helpers/convert-date-to-string";
import { createEmployeeDiscipline } from "../../../../../../redux/actions/employee-discipline";
import { getDisciplineTypes } from "../../../../../../redux/actions/settings/discipline-type";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import * as Yup from "yup";

export const CreateDiscipline = ({ state, reloadPageHandler, onCloseForm }) => {
  // ------------- store ---------------
  const { info: disciplineTypeData, loading: disciplineTypeLoading } =
    useSelector((state) => state.disciplineTypeSlice);

  // ------------- states --------------
  const [selectOption, setSelectOption] = useState();
  const [formValue, setFormValue] = useState({
    employeeId: state?.id,
    title: "",
    myFile: null,
    disciplineTypeId: null,
    issueDate: "",
    description: "",
  });

  // ----------hooks----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  //   ----------lifeCycle----------
  useEffect(() => {
    dispatch(getDisciplineTypes({}));
  }, []);
  useEffect(() => {
    if (disciplineTypeData.count && disciplineTypeData?.data.length > 0) {
      const option = convertArrayToSelectOptions(disciplineTypeData.data, [
        "id",
        "title",
      ]);
      setSelectOption(option);
    }
  }, [disciplineTypeData]);

  // --------- variables ----------
  const dataSchema = Yup.object({
    title: Yup.string().required(t("error.title_required")),
    myFile: Yup.mixed().required(t("error.file_required")),
    disciplineTypeId: Yup.number().required(
      t("error.discipline_type_required")
    ),
    issueDate: Yup.string().required(t("error.issue_date_required")),
  });

  // --------- function ---------
  const fileHandler = (file) => {
    setFormValue((prev) => ({ ...prev, myFile: file.get("myFile") }));
  };
  const onSubmit = (values) => {
    const clone = { ...values };
    const dataToSend = {
      ...clone,
      issueDate: clone.issueDate && convertDateToString(clone.issueDate),
    };

    dispatch(
      createEmployeeDiscipline(dataToSend, (status) =>
        reloadPageHandler(status)
      )
    );
  };

  // ------------- render jsx -------------
  return (
    <MyForm
      initialValues={formValue}
      validation={dataSchema}
      submit={onSubmit}
      doNotInitialize
      classes="p-4 select-none mt-10 bg-orange-50 rounded border-2 border-orange-200 dark:border-0"
    >
      <p className="font-semibold mb-5 dark:text-dark_custom-full-white">
        {t("page_title.new_employee_discipline")}
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
              placeholder={t("input.discipline_type.placeholder")}
              label={t("input.discipline_type.label")}
              name="disciplineTypeId"
              options={selectOption}
            />
            <Error name="disciplineTypeId" />
          </div>
          <div className="w-1/2">
            <Field
              component={CustomDatePicker}
              placeholder={t("input.issue_date.placeholder")}
              label={t("input.issue_date.label")}
              name="issueDate"
            />
            <Error name="issueDate" />
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
              onClick={onCloseForm}
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
  );
};
