import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages } from "../../../../redux/actions/settings/language";
import { Table } from "../../../../components";
import { ClipLoader } from "react-spinners";
import {
  endLoading,
  startLoading,
} from "../../../../redux/reducers/ui/loading";
import axios from "axios";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { api } from "../../../../api";

import MoreIcon from "../../../../assets/images/more.png";

export const Language = () => {
  // ---------- state ----------
  const [isReload, setIsReload] = useState(false);
  const [data, setData] = useState();

  // ---------- store ----------
  const languageData = useSelector((state) => state.languageSlice.info);
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);

  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ---------- variables ----------
  const cols = [
    {
      name: t("table.col.no"),
      cell: (row) => (
        <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
          {row.rowId}
        </div>
      ),
    },
    {
      name: t("table.col.title"),
      selector: (row) =>
      <p className="dark:text-dark_custom-full-white">
        {row.title}
      </p>
    },
    {
      name: t("table.col.code"),
      selector: (row) => 
      <p className="dark:text-dark_custom-full-white">
        {row.code}
      </p>
    },
  ];

  // ---------- lifeCycle ----------
  useEffect(() => {
    dispatch(getLanguages({}));
  }, [isReload]);
  useEffect(() => {
    if (languageData) {
      const values = languageData.data?.map((item, index) => ({
        rowId: index + 1,
        id: item.id,
        title: item.title,
        code: item.code,
      }));
      setData(values);
    }
  }, [languageData]);

  // ---------- render jsx ----------
  return (
    <>
      <div className="dark:bg-dark_custom-light-black rounded-10 overflow-hidden">
        <div className="flex flex-col gap-y-8 w-full bg-white p-6 dark:bg-dark_custom-light-black">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-y-1">
              <h4 className="text-19 text-custom-dark font-bold dark:text-dark_custom-full-white">
                {t("page_title.language")}
              </h4>
              <h4 className="text-14 flex gap-x-2 text-custom-gray-muted dark:text-dark_custom-light-white">
                {t("table.result")}
                <span className="text-custom-gray-200 font-bold dark:text-dark_custom-light-white">
                  {languageData.count}
                </span>
              </h4>
            </div>
          </div>
          {isLoading ? (
            <ClipLoader color="#FE6601" className="w-full mx-auto" />
          ) : (
            <Table cols={cols} data={data} />
          )}
        </div>
      </div>
    </>
  );
};
