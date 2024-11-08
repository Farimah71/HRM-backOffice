import { ClipLoader } from "react-spinners";
import { SearchBox } from "../../../../../components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { MyForm } from "./../../../../../components/common/form/index";
import { getFeatures } from "./../../../../../redux/actions/settings/feature/index";
import { useEffect, useState } from "react";
import {
  createPersonFeature,
  deletePersonFeature,
  getPersonFeature,
} from "./../../../../../redux/actions/person-feature/index";

export const EmployeeFeature = ({ state, onCloseModal }) => {
  // ----------- store ----------
  const { isLoading } = useSelector((state) => state.loadingSlice);
  const {
    info: { data: featureData },
  } = useSelector((state) => state.featureSlice);
  const { info: personFeatureData } = useSelector(
    (state) => state.personFeatureSlice
  );

  // ----------hooks----------
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // -----------state-----------
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterItems, setFilterItems] = useState([]);

  // ----------functions----------
  const reloadPageHandler = (status) => {
    if (status) {
      dispatch(getFeatures({}));
      dispatch(
        getPersonFeature({
          pageNumber: 0,
          pageSize: 0,
          filters: [
            {
              property: "PersonCVId",
              operation: 5,
              values: [`${state?.personCvId}`],
            },
          ],
          includeProperties: "Feature",
        })
      );
    }
  };
  const onSelectItem = (id) => {
    dispatch(
      createPersonFeature(
        {
          // tenantId: +getDataFromJwtToken("TenantId"),
          personCVId: state?.personCvId,
          featureId: id,
        },
        (status) => reloadPageHandler(status)
      )
    );
  };
  const onSearchItem = (title) => {
    const featuresFiltered = featureData.filter((feature) =>
      feature.title.toLowerCase().includes(title.toLowerCase())
    );
    setFilterItems(featuresFiltered);
  };

  // ----------lifeCycle----------
  useEffect(() => {
    dispatch(getFeatures({}));
    dispatch(
      getPersonFeature({
        pageNumber: 0,
        pageSize: 0,
        filters: [
          {
            property: "PersonCVId",
            operation: 5,
            values: [`${state?.personCvId}`],
          },
        ],
        includeProperties: "Feature",
      })
    );
  }, []);
  useEffect(() => {
    if (featureData) {
      setFilterItems(featureData);
    }
  }, [featureData]);
  useEffect(() => {
    if (personFeatureData.length) {
      const featureList = personFeatureData.map((data) => data);
      setSelectedItems(featureList);
    }
  }, [personFeatureData]);

  // ---------- render jsx ----------
  return (
    <>
      <MyForm classes="flex flex-col gap-y-8 p-4 pb-6 bg-white rounded-lg dark:bg-dark_custom-light-black">
        <div className="flex items-center justify-between">
          <h4 className="text-18 font-bold dark:text-dark_custom-full-white">
            {t("page_title.feature")}
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
        <SearchBox
          placeholder={t("input.search.placeholder")}
          onChange={(e) => onSearchItem(e.target.value)}
        />
        {isLoading && (
          <div className="w-full flex justify-center">
            <ClipLoader color="#FE6601" className="w-full mx-auto" />
          </div>
        )}
        <div className="flex items-center flex-wrap gap-5 mt-10">
          {selectedItems.length > 0 &&
            selectedItems.map((featureSelect) => (
              <div
                key={featureSelect.id}
                className="p-3 bg-custom-gray-muted rounded-xl cursor-pointer text-14 text-white"
                onClick={() => {
                  dispatch(
                    deletePersonFeature(featureSelect.id, (status) =>
                      reloadPageHandler(status)
                    )
                  );
                }}
              >
                {featureSelect && featureSelect.feature.title}
              </div>
            ))}
        </div>
        <div className="flex items-center flex-wrap gap-5 mt-8 overflow-y-scroll">
          {featureData &&
            filterItems.length > 0 &&
            filterItems.map((feature) =>
              selectedItems.findIndex(
                (featureSelect) => featureSelect.feature.id === feature.id
              ) === -1 ? (
                <div
                  key={feature.id}
                  className="p-3 bg-custom-gray-light rounded-xl cursor-pointer text-14 dark:bg-dark_custom-average-black dark:text-dark_custom-full-white"
                  onClick={() => {
                    onSelectItem(feature.id);
                  }}
                >
                  {feature.title}
                </div>
              ) : (
                <div className="p-3 bg-custom-gray-light rounded-xl cursor-default text-14 opacity-50 dark:bg-dark_custom-average-black dark:text-dark_custom-full-white">
                  {feature.title}
                </div>
              )
            )}
        </div>
      </MyForm>
    </>
  );
};
