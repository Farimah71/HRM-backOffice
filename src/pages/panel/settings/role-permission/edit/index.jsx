import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Field } from "formik";
import { Button, MyForm, Error, Input } from "../../../../../components";
import {
  getByIdRole,
  editRole,
} from "../../../../../redux/actions/settings/role";
import * as Yup from "yup";

export const EditRole = () => {
  // ---------- store ----------
  const editInfo = useSelector((state) => state.roleSlice.editInfo);
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);

  // ---------- store ----------
  const [data, setData] = useState({
    id: null,
    tenantId: null,
    projectId: null,
    title: "",
    description: "",
  });

  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlParams = useParams();

  // ---------- variables ----------
  const dataSchema = Yup.object({
    title: Yup.string().required(t("error.title_required")),
  });

  // ---------- functions ----------
  const onSubmit = (values) => {
    dispatch(editRole(urlParams.id, values, navigate));
  };

  // ---------- lifeCycle ----------
  useEffect(() => {
    dispatch(getByIdRole(urlParams.id));
  }, []);
  useEffect(() => {
    setData({ id: urlParams.id, tenantId: editInfo.tenantId, projectId: editInfo.projectId, title: editInfo.title, description: editInfo.description });
  }, [editInfo]);

  // ---------- render jsx ----------
  return (
    <>
      <div className="p-6 bg-white rounded-11">
        <MyForm
          initialValues={data}
          validation={dataSchema}
          submit={onSubmit}
          classes="flex flex-col gap-y-10"
        >
          <div className="w-full flex gap-x-2 items-center justify-between">
            <h4 className="text-21 text-custom-dark font-bold">
              {t("page_title.edit_role")}
            </h4>
            <div className="flex items-center gap-x-2">
              <Field
                component={Button}
                title={t("button.back_title")}
                type="button"
                theme="light"
                onClick={() => navigate("/role")}
              />
              <Field
                component={Button}
                title={t("button.save_title")}
                loading={isLoading}
                type="submit"
                theme="dark"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="w-full flex gap-x-4">
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
                  component={Input}
                  type="textarea"
                  placeholder={t("input.description.placeholder")}
                  label={t("input.description.label")}
                  name="description"
                />
              </div>
            </div>
          </div>
        </MyForm>
      </div>
    </>
  );
};
