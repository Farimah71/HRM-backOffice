import { useTranslation } from "react-i18next";
import { Button } from "../../../../components";

export const SearchModal = ({ infoEmployee, onCloseModal, onClick }) => {
  // ---------- hooks ----------
  const { t } = useTranslation();

  // ----------- render JSX -------------
  return (
    <>
      <div className="flex items-center justify-between p-4 select-none border-b rounded-lg border-custom-gray-light dark:bg-dark_custom-average-black">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white">
          {t("page_title.search_result")}
        </h4>
        <div
          className="cursor-pointer dark:text-dark_custom-full-white"
          onClick={onCloseModal}
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
      <div className="overflow-y-auto">
        {infoEmployee.map((employee) => (
          <div className="p-4 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-custom-gray-light">
            <div className="flex justify-between">
              <p className="text-16 dark:text-dark_custom-light-white">
                <span className="text-custom-gray-muted dark:text-dark_custom-full-white">
                  {t("text.name")}:
                </span>{" "}
                {employee.name} {employee.family}
              </p>
              <p className="text-16 dark:text-dark_custom-light-white">
                <span className="text-custom-gray-muted dark:text-dark_custom-full-white">
                  {t("text.mobile")}:
                </span>{" "}
                {employee.phoneNumber}
              </p>
              <p className="text-16 dark:text-dark_custom-light-white">
                <span className="text-custom-gray-muted dark:text-dark_custom-full-white">
                  {t("text.email")}:
                </span>{" "}
                {employee.email}
              </p>
            </div>
            <div
              className="mt-8 flex items-start gap-4 flex-wrap"
              key={employee.id}
            >
              {employee.candidatePositions.length ? (
                employee.candidatePositions.map((candidatePosition) => (
                  <div className="rounded-md border-2 border-custom-gray-light py-2 px-4 flex flex-col items-start gap-y-2 w-52">
                    <p className="text-14 dark:text-dark_custom-full-white">
                      {candidatePosition.companyPosition.title}
                    </p>
                    <p className="text-14 dark:text-dark_custom-full-white">
                      {candidatePosition.companyPosition.company.title}
                    </p>
                    <p className="text-14 bg-custom-gray-medium p-1 rounded-md">
                      {candidatePosition.candidatePositionStatus.title}
                    </p>
                    <Button
                      title={t("button.select_title")}
                      theme="light"
                      classes="!text-14 !px-1 h-auto py-1 w-full"
                      onClick={() =>
                        onClick(
                          candidatePosition.companyPosition.companyId,
                          candidatePosition.companyPosition.companyProjectId,
                          candidatePosition.companyPosition.id
                        )
                      }
                    />
                  </div>
                ))
              ) : (
                <p className="text-14 text-red-400 bg-red-50 p-1 rounded-md">
                  No Candidate Positions
                </p>
              )}
            </div>
          </div>
        ))}
        {infoCandidate.length === 0 && (
          <div className="dark:text-dark_custom-full-white p-10 m-auto text-center">
            {t("text.nothing_found")}
          </div>
        )}
      </div>
    </>
  );
};
