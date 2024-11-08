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
} from "../../../../../components";
import { createCandidate } from "../../../../../redux/actions/candidate";
// import { getCountries } from "../../../../../redux/actions/settings/country";
import { getDataFromJwtToken } from "../../../../../helpers/get-data-from-jwt";
import { getPersonByPhone } from "../../../../../redux/actions/person";
import { clearFetchedPerson } from "../../../../../redux/reducers/person";
import { getCandidates } from "../../../../../redux/actions/candidate";
import * as Yup from "yup";

export const CreateCandidate = ({
  onCloseModal,
  companyPositionId,
  countries,
}) => {
  // ---------- store ----------
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);
  const { fetchedPerson: personData, loading: personLoading } = useSelector(
    (state) => state.personSlice
  );

  // ---------- state ----------
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [currentPhone, setCurrentPhone] = useState("");
  const [formValue, setFormValue] = useState({
    tenantId: +getDataFromJwtToken("TenantId"),
    personId: null,
    companyPositionId: companyPositionId,
    name: "",
    family: "",
    phoneNumber: "",
    cvResource: 0,
    email: "",
    isApproved: false,
    isOnBlackList: false,
    blacklistReason: "",
    description: "",
    relatedUserId: 0,
    startPeriod: "",
    totalITExperience: "",
    totalITExperienceMonth: "",
  });

  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ---------- variables ----------
  const dataSchema = Yup.object({
    name: Yup.string().required(t("error.name_required")),
  });
  const cvResourceOptions = [
    { value: 1, label: "Recruitcrafts" },
    { value: 2, label: "Kariyer" },
    { value: 3, label: "LinkedIn" },
    { value: 4, label: "Customer Offer" },
    { value: 5, label: "Emplyee Offer" },
  ];

  // ---------- functions ----------
  const reloadPageHandler = (status) => {
    if (status) {
      onCloseModal();
    }
    dispatch(getCandidates({ companyPositionId: companyPositionId }));
  };
  const handleChangeMobile = (value) => {
    setCurrentPhone(value);
    if (value.length >= 11) {
      dispatch(
        getPersonByPhone({
          pageNumber: 0,
          pageSize: 0,
          filters: [
            {
              property: "PhoneNumber",
              operation: 5,
              values: [value],
            },
          ],
          includeProperties: "",
        })
      );
    }
  };
  const closeHandler = () => {
    dispatch(clearFetchedPerson());
    onCloseModal();
  };
  const onSubmit = (values) => {
    dispatch(createCandidate(values, (status) => reloadPageHandler(status)));
  };

  // ---------- lifeCycle ----------
  useEffect(() => {
    if (personData.length > 0) {
      setIsInputDisabled(false);
      setFormValue((prevValues) => ({
        ...prevValues,
        personId: personData[0].id,
        name: personData[0].firstName,
        family: personData[0].lastName,
        phoneNumber: personData[0].phoneNumber,
        cvResource: personData[0].cvResource,
        email: personData[0].email,
      }));
    }
    if (personData.length === 0) {
      setFormValue({
        tenantId: +getDataFromJwtToken("TenantId"),
        personId: null,
        companyPositionId: companyPositionId,
        name: "",
        family: "",
        phoneNumber: currentPhone,
        cvResource: "",
        email: "",
        isApproved: false,
        isOnBlackList: false,
        blacklistReason: "",
        description: "",
        relatedUserId: 0,
        startPeriod: "",
        totalITExperience: "",
        totalITExperienceMonth: "",
      });
      setIsInputDisabled(false);
    }
  }, [personData]);

  // ---------- render jsx ----------
  return (
    <>
      <div className="flex items-center justify-between p-4 select-none border-b border-custom-gray-light dark:bg-dark_custom-average-black rounded-t-10">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white rounded-10">
          {t("page_title.create_candidate")}
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
      <div className="flex-grow overflow-y-auto rounded-b-10">
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
                  onChange={handleChangeMobile}
                  autocomplete="off"
                  loading={personLoading}
                />
              </div>
              <div className="w-1/2">
                <Field
                  component={Input}
                  placeholder={t("input.name.placeholder")}
                  label={t("input.name.label")}
                  name="name"
                  disabled={isInputDisabled}
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
                  disabled={isInputDisabled}
                />
              </div>
              <div className="w-1/2">
                <Field
                  component={Input}
                  placeholder={t("input.email_title.placeholder")}
                  label={t("input.email_title.label")}
                  name="email"
                  disabled={isInputDisabled}
                />
              </div>
            </div>
            <div className="w-full flex gap-x-4">
              <div className="w-1/2">
                <Field
                  component={Input}
                  label={t("input.start_period.label")}
                  placeholder={t("input.start_period.placeholder")}
                  name="startPeriod"
                  disabled={isInputDisabled}
                />
              </div>

              <div className="w-1/2">
                <Field
                  component={Input}
                  label={t("input.total_IT_experience.label")}
                  placeholder={t("input.total_IT_experience.placeholder")}
                  name="totalITExperience"
                  disabled={isInputDisabled}
                />
              </div>
            </div>
            <div className="w-full flex gap-x-4">
              <div className="w-1/2">
                <Field
                  component={Input}
                  label={t("input.total_IT_experience_month.label")}
                  placeholder={t("input.total_IT_experience_month.placeholder")}
                  name="totalITExperienceMonth"
                  disabled={isInputDisabled}
                />
              </div>
              <div className="w-1/2">
                <Field
                  component={SelectBox}
                  label={t("input.cv_resource.label")}
                  placeholder={t("input.cv_resource.placeholder")}
                  name="cvResource"
                  options={cvResourceOptions}
                  disabled={isInputDisabled}
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
                  disabled={isInputDisabled}
                />
              </div>
              <div className="w-1/2">
                <Field
                  component={Input}
                  type="textarea"
                  label={t("input.candidate_description.label")}
                  placeholder={t("input.candidate_description.placeholder")}
                  name="description"
                  disabled={isInputDisabled}
                />
              </div>
            </div>
            <div className="w-full flex gap-x-4">
              <div className="w-1/2">
                <Field
                  component={Checkbox}
                  label={t("input.is_approved.label")}
                  name="isApproved"
                  disabled={isInputDisabled}
                />
              </div>
              <div className="w-1/2">
                <Field
                  component={Checkbox}
                  label={t("input.is_on_blacklist.label")}
                  name="isOnBlackList"
                  disabled={isInputDisabled}
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
