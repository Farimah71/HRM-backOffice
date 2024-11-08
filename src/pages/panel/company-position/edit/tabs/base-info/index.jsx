import { Field } from "formik";
import { Error, Input, SelectBox } from "../../../../../../components";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export const BaseInfo = ({
  selectOptions,
  companyProjectLoading,
  companyPositionLoading,
  editValues,
}) => {
  // ---------- hooks ----------
  const { t } = useTranslation();

  // ---------- state ----------
  const [editSelectOptions, setEditSelectOptions] = useState({
    companyProject: {},
    companyPositionGroup: {},
    companyPositionStatus: {},
  });

  // ---------- lifeCycle ----------
  useEffect(() => {
    if (editValues) {
      const companyProject = selectOptions.companyProject.find(item => item.value === editValues.companyProjectId);
      const companyPositionGroup = selectOptions.companyPositionGroup.find(item => item.value === editValues.positionGroupId);
      const companyPositionStatus = selectOptions.companyPositionStatus.find(item => item.value === editValues.companyPositionStatusId);
      setEditSelectOptions({
        companyProject,
        companyPositionGroup,
        companyPositionStatus,
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
            placeholder={t("input.title.placeholder")}
            label={t("input.title.label")}
            name="title"
          />
          <Error name="title" />
        </div>
        <div className="w-1/2">
          <Field
            component={SelectBox}
            name="companyProjectId"
            placeholder={t("input.company_project.placeholder")}
            label={t("input.company_project.label")}
            options={selectOptions.companyProject}
            selectedOption={editSelectOptions.companyProject}
            loading={companyProjectLoading}
          />
          <Error name="companyProjectId" />
        </div>
      </div>
      <div className="flex gap-x-8">
        <div className="w-1/2">
          <Field
            component={SelectBox}
            name="positionGroupId"
            placeholder={t("input.position_group.placeholder")}
            label={t("input.position_group.label")}
            options={selectOptions.companyPositionGroup}
            selectedOption={editSelectOptions.companyPositionGroup}
          />
          <Error name="positionGroupId" />
        </div>
        <div className="w-1/2">
          <Field
            component={SelectBox}
            placeholder={t("input.company_position_status.placeholder")}
            label={t("input.company_position_status.label")}
            name="companyPositionStatusId"
            options={selectOptions.companyPositionStatus}
            selectedOption={editSelectOptions.companyPositionStatus}
            loading={companyPositionLoading}
          />
          <Error name="companyPositionStatusId" />
        </div>
      </div>
    </div>
  );
};
