import { Field } from "formik";
import {
  Checkbox,
  CustomDatePicker,
  Error,
  Input,
  SelectBox,
} from "../../../../../../components";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export const Detail = ({ selectOptions, cityLoading, editValues }) => {
  // ---------- hooks ----------
  const { t } = useTranslation();

  // ---------- state ----------
  const [editSelectOptions, setEditSelectOptions] = useState({
    city: {},
    workMode: {},
    workType: {},
  });

  // ---------- lifeCycle ----------
  useEffect(() => {
    if (editValues) {
      const city = selectOptions.city.find(
        (item) => item.value === editValues.cityId
      );
      const workMode = selectOptions.workMode.find(
        (item) => item.value === editValues.workModeId
      );
      const workType = selectOptions.workType.find(
        (item) => item.value === editValues.workTypeId
      );
      setEditSelectOptions({
        city,
        workMode,
        workType,
      });
    }
  }, [editValues]);

  // ---------- render jsx ----------
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex gap-x-8">
        <div className="w-1/2">
          <Field
            component={Input}
            name="responsibleMan"
            placeholder={t("input.responsible_man.placeholder")}
            label={t("input.responsible_man.label")}
          />
        </div>
        <div className="w-1/2">
          <Field
            component={Input}
            name="salaryRange"
            placeholder={t("input.salary_range.placeholder")}
            label={t("input.salary_range.label")}
          />
        </div>
      </div>
      <div className="flex gap-x-8">
        <div className="w-1/2">
          <Field
            component={SelectBox}
            name="cityId"
            placeholder={t("input.city.placeholder")}
            label={t("input.city.label")}
            options={selectOptions.city}
            selectedOption={editSelectOptions.city}
            loading={cityLoading}
          />
          <Error name="cityId" />
        </div>
        <div className="w-1/2">
          <Field
            component={CustomDatePicker}
            name="closingDate"
            placeholder={t("input.closing_date.placeholder")}
            label={t("input.closing_date.label")}
          />
          <Error name="closingDate" />
        </div>
      </div>
      <div className="flex gap-x-8">
        <div className="w-1/2">
          <Field
            component={SelectBox}
            name="workModeId"
            placeholder={t("input.work_mode.placeholder")}
            label={t("input.work_mode.label")}
            options={selectOptions.workMode}
            selectedOption={editSelectOptions.workMode}
          />
          <Error name="workModeId" />
        </div>
        <div className="w-1/2">
          <Field
            component={SelectBox}
            name="workTypeId"
            placeholder={t("input.work_type.placeholder")}
            label={t("input.work_type.label")}
            options={selectOptions.workType}
            selectedOption={editSelectOptions.workType}
          />
          <Error name="workTypeId" />
        </div>
      </div>
      <div className="flex gap-x-8">
        <div className="w-1/2">
          <Field
            component={Input}
            placeholder={t("input.closing_suspending_reason.placeholder")}
            label={t("input.closing_suspending_reason.label")}
            name="closingOrSuspendingReason"
          />
        </div>
      </div>
      <div className="flex gap-x-8">
        <div className="w-1/2">
          <Field
            component={Input}
            type="textarea"
            placeholder={t("input.position_detail.placeholder")}
            label={t("input.position_detail.label")}
            name="positionDetial"
          />
        </div>
        <div className="w-1/2">
          <Field
            component={Input}
            type="textarea"
            placeholder={t("input.description.placeholder")}
            label={t("input.description.label")}
            name="description"
          />
        </div>
      </div>
      <div className="flex gap-x-8">
        <div className="w-1/2">
          <Field
            component={Checkbox}
            label={t("input.exist_on_kariyer.label")}
            name="existOnKariyer"
            isChecked={editValues.existOnKariyer}
          />
        </div>
        <div className="w-1/2">
          <Field
            component={Checkbox}
            label={t("input.exist_on_linkedin.label")}
            name="existOnLinkedIn"
            isChecked={editValues.existOnLinkedIn}
          />
        </div>
      </div>
      <div className="flex gap-x-8">
        <div className="w-1/2">
          <Field
            component={Checkbox}
            label={t("input.is_active.label")}
            name="isActive"
            isChecked={editValues.isActive}
          />
        </div>
        <div className="w-1/2">
          <Field
            component={Checkbox}
            label={t("input.is_on_black_list.label")}
            name="isOnBlackList"
            isChecked={editValues.isOnBlackList}
          />
        </div>
      </div>
      <div className="flex gap-x-8">
        <div className="w-1/2">
          <Field
            component={Checkbox}
            label={t("input.is_closed.label")}
            name="isClosed"
            isChecked={editValues.isClosed}
          />
        </div>
      </div>
    </div>
  );
};
