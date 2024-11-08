import { useTranslation } from "react-i18next";
import { FaAngleRight } from "react-icons/fa";

export const Quit = ({ data, handleChangeStatus, onCloseModal }) => {
  // --------- hook -----------
  const { t } = useTranslation();

  // --------- return jsx -----------
  return (
    <div className="w-full p-4">
      <div className="flex justify-between gap-y-1 mb-5">
        <h4 className="text-19 text-custom-dark font-bold dark:text-dark_custom-full-white">
          {t("page_title.employee_quit")}
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
      <div className="flex flex-col py-4 gap-4">
        <div
          className="group flex justify-between items-center cursor-pointer py-4 px-2 rounded-10 hover:bg-gray-100 dark:hover:bg-dark_custom-average-black"
          onClick={() => {
            handleChangeStatus(data.candidatePositionId, "position");
            onCloseModal();
          }}
        >
          <p className="dark:text-dark_custom-full-white">
            {t("popup.quit_from_position")}
          </p>
          <div>
            <FaAngleRight className="w-5 h-5 hidden group-hover:block text-gray-400 dark:text-gray-200" />
          </div>
        </div>
        <div
          className="group flex justify-between items-center cursor-pointer py-4 px-2 rounded-10 hover:bg-gray-100 dark:hover:bg-dark_custom-average-black"
          onClick={() => {
            handleChangeStatus(data.candidatePositionId, "company");
            onCloseModal();
          }}
        >
          <p className="dark:text-dark_custom-full-white">
            {t("popup.quit_from_company")}
          </p>
          <FaAngleRight className="w-5 h-5 hidden group-hover:block text-gray-400 dark:text-gray-200" />
        </div>
      </div>
    </div>
  );
};
