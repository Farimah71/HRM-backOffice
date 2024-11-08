import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Button, MyForm, SearchBox } from "../../../../../components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getExpertises } from "./../../../../../redux/actions/settings/expertise/index";
import { getPersonExpertise } from "./../../../../../redux/actions/person-expertise/index";
import {
  createPersonExpertise,
  deletePersonExpertise,
} from "./../../../../../redux/actions/person-expertise/index";
import { AiTwotoneStar } from "react-icons/ai";
import { Field } from "formik";
import * as Yup from "yup";

export const EmployeeExpertise = ({ state, onCloseModal }) => {
  // ----------store----------
  const {
    info: { data: expertiseData },
  } = useSelector((state) => state.expertiseSlice);
  const { info: personExpertiseData } = useSelector(
    (state) => state.personExpertiseSlice
  );
  const { isLoading } = useSelector((state) => state.loadingSlice);

  // ----------hooks----------
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // ----------states----------
  const [selectedItems, setSelectedItems] = useState([]);
  const [newExpertise, setNewExpertise] = useState({});
  const [filterItems, setFilterItems] = useState([]);
  const [isShowForm, setIsShowForm] = useState(false);
  const [formValue, setFormValue] = useState({
    personCVId: state?.personCvId,
    expertiseId: 0,
    score: 5,
  });

  // ----------functions----------
  const reloadPageHandler = (status) => {
    if (status) {
      dispatch(getExpertises({}));
      dispatch(
        getPersonExpertise({
          pageNumber: 0,
          pageSize: 0,
          filters: [
            {
              property: "PersonCVId",
              operation: 5,
              values: [`${state?.personCvId}`],
            },
          ],
          includeProperties: "Expertise",
        })
      );
    }
  };
  const onSearchItem = (title) => {
    const expertisesFiltered = expertiseData.filter((feature) =>
      feature.title.toLowerCase().includes(title.toLowerCase())
    );
    setFilterItems(expertisesFiltered);
  };
  const onNewExpertise = (expertise) => {
    setNewExpertise({
      id: expertise.id,
      title: expertise.title,
    });
    setFormValue((prevValues) => ({
      ...prevValues,
      expertiseId: expertise.id,
    }));
    setIsShowForm(true);
  };
  const onSubmit = (values) => {
    dispatch(
      createPersonExpertise(values, (status) => reloadPageHandler(status))
    );
    setIsShowForm(false);
  };

  // ----------lifeCycle----------
  useEffect(() => {
    dispatch(getExpertises({}));
    dispatch(
      getPersonExpertise({
        pageNumber: 0,
        pageSize: 0,
        filters: [
          {
            property: "PersonCVId",
            operation: 5,
            values: [`${state?.personCvId}`],
          },
        ],
        includeProperties: "Expertise",
      })
    );
  }, []);
  useEffect(() => {
    if (expertiseData) {
      setFilterItems(expertiseData);
    }
  }, [expertiseData]);
  useEffect(() => {
    if (personExpertiseData.length) {
      const expertiseList = personExpertiseData.map((data) => data);
      setSelectedItems(expertiseList);
    }
  }, [personExpertiseData]);

  // ---------- variables -----------
  const schema = Yup.object({});

  // ---------- render jsx ----------
  return (
    <>
      <div className="flex flex-col gap-y-8 p-4 pb-6 bg-white rounded-lg dark:bg-dark_custom-light-black max-h-[95vh]">
        <div className="flex items-center justify-between">
          <h4 className="text-18 font-bold dark:text-dark_custom-full-white">
            {t("page_title.expertise")}
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

        {isShowForm && (
          <MyForm
            initialValues={formValue}
            validation={schema}
            submit={onSubmit}
            classes={"dark:bg-transparent"}
          >
            <div className="w-full flex justify-start gap-x-10">
              <p
                name="expertiseId"
                className="p-3 bg-custom-gray-light rounded-xl shadow-md dark:shadow-orange-500 cursor-pointer text-14 dark:bg-dark_custom-average-black dark:text-dark_custom-full-white"
              >
                {newExpertise && newExpertise.title}
              </p>
              <Field
                type="range"
                name="score"
                min="0"
                max="10"
                className="accent-orange-600 hover:accent-orange-500 cursor-pointer"
              />
              <Field
                component={Button}
                title={t("button.submit_title")}
                type="submit"
              />
            </div>
          </MyForm>
        )}

        {selectedItems.length > 0 && (
          <div className="flex items-center flex-wrap gap-5 mt-10">
            {selectedItems.length > 0 &&
              selectedItems.map((expertiseSelect) => (
                <div
                  key={expertiseSelect.id}
                  className="p-3 bg-custom-gray-muted rounded-xl cursor-pointer text-14 text-white relative"
                  onClick={() => {
                    dispatch(
                      deletePersonExpertise(expertiseSelect.id, (status) =>
                        reloadPageHandler(status)
                      )
                    );
                  }}
                >
                  {expertiseSelect && expertiseSelect.expertise.title}
                  <span className="absolute -top-4 right-0">
                    <AiTwotoneStar color="gold" size={28} />
                    <span
                      className={`absolute top-[7px] text-black text-[10px] ${
                        expertiseSelect.score === 10
                          ? "right-[9px]"
                          : "right-[11px]"
                      }`}
                    >
                      {expertiseSelect.score}
                    </span>
                  </span>
                </div>
              ))}
          </div>
        )}
        <div className="flex items-center flex-wrap gap-5 mt-8 overflow-y-scroll">
          {expertiseData &&
            filterItems.length > 0 &&
            filterItems.map((expertise) =>
              selectedItems.findIndex(
                (expertiseSelect) =>
                  expertiseSelect.expertise.id === expertise.id
              ) === -1 ? (
                <div
                  key={expertise.id}
                  className="p-3 bg-custom-gray-light rounded-xl cursor-pointer text-14 dark:bg-dark_custom-average-black dark:text-dark_custom-full-white"
                  onClick={() => onNewExpertise(expertise)}
                >
                  {expertise.title}
                </div>
              ) : (
                <div
                  key={expertise.id}
                  className="p-3 bg-custom-gray-light rounded-xl cursor-default text-14 opacity-50 dark:bg-dark_custom-average-black dark:text-dark_custom-full-white"
                >
                  {expertise.title}
                </div>
              )
            )}
        </div>
      </div>
    </>
  );
};
