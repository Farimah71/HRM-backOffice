import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyPositionGroups } from "../../../../redux/actions/settings/company-position-group";
import { Table, Modal, Button } from "../../../../components";
import { Link } from "react-router-dom";
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
import { CreateCompanyPositionGroup } from "./create";
import { EditCompanyPositionGroup } from "./edit";

export const CompanyPositionGroup = () => {
  // ---------- state ----------
  const [isReload, setIsReload] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [itemId, setItemId] = useState();
  const [isActive, setIsActive] = useState(null);

  // ---------- store ----------
  const companyPositionGroupData = useSelector(
    (state) => state.companyPositionGroupSlice.info
  );
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);

  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ---------- variables ----------
  const actions = [
    {
      type: "delete",
      path: "",
    },
    {
      type: "edit",
      path: "",
    },
    {
      type: "add",
      path: "",
    },
  ];

  // ---------- lifeCycle ----------
  useEffect(() => {
    dispatch(getCompanyPositionGroups({}));
  }, [isReload]);

  // ---------- functions ----------
  const headers = {
    "Content-Type": "application/json",
    Authorization: localStorage.token,
  };
  const deleteHandler = (id) => {
    dispatch(startLoading());
    axios
      .delete(api.SettingsApi.deleteCompanyPositionGroup + id, { headers })
      .then((res) => {
        if (res.data.statusCode === "200") {
          dispatch(endLoading());
          successNotification(t("toast.success_delete"));
          setIsReload((currState) => !currState);
        }
      })
      .catch(() => {
        dispatch(endLoading());
        errorNotification(t("toast.error"));
      });
  };
  const openModalHandler = (modal, id) => {
    setOpenModal(true);
    setModalType(modal);
    setItemId(id);
  };
  const closeModalHandler = () => setOpenModal(false);
  const toggleTreeView = (index) => {
    index !== isActive ? setIsActive(index) : setIsActive(null);
  };

  console.log(companyPositionGroupData.data);

  // ---------- render jsx ----------
  return (
    <>
      <Modal state={openModal} onCloseModal={closeModalHandler}>
        {modalType === "create" ? (
          <CreateCompanyPositionGroup
            onCloseModal={closeModalHandler}
            isReloadPage={() => setIsReload((currState) => !currState)}
            parentId={itemId}
          />
        ) : (
          <EditCompanyPositionGroup
            onCloseModal={closeModalHandler}
            isReloadPage={() => setIsReload((currState) => !currState)}
            editId={itemId}
          />
        )}
      </Modal>
      <div className="dark:bg-dark_custom-light-black rounded-10">
        <div className="flex flex-col gap-y-8 w-full bg-white p-6 rounded-lg dark:bg-dark_custom-light-black">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-y-1">
              <h4 className="text-19 text-custom-dark font-bold dark:text-dark_custom-full-white">
                {t("page_title.company_position_group")}
              </h4>
              <h4 className="text-14 flex gap-x-2 text-custom-gray-muted dark:text-dark_custom-light-white">
                {t("table.result")}
                <span className="text-custom-gray-200 font-bold dark:text-dark_custom-light-white">
                  {companyPositionGroupData.count}
                </span>
              </h4>
            </div>
            <div>
              <Button
                theme="dark"
                type="button"
                title={t("button.create_title")}
                classes="px-4"
                onClick={() => openModalHandler("create")}
              />
            </div>
          </div>
          {isLoading && !companyPositionGroupData.count ? (
            <ClipLoader color="#FE6601" className="w-full mx-auto" />
          ) : (
            <div>
              <ul className="flex flex-col gap-y-5">
                {companyPositionGroupData.count &&
                  companyPositionGroupData.data.map(
                    (positionGroup, index) =>
                      !positionGroup.parentId && (
                        <li className="w-2/6 dark:text-dark_custom-full-white" key={positionGroup.id}>
                          <div className="flex items-center justify-between">
                            <div
                              className="flex items-center gap-x-2 cursor-pointer"
                              onClick={() => toggleTreeView(index + 1)}
                            >
                              <span className="dark:text-dark_custom-full-white">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  className={`duration-200 ease-in-out ${
                                    isActive === index + 1
                                      ? "rotate-90"
                                      : "rotate-0"
                                  }`}
                                >
                                  <path
                                    d="M8.00062 12.6265C7.86821 12.6273 7.73856 12.5886 7.62821 12.5154C7.51787 12.4422 7.43182 12.3378 7.38104 12.2155C7.33026 12.0932 7.31706 11.9586 7.3431 11.8287C7.36915 11.6989 7.43327 11.5798 7.52729 11.4865L11.014 7.99984L7.52729 4.51318C7.40312 4.38827 7.33343 4.2193 7.33343 4.04318C7.33343 3.86705 7.40312 3.69808 7.52729 3.57318C7.58926 3.51069 7.663 3.46109 7.74424 3.42725C7.82548 3.3934 7.91261 3.37598 8.00062 3.37598C8.08863 3.37598 8.17577 3.3934 8.25701 3.42725C8.33825 3.46109 8.41198 3.51069 8.47396 3.57318L12.4273 7.52651C12.4903 7.58825 12.5404 7.66188 12.5747 7.74313C12.6091 7.82438 12.6269 7.91164 12.6273 7.99984C12.6269 8.08805 12.6091 8.1753 12.5747 8.25655C12.5404 8.3378 12.4903 8.41143 12.4273 8.47318L8.47396 12.4265C8.41221 12.4895 8.33858 12.5396 8.25733 12.5739C8.17608 12.6083 8.08883 12.6261 8.00062 12.6265Z"
                                    fill="#A1A5B7"
                                  />
                                  <path
                                    opacity="0.3"
                                    d="M11.9597 8.66634H4.03971C3.8629 8.66634 3.69333 8.5961 3.56831 8.47108C3.44328 8.34605 3.37305 8.17649 3.37305 7.99967C3.37305 7.82286 3.44328 7.65329 3.56831 7.52827C3.69333 7.40325 3.8629 7.33301 4.03971 7.33301H11.9597C12.1365 7.33301 12.3061 7.40325 12.4311 7.52827C12.5561 7.65329 12.6264 7.82286 12.6264 7.99967C12.6264 8.17649 12.5561 8.34605 12.4311 8.47108C12.3061 8.5961 12.1365 8.66634 11.9597 8.66634Z"
                                    fill="#A1A5B7"
                                  />
                                </svg>
                              </span>{" "}
                              {positionGroup.title}
                            </div>
                            <div className="flex items-center gap-x-2">
                              {actions.map((action) => (
                                <>
                                  {action.type === "delete" && (
                                    <div className="w-6 h-6 rounded-md bg-custom-gray-light flex items-center justify-center cursor-pointer" onClick={() => deleteHandler(positionGroup.id)}>
                                      <svg
                                        width="17"
                                        height="17"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g opacity="0.3">
                                          <path
                                            d="M10.5797 14.6075L5.54634 14.6675C5.11031 14.6737 4.68845 14.5127 4.36736 14.2176C4.04626 13.9226 3.85029 13.5158 3.81968 13.0808L3.33301 6.12081C3.32556 6.01899 3.33946 5.91673 3.37381 5.82058C3.40816 5.72444 3.46221 5.63652 3.5325 5.56247C3.60278 5.48842 3.68776 5.42986 3.78198 5.39054C3.8762 5.35123 3.9776 5.33202 4.07967 5.33414H11.9197C12.0211 5.33209 12.1219 5.35113 12.2157 5.39004C12.3094 5.42896 12.3941 5.48691 12.4642 5.56022C12.5344 5.63354 12.5886 5.72063 12.6234 5.81598C12.6582 5.91132 12.6728 6.01286 12.6663 6.11414L12.273 12.9941C12.2492 13.4281 12.0608 13.8367 11.7461 14.1365C11.4315 14.4363 11.0143 14.6047 10.5797 14.6075Z"
                                            fill="#A1A5B7"
                                          />
                                        </g>
                                        <path
                                          d="M9.487 9.06641H6.51367C6.38106 9.06641 6.25389 9.01373 6.16012 8.91996C6.06635 8.82619 6.01367 8.69901 6.01367 8.56641C6.01367 8.4338 6.06635 8.30662 6.16012 8.21285C6.25389 8.11908 6.38106 8.06641 6.51367 8.06641H9.487C9.61961 8.06641 9.74679 8.11908 9.84056 8.21285C9.93433 8.30662 9.987 8.4338 9.987 8.56641C9.987 8.69901 9.93433 8.82619 9.84056 8.91996C9.74679 9.01373 9.61961 9.06641 9.487 9.06641Z"
                                          fill="#A1A5B7"
                                        />
                                        <path
                                          d="M8.96654 11.5332H7.0332C6.90059 11.5332 6.77342 11.4805 6.67965 11.3868C6.58588 11.293 6.5332 11.1658 6.5332 11.0332C6.5332 10.9006 6.58588 10.7734 6.67965 10.6796C6.77342 10.5859 6.90059 10.5332 7.0332 10.5332H8.96654C9.09914 10.5332 9.22632 10.5859 9.32009 10.6796C9.41386 10.7734 9.46654 10.9006 9.46654 11.0332C9.46654 11.1658 9.41386 11.293 9.32009 11.3868C9.22632 11.4805 9.09914 11.5332 8.96654 11.5332Z"
                                          fill="#A1A5B7"
                                        />
                                        <path
                                          d="M13.4999 4.7738H13.4266C9.82798 4.27899 6.17856 4.27899 2.57994 4.7738C2.45102 4.79078 2.32056 4.75687 2.21624 4.67926C2.11191 4.60166 2.04191 4.48647 2.0211 4.35812C2.00028 4.22976 2.03029 4.09835 2.10475 3.99176C2.17921 3.88516 2.29226 3.81176 2.41994 3.78713C6.11947 3.26627 9.87373 3.26627 13.5733 3.78713C13.6965 3.80737 13.8077 3.87301 13.885 3.97114C13.9623 4.06927 14.0001 4.19277 13.9909 4.31734C13.9817 4.44191 13.9262 4.55852 13.8353 4.64424C13.7445 4.72995 13.6248 4.77855 13.4999 4.78047V4.7738Z"
                                          fill="#A1A5B7"
                                        />
                                        <path
                                          d="M10.6663 3.89398H5.33301L5.63301 2.34732C5.68647 2.0664 5.83489 1.81241 6.05336 1.62792C6.27184 1.44342 6.54711 1.33965 6.83301 1.33398H9.18634C9.47744 1.33509 9.75908 1.43749 9.98292 1.62361C10.2067 1.80974 10.3588 2.06797 10.413 2.35398L10.6663 3.89398Z"
                                          fill="#A1A5B7"
                                        />
                                      </svg>
                                    </div>
                                  )}
                                  {action.type === "edit" && (
                                    <div
                                      className="w-6 h-6 rounded-md bg-custom-gray-light flex items-center justify-center cursor-pointer"
                                      onClick={() =>
                                        openModalHandler(
                                          "edit",
                                          positionGroup.id
                                        )
                                      }
                                    >
                                      <svg
                                        width="17"
                                        height="17"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          opacity="0.3"
                                          d="M14.2667 5.56754L12.8334 7.00754L8.99337 3.16754L10.4334 1.73421C10.5577 1.60516 10.7069 1.50252 10.8718 1.43241C11.0368 1.36231 11.2141 1.32617 11.3934 1.32617C11.5726 1.32617 11.75 1.36231 11.9149 1.43241C12.0799 1.50252 12.229 1.60516 12.3534 1.73421L14.2667 3.64754C14.3957 3.77192 14.4984 3.92104 14.5685 4.08598C14.6386 4.25093 14.6747 4.42831 14.6747 4.60754C14.6747 4.78677 14.6386 4.96415 14.5685 5.1291C14.4984 5.29404 14.3957 5.44316 14.2667 5.56754ZM2.46003 14.6209L6.59337 13.2475L2.75337 9.40754L1.38003 13.5409C1.3297 13.6913 1.32229 13.8528 1.35865 14.0072C1.39501 14.1616 1.4737 14.3029 1.58587 14.415C1.69805 14.5272 1.83927 14.6059 1.99368 14.6423C2.1481 14.6786 2.30959 14.6712 2.46003 14.6209Z"
                                          fill="#A1A5B7"
                                        />
                                        <path
                                          d="M3.71337 14.2013L2.46003 14.6213C2.30959 14.6716 2.1481 14.679 1.99368 14.6427C1.83927 14.6063 1.69805 14.5276 1.58587 14.4155C1.4737 14.3033 1.39501 14.1621 1.35865 14.0077C1.32229 13.8532 1.3297 13.6917 1.38003 13.5413L1.80003 12.288L3.71337 14.2013ZM2.75337 9.40797L6.59337 13.248L12.8334 7.00797L8.99337 3.16797L2.75337 9.40797Z"
                                          fill="#A1A5B7"
                                        />
                                      </svg>
                                    </div>
                                  )}
                                  {action.type === "add" && (
                                    <div
                                      className="w-6 h-6 rounded-md bg-custom-gray-light flex items-center justify-center cursor-pointer"
                                      onClick={() =>
                                        openModalHandler(
                                          "create",
                                          positionGroup.id
                                        )
                                      }
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="15"
                                        viewBox="0 0 10 10"
                                        fill="none"
                                      >
                                        <path
                                          d="M9.16667 4.16667H5.83333V0.833333C5.83333 0.61232 5.74554 0.400358 5.58926 0.244078C5.43297 0.0877975 5.22101 0 5 0C4.77899 0 4.56702 0.0877975 4.41074 0.244078C4.25446 0.400358 4.16667 0.61232 4.16667 0.833333V4.16667H0.833333C0.61232 4.16667 0.400358 4.25446 0.244078 4.41074C0.0877975 4.56702 0 4.77899 0 5C0 5.22101 0.0877975 5.43297 0.244078 5.58926C0.400358 5.74554 0.61232 5.83333 0.833333 5.83333H4.16667V9.16667C4.16667 9.38768 4.25446 9.59964 4.41074 9.75592C4.56702 9.9122 4.77899 10 5 10C5.22101 10 5.43297 9.9122 5.58926 9.75592C5.74554 9.59964 5.83333 9.38768 5.83333 9.16667V5.83333H9.16667C9.38768 5.83333 9.59964 5.74554 9.75592 5.58926C9.9122 5.43297 10 5.22101 10 5C10 4.77899 9.9122 4.56702 9.75592 4.41074C9.59964 4.25446 9.38768 4.16667 9.16667 4.16667Z"
                                          fill="#A1A5B7"
                                        />
                                      </svg>
                                    </div>
                                  )}
                                </>
                              ))}
                            </div>
                          </div>
                          {!!positionGroup.inverseParent.length && (
                            <div
                              className={`ml-8 ${
                                isActive === index + 1 ? "block mt-5" : "hidden"
                              }`}
                            >
                              <ul className="flex flex-col gap-y-6">
                                {positionGroup.inverseParent.map(
                                  (subPosition) => (
                                    <li className="w-full" key={subPosition.id}>
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-x-2 cursor-pointer">
                                          <span>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="10"
                                              height="14"
                                              viewBox="0 0 6 10"
                                              fill="none"
                                            >
                                              <path
                                                d="M1.03968 9.62651C0.907268 9.62728 0.777622 9.5886 0.667276 9.5154C0.556929 9.4422 0.470882 9.33779 0.420104 9.2155C0.369326 9.0932 0.356118 8.95855 0.382165 8.82872C0.408211 8.69889 0.472332 8.57976 0.566351 8.48651L4.05302 4.99984L0.566351 1.51318C0.442184 1.38827 0.372489 1.2193 0.372489 1.04318C0.372489 0.867052 0.442184 0.698084 0.566351 0.573175C0.628326 0.51069 0.70206 0.461093 0.7833 0.427248C0.864539 0.393402 0.951676 0.375977 1.03968 0.375977C1.12769 0.375977 1.21483 0.393402 1.29607 0.427248C1.37731 0.461093 1.45104 0.51069 1.51302 0.573175L5.46635 4.52651C5.52934 4.58825 5.57946 4.66188 5.61379 4.74313C5.64812 4.82438 5.66599 4.91164 5.66635 4.99984C5.66599 5.08805 5.64812 5.1753 5.61379 5.25655C5.57946 5.3378 5.52934 5.41143 5.46635 5.47318L1.51302 9.42651C1.45127 9.4895 1.37764 9.53961 1.29639 9.57395C1.21514 9.60828 1.12789 9.62614 1.03968 9.62651Z"
                                                fill="#A1A5B7"
                                              />
                                            </svg>
                                          </span>
                                          {subPosition.title}
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                          {actions.map((action) => (
                                            <>
                                              {action.type === "delete" && (
                                                <div className="w-6 h-6 rounded-md bg-custom-gray-light flex items-center justify-center cursor-pointer" onClick={() => deleteHandler(subPosition.id)}>
                                                  <svg
                                                    width="17"
                                                    height="17"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <g opacity="0.3">
                                                      <path
                                                        d="M10.5797 14.6075L5.54634 14.6675C5.11031 14.6737 4.68845 14.5127 4.36736 14.2176C4.04626 13.9226 3.85029 13.5158 3.81968 13.0808L3.33301 6.12081C3.32556 6.01899 3.33946 5.91673 3.37381 5.82058C3.40816 5.72444 3.46221 5.63652 3.5325 5.56247C3.60278 5.48842 3.68776 5.42986 3.78198 5.39054C3.8762 5.35123 3.9776 5.33202 4.07967 5.33414H11.9197C12.0211 5.33209 12.1219 5.35113 12.2157 5.39004C12.3094 5.42896 12.3941 5.48691 12.4642 5.56022C12.5344 5.63354 12.5886 5.72063 12.6234 5.81598C12.6582 5.91132 12.6728 6.01286 12.6663 6.11414L12.273 12.9941C12.2492 13.4281 12.0608 13.8367 11.7461 14.1365C11.4315 14.4363 11.0143 14.6047 10.5797 14.6075Z"
                                                        fill="#A1A5B7"
                                                      />
                                                    </g>
                                                    <path
                                                      d="M9.487 9.06641H6.51367C6.38106 9.06641 6.25389 9.01373 6.16012 8.91996C6.06635 8.82619 6.01367 8.69901 6.01367 8.56641C6.01367 8.4338 6.06635 8.30662 6.16012 8.21285C6.25389 8.11908 6.38106 8.06641 6.51367 8.06641H9.487C9.61961 8.06641 9.74679 8.11908 9.84056 8.21285C9.93433 8.30662 9.987 8.4338 9.987 8.56641C9.987 8.69901 9.93433 8.82619 9.84056 8.91996C9.74679 9.01373 9.61961 9.06641 9.487 9.06641Z"
                                                      fill="#A1A5B7"
                                                    />
                                                    <path
                                                      d="M8.96654 11.5332H7.0332C6.90059 11.5332 6.77342 11.4805 6.67965 11.3868C6.58588 11.293 6.5332 11.1658 6.5332 11.0332C6.5332 10.9006 6.58588 10.7734 6.67965 10.6796C6.77342 10.5859 6.90059 10.5332 7.0332 10.5332H8.96654C9.09914 10.5332 9.22632 10.5859 9.32009 10.6796C9.41386 10.7734 9.46654 10.9006 9.46654 11.0332C9.46654 11.1658 9.41386 11.293 9.32009 11.3868C9.22632 11.4805 9.09914 11.5332 8.96654 11.5332Z"
                                                      fill="#A1A5B7"
                                                    />
                                                    <path
                                                      d="M13.4999 4.7738H13.4266C9.82798 4.27899 6.17856 4.27899 2.57994 4.7738C2.45102 4.79078 2.32056 4.75687 2.21624 4.67926C2.11191 4.60166 2.04191 4.48647 2.0211 4.35812C2.00028 4.22976 2.03029 4.09835 2.10475 3.99176C2.17921 3.88516 2.29226 3.81176 2.41994 3.78713C6.11947 3.26627 9.87373 3.26627 13.5733 3.78713C13.6965 3.80737 13.8077 3.87301 13.885 3.97114C13.9623 4.06927 14.0001 4.19277 13.9909 4.31734C13.9817 4.44191 13.9262 4.55852 13.8353 4.64424C13.7445 4.72995 13.6248 4.77855 13.4999 4.78047V4.7738Z"
                                                      fill="#A1A5B7"
                                                    />
                                                    <path
                                                      d="M10.6663 3.89398H5.33301L5.63301 2.34732C5.68647 2.0664 5.83489 1.81241 6.05336 1.62792C6.27184 1.44342 6.54711 1.33965 6.83301 1.33398H9.18634C9.47744 1.33509 9.75908 1.43749 9.98292 1.62361C10.2067 1.80974 10.3588 2.06797 10.413 2.35398L10.6663 3.89398Z"
                                                      fill="#A1A5B7"
                                                    />
                                                  </svg>
                                                </div>
                                              )}
                                              {action.type === "edit" && (
                                                <div className="w-6 h-6 rounded-md bg-custom-gray-light flex items-center justify-center cursor-pointer" onClick={() => openModalHandler("edit", subPosition.id)}>
                                                  <svg
                                                    width="17"
                                                    height="17"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      opacity="0.3"
                                                      d="M14.2667 5.56754L12.8334 7.00754L8.99337 3.16754L10.4334 1.73421C10.5577 1.60516 10.7069 1.50252 10.8718 1.43241C11.0368 1.36231 11.2141 1.32617 11.3934 1.32617C11.5726 1.32617 11.75 1.36231 11.9149 1.43241C12.0799 1.50252 12.229 1.60516 12.3534 1.73421L14.2667 3.64754C14.3957 3.77192 14.4984 3.92104 14.5685 4.08598C14.6386 4.25093 14.6747 4.42831 14.6747 4.60754C14.6747 4.78677 14.6386 4.96415 14.5685 5.1291C14.4984 5.29404 14.3957 5.44316 14.2667 5.56754ZM2.46003 14.6209L6.59337 13.2475L2.75337 9.40754L1.38003 13.5409C1.3297 13.6913 1.32229 13.8528 1.35865 14.0072C1.39501 14.1616 1.4737 14.3029 1.58587 14.415C1.69805 14.5272 1.83927 14.6059 1.99368 14.6423C2.1481 14.6786 2.30959 14.6712 2.46003 14.6209Z"
                                                      fill="#A1A5B7"
                                                    />
                                                    <path
                                                      d="M3.71337 14.2013L2.46003 14.6213C2.30959 14.6716 2.1481 14.679 1.99368 14.6427C1.83927 14.6063 1.69805 14.5276 1.58587 14.4155C1.4737 14.3033 1.39501 14.1621 1.35865 14.0077C1.32229 13.8532 1.3297 13.6917 1.38003 13.5413L1.80003 12.288L3.71337 14.2013ZM2.75337 9.40797L6.59337 13.248L12.8334 7.00797L8.99337 3.16797L2.75337 9.40797Z"
                                                      fill="#A1A5B7"
                                                    />
                                                  </svg>
                                                </div>
                                              )}
                                              {action.type === "add" && (
                                                <div
                                                  className="w-6 h-6 rounded-md bg-custom-gray-light flex items-center justify-center cursor-pointer"
                                                  onClick={() =>
                                                    openModalHandler(
                                                      "create",
                                                      positionGroup.id
                                                    )
                                                  }
                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="15"
                                                    height="15"
                                                    viewBox="0 0 10 10"
                                                    fill="none"
                                                  >
                                                    <path
                                                      d="M9.16667 4.16667H5.83333V0.833333C5.83333 0.61232 5.74554 0.400358 5.58926 0.244078C5.43297 0.0877975 5.22101 0 5 0C4.77899 0 4.56702 0.0877975 4.41074 0.244078C4.25446 0.400358 4.16667 0.61232 4.16667 0.833333V4.16667H0.833333C0.61232 4.16667 0.400358 4.25446 0.244078 4.41074C0.0877975 4.56702 0 4.77899 0 5C0 5.22101 0.0877975 5.43297 0.244078 5.58926C0.400358 5.74554 0.61232 5.83333 0.833333 5.83333H4.16667V9.16667C4.16667 9.38768 4.25446 9.59964 4.41074 9.75592C4.56702 9.9122 4.77899 10 5 10C5.22101 10 5.43297 9.9122 5.58926 9.75592C5.74554 9.59964 5.83333 9.38768 5.83333 9.16667V5.83333H9.16667C9.38768 5.83333 9.59964 5.74554 9.75592 5.58926C9.9122 5.43297 10 5.22101 10 5C10 4.77899 9.9122 4.56702 9.75592 4.41074C9.59964 4.25446 9.38768 4.16667 9.16667 4.16667Z"
                                                      fill="#A1A5B7"
                                                    />
                                                  </svg>
                                                </div>
                                              )}
                                            </>
                                          ))}
                                        </div>
                                      </div>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        </li>
                      )
                  )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
