import { Field } from "formik";
import { Error, Input, SelectBox } from "../../../../../../components";
import { useTranslation } from "react-i18next";

export const BaseInfo = ({
  selectOptions,
  companyProjectLoading,
  companyPositionLoading,
  companyPositionGroupLoading,
}) => {
  // ---------- hooks ----------
  const { t } = useTranslation();
  
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
            loading={companyPositionGroupLoading}
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
            loading={companyPositionLoading}
          />
          <Error name="companyPositionStatusId" />
        </div>
      </div>
    </div>
  );
};
