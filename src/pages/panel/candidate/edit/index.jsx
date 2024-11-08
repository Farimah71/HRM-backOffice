import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Field } from "formik";
import {
  Button,
  MyForm,
  Error,
  Input,
  PhoneNumberInput,
  Checkbox,
  SelectBox,
} from "../../../../components";
import { editCandidate } from "../../../../redux/actions/candidate";
import { getDataFromJwtToken } from "../../../../helpers/get-data-from-jwt";
import { getCandidates } from "../../../../redux/actions/candidate";
import * as Yup from "yup";

export const EditModal = ({ onCloseModal, countries, data }) => {
  // ---------- store ----------
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);

  // ---------- states ----------
  const [selectedOption, setSelectedOption] = useState({});
  const [formValue, setFormValue] = useState({
    id: data.id,
    tenantId: +getDataFromJwtToken("TenantId"),
    personId: data.personId,
    companyPositionId: data.companyPositionId,
    name: data.name,
    family: data.family,
    phoneNumber: data.phoneNumber,
    cvResource: data.cvResource,
    email: data.email,
    isApproved: data.isApproved,
    isOnBlackList: data.isOnBlackList,
    blacklistReason: data.blacklistReason,
    description: data.description,
    relatedUserId: data.relatedUserId,
    startPeriod: data.startPeriod,
    totalITExperience: data.totalITExperience,
    totalITExperienceMonth: data.totalITExperienceMonth,
    createById: data.createById,
    candidatePositionId: data.candidatePositionId,
    updatedById: data.updatedById,
    isDeleted: data.isDeleted,
    deletedById: data.deletedById,
    candidateGroup: data.candidateGroup,
    candidatePositionStatusId: data.candidatePositionStatusId,
  });
  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ---------- variables ----------
  const dataSchema = Yup.object({
    // name: Yup.string().required(t("error.name_required")),
  });
  const cvResourceOptions = [
    { value: 1, label: "Recruitcrafts" },
    { value: 2, label: "Kariyer" },
    { value: 3, label: "LinkedIn" },
    { value: 4, label: "Customer Offer" },
    { value: 5, label: "Emplyee Offer" },
  ];

  // ---------- lifeCycle ----------
  useEffect(() => {
    data &&
      setSelectedOption(
        cvResourceOptions.filter((option) => option.value === data.cvResource)
      );
  }, []);

  // ---------- functions ----------
  const reloadPageHandler = (status) => {
    if (status) {
      onCloseModal();
      dispatch(getCandidates({ companyPositionId: data.companyPositionId }));
    }
  };
  const closeHandler = () => {
    onCloseModal();
  };
  const onSubmit = (values) => {
    dispatch(
      editCandidate(values.id, values, (status) => reloadPageHandler(status))
    );
  };

  // ---------- render jsx ----------
  return (
    <>
      <div className="flex items-center rounded-t-lg justify-between p-4 select-none border-b border-custom-gray-light dark:bg-dark_custom-average-black">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white">
          {t("page_title.edit_candidate")}
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
      <div className="flex-grow overflow-y-auto rounded-b-lg">
        <MyForm
          initialValues={formValue}
          validation={dataSchema}
          submit={onSubmit}
          classes="flex flex-col gap-y-10 p-4 select-none"
        >
          <div className="flex flex-col gap-y-4">
            <div className="w-full flex gap-4">
              <div className="w-1/2 dark:bg-dark_custom-average-black">
                <Field
                  component={PhoneNumberInput}
                  label={t("input.phone_number_title.label")}
                  countries={countries}
                  name="phoneNumber"
                  disabled={true}
                />
              </div>
              <div className="w-1/2">
                <Field
                  component={Input}
                  placeholder={t("input.name.placeholder")}
                  label={t("input.name.label")}
                  name="name"
                />
                <Error name="name" />
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="w-1/2">
                <Field
                  component={Input}
                  placeholder={t("input.family.placeholder")}
                  label={t("input.family.label")}
                  name="family"
                />
              </div>
              <div className="w-1/2">
                <Field
                  component={Input}
                  placeholder={t("input.email_title.placeholder")}
                  label={t("input.email_title.label")}
                  name="email"
                  complex
                />
              </div>
            </div>

            <div className="w-full flex gap-x-4">
              <div className="w-1/2">
                <Field
                  component={Input}
                  type="number"
                  label={t("input.start_period.label")}
                  placeholder={t("input.start_period.placeholder")}
                  name="startPeriod"
                />
              </div>

              <div className="w-1/2">
                <Field
                  component={Input}
                  type="number"
                  label={t("input.total_IT_experience.label")}
                  placeholder={t("input.total_IT_experience.placeholder")}
                  name="totalITExperience"
                />
              </div>
            </div>

            <div className="w-full flex gap-x-4">
              <div className="w-1/2">
                <Field
                  component={Input}
<<<<<<< HEAD
                  type="number"
=======
>>>>>>> e90e5f69533d1537a8a5bb5acb0b148257e6cb71
                  label={t("input.total_IT_experience_month.label")}
                  placeholder={t("input.total_IT_experience_month.placeholder")}
                  name="totalITExperienceMonth"
                />
              </div>
              <div className="w-1/2">
                <Field
                  component={SelectBox}
                  label={t("input.cv_resource.label")}
                  placeholder={t("input.cv_resource.placeholder")}
                  name="cvResource"
                  options={cvResourceOptions}
                  selectedOption={selectedOption}
                />
              </div>
            </div>

            <div className="w-full flex gap-x-4">
              <div className="w-1/2">
                <Field
                  component={Input}
                  type="textarea"
                  label={t("input.blacklist_reason.label")}
                  placeholder={t("input.blacklist_reason.placeholder")}
                  name="blacklistReason"
                />
              </div>
              <div className="w-1/2">
                <Field
                  component={Input}
                  type="textarea"
                  label={t("input.candidate_description.label")}
                  placeholder={t("input.candidate_description.placeholder")}
                  name="description"
                />
              </div>
            </div>

            <div className="w-full flex gap-x-4">
              <div className="w-1/2">
                <Field
                  component={Checkbox}
                  label={t("input.is_approved.label")}
                  name="isApproved"
                />
              </div>
              <div className="w-1/2">
                <Field
                  component={Checkbox}
                  label={t("input.is_on_blacklist.label")}
                  name="isOnBlackList"
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
      </div>
    </>
  );
};
