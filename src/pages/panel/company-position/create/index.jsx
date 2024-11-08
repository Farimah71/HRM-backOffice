import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Field } from "formik";
import { getDataFromJwtToken } from "../../../../helpers/get-data-from-jwt";
import { Button, MyForm, TabWrapper } from "../../../../components";
import { createCompanyPosition } from "../../../../redux/actions/company-position";
import { getCompanyPositionGroups } from "../../../../redux/actions/settings/company-position-group";
import { getAllCompanyPositionStatus } from "../../../../redux/actions/settings/company-position-status";
import { getWorkModes } from "../../../../redux/actions/settings/work-mode";
import { getWorkTypes } from "../../../../redux/actions/settings/work-type";
import { getFeatures } from "../../../../redux/actions/settings/feature";
import { getExpertises } from "../../../../redux/actions/settings/expertise";
import { convertArrayToSelectOptions } from "../../../../helpers/convert-array-to-select-options";
import { convertDateToString } from "../../../../helpers/convert-date-to-string";
import { getCompanyProjects } from "../../../../redux/actions/company-project";
import { getCities } from "../../../../redux/actions/settings/city";
import { TabPanel } from "react-tabs";
import { BaseInfo } from "./tabs/base-info";
import { Detail } from "./tabs/detail";
import { Feature } from "./tabs/feature";
import { Expertise } from "./tabs/expertise";
import * as Yup from "yup";

export const CreateCompanyPosition = () => {
  // ---------- store ----------
  const { loading } = useSelector((state) => state.companyPositionSlice);
  const {
    info: { data: companyProjectData },
    loading: companyProjectLoading,
  } = useSelector((state) => state.companyProjectSlice);
  const {
    info: { data: cityData },
    loading: cityLoading,
  } = useSelector((state) => state.citySlice);
  const {
    info: { data: companyPositionStatusData },
    loading: companyPositionLoading,
  } = useSelector((state) => state.companyPositionStatusSlice);
  const {
    info: { data: companyPositionGroupData },
    loading: companyPositionGroupLoading,
  } = useSelector((state) => state.companyPositionGroupSlice);
  const {
    info: { data: workModeData },
    loading: workModeLoading,
  } = useSelector((state) => state.workModeSlice);
  const {
    info: { data: workTypeData },
    loading: workTypeLoading,
  } = useSelector((state) => state.workTypeSlice);
  const {
    info: { data: featureData },
    loading: featureLoading,
  } = useSelector((state) => state.featureSlice);
  const {
    info: { data: expertiseData },
    loading: expertiseLoading,
  } = useSelector((state) => state.expertiseSlice);

  // ---------- state ----------
  const [selectedItems, setSelectedItems] = useState({
    features: [],
    expertises: [],
  });
  const [filterItems, setFilterItems] = useState({
    features: [],
    expertises: [],
  });
  const [selectOptions, setSelectOptions] = useState({
    companyProject: [],
    companyPositionGroup: [],
    city: [],
    companyPositionStatus: [],
    workMode: [],
    workType: [],
  });

  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  // ---------- variables ----------
  let initialFormValue = {
    tenantId: +getDataFromJwtToken("TenantId"),
    companyId: state.companyId ? state.companyId : state.companyInfo,
    companyProjectId: null,
    positionGroupId: null,
    title: "",
    cityId: null,
    description: "",
    positionDetial: "",
    workTypeId: null,
    workModeId: null,
    salaryRange: "",
    closingDate: "",
    closingOrSuspendingReason: "",
    existOnKariyer: false,
    existOnLinkedIn: false,
    companyPositionStatusId: null,
    responsibleMan: "",
    isActive: false,
    isOnBlackList: false,
    isClosed: false,
  };
  const dataSchema = Yup.object({
    title: Yup.string().required(t("error.title_required")),
    companyProjectId: Yup.number().required(t("error.companyProject_required")),
    positionGroupId: Yup.number().required(t("error.positionGroup_required")),
    companyPositionStatusId: Yup.number().required(
      t("error.companyPositionStatus_required")
    ),
    cityId: Yup.number().required(t("error.city_required")),
    workTypeId: Yup.number().required(t("error.workType_required")),
    workModeId: Yup.number().required(t("error.workMode_required")),
    closingDate: Yup.string().required(t("error.closing_date_required")),
  });

  // ---------- functions ----------
  const onSubmit = (values) => {
    const clone = { ...values };
    const dataToSend = {
      ...clone,
      closingDate: clone.closingDate && convertDateToString(clone.closingDate),
    };
    dispatch(
      createCompanyPosition(
        {
          ...dataToSend,
          companyPositionFeatures: selectedItems.features.map((feature) => ({
            id: null,
            companyPositionId: 0,
            featureId: feature.id,
          })),
          companyPositionExpertides: selectedItems.expertises.map(
            (expertise) => ({
              id: null,
              companyPositionId: 0,
              expertiseId: expertise.id,
            })
          ),
        },
        navigate
      )
    );
  };
  const onSelectItem = (item, tab) => {
    if (tab === "feature") {
      setSelectedItems((prevState) => ({
        ...prevState,
        features: [...prevState.features, item],
      }));
    } else {
      setSelectedItems((prevState) => ({
        ...prevState,
        expertises: [...prevState.expertises, item],
      }));
    }
  };
  const onDeSelectItem = (id, tab) => {
    if (tab === "feature") {
      const itemIndex = selectedItems.features.findIndex(
        (featureSelect) => featureSelect.id === id
      );
      if (itemIndex !== -1) {
        const filteredFeatures = selectedItems.features.filter(
          (featureSelect) => featureSelect.id !== id
        );
        setSelectedItems((prevState) => ({
          ...prevState,
          features: filteredFeatures,
        }));
      }
    } else {
      const itemIndex = selectedItems.expertises.findIndex(
        (expertiseSelect) => expertiseSelect.id === id
      );
      if (itemIndex !== -1) {
        const filteredExpertises = selectedItems.expertises.filter(
          (expertiseSelect) => expertiseSelect.id !== id
        );
        setSelectedItems((prevState) => ({
          ...prevState,
          expertises: filteredExpertises,
        }));
      }
    }
  };
  const onSearchItem = (title, tab) => {
    if (tab === "feature") {
      const featuresFiltered = featureData.filter((feature) =>
        feature.title.toLowerCase().includes(title.toLowerCase())
      );
      setFilterItems((prevState) => ({
        ...prevState,
        features: featuresFiltered,
      }));
    } else {
      const expertisesFiltered = expertiseData.filter((feature) =>
        feature.title.toLowerCase().includes(title.toLowerCase())
      );
      setFilterItems((prevState) => ({
        ...prevState,
        expertises: expertisesFiltered,
      }));
    }
  };

  // ---------- lifeCycle ----------
  useEffect(() => {
    dispatch(
      getCompanyProjects({
        filters: [
          {
            property: "CompanyId",
            operation: 5,
            values: [
              `${state.companyId ? state.companyId : state.companyInfo}`,
            ],
          },
        ],
      })
    );
    dispatch(getCompanyPositionGroups({}));
    dispatch(getCities({}));
    dispatch(getAllCompanyPositionStatus({}));
    dispatch(getWorkModes({}));
    dispatch(getWorkTypes({}));
    dispatch(getFeatures({}));
    dispatch(getExpertises({}));
  }, []);
  useEffect(() => {
    if (!!companyProjectData?.length) {
      const options = convertArrayToSelectOptions(companyProjectData, [
        "id",
        "title",
      ]);
      setSelectOptions((prevState) => ({
        ...prevState,
        companyProject: options,
      }));
    }
  }, [companyProjectData]);
  useEffect(() => {
    if (!!cityData?.length) {
      const options = convertArrayToSelectOptions(cityData, ["id", "title"]);
      setSelectOptions((prevState) => ({
        ...prevState,
        city: options,
      }));
    }
  }, [cityData]);
  useEffect(() => {
    if (companyPositionStatusData) {
      const options = convertArrayToSelectOptions(companyPositionStatusData, [
        "id",
        "title",
      ]);
      setSelectOptions((prevState) => ({
        ...prevState,
        companyPositionStatus: options,
      }));
    }
  }, [companyPositionStatusData]);
  useEffect(() => {
    if (companyPositionGroupData) {
      const options = convertArrayToSelectOptions(companyPositionGroupData, [
        "id",
        "title",
      ]);
      setSelectOptions((prevState) => ({
        ...prevState,
        companyPositionGroup: options,
      }));
    }
  }, [companyPositionGroupData]);
  useEffect(() => {
    if (workModeData) {
      const options = convertArrayToSelectOptions(workModeData, [
        "id",
        "title",
      ]);
      setSelectOptions((prevState) => ({
        ...prevState,
        workMode: options,
      }));
    }
  }, [workModeData]);
  useEffect(() => {
    if (workTypeData) {
      const options = convertArrayToSelectOptions(workTypeData, [
        "id",
        "title",
      ]);
      setSelectOptions((prevState) => ({
        ...prevState,
        workType: options,
      }));
    }
  }, [workTypeData]);
  useEffect(() => {
    if (featureData) {
      setFilterItems((prevState) => ({ ...prevState, features: featureData }));
    }
  }, [featureData]);
  useEffect(() => {
    if (expertiseData) {
      setFilterItems((prevState) => ({
        ...prevState,
        expertises: expertiseData,
      }));
    }
  }, [expertiseData]);

  // ---------- render jsx ----------
  return (
    <div className="pb-8">
      <MyForm
        initialValues={initialFormValue}
        validation={dataSchema}
        submit={onSubmit}
        classes="flex flex-col gap-y-8 p-4 pb-20 bg-white rounded-lg"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-18 font-bold dark:text-dark_custom-full-white">
            {t("page_title.create_company_position")}
          </h4>
          <div className="flex items-center justify-end gap-x-2">
            <Field
              component={Button}
              title={t("button.back_title")}
              type="button"
              theme="light"
              onClick={() =>
                navigate("/companyPosition", {
                  state: {
                    companyId: state.companyId
                      ? state.companyId
                      : state.companyInfo,
                  },
                })
              }
            />
            <Field
              component={Button}
              title={t("button.save_title")}
              loading={loading}
              type="submit"
              theme="dark"
              classes="px-10"
            />
          </div>
        </div>
        <TabWrapper
          tabs={[
            t("tab.base_info"),
            t("tab.detail"),
            t("tab.feature"),
            t("tab.expertise"),
          ]}
        >
          <TabPanel>
            <BaseInfo
              selectOptions={selectOptions}
              companyProjectLoading={companyProjectLoading}
              companyPositionLoading={companyPositionLoading}
              companyPositionGroupLoading={companyPositionGroupLoading}
            />
          </TabPanel>
          <TabPanel>
            <Detail selectOptions={selectOptions} cityLoading={cityLoading} />
          </TabPanel>
          <TabPanel>
            <Feature
              onSearch={onSearchItem}
              onSelect={onSelectItem}
              onDeSelect={onDeSelectItem}
              featureData={featureData}
              featureLoading={featureLoading}
              featuresSelected={selectedItems.features}
              featuresFilter={filterItems.features}
            />
          </TabPanel>
          <TabPanel>
            <Expertise
              onSearch={onSearchItem}
              onSelect={onSelectItem}
              onDeSelect={onDeSelectItem}
              expertiseData={expertiseData}
              expertiseLoading={expertiseLoading}
              expertisesSelected={selectedItems.expertises}
              expertisesFilter={filterItems.expertises}
            />
          </TabPanel>
        </TabWrapper>
      </MyForm>
    </div>
  );
};
