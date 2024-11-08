import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromLocalStorage } from "../../helpers/get-data-from-local";
import { useState } from "react";
// ++++++++++ images import ++++++++++
import ArrowBottomIcon from "../../assets/icons/arrows/arrow-bottom.svg";

export const Navbar = () => {
  // ---------- hooks ----------
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ---------- variables ----------
  const lng = i18n.language;
  const menuItems = getDataFromLocalStorage("services");

  // ---------- state ----------
  const [isActiveMenu, setIsActiveMenu] = useState();

  // ---------- functions ----------
  const toggleMenuItem = (index) => {
    index !== isActiveMenu ? setIsActiveMenu(index) : setIsActiveMenu(null);
  };

  // ---------- render jsx ----------
  return (
    <nav className="flex flex-col px-4">
      <ul className="flex flex-col gap-y-1">
        <li className="rounded-11 h-12">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "block pl-5 text-16 rounded-md py-2 bg-custom-orange text-white dark:text-dark_custom-full-white dark:bg-dark_custom-full-black"
                : "block pl-5 text-16 rounded-md py-2 text-custom-dark dark:text-dark_custom-full-white"
            }
          >
            {t("navbar.dashboard_title")}
          </NavLink>
        </li>
        {menuItems.length > 0 &&
          menuItems.map((menuItem) =>
            menuItem.showInMenu && menuItem.isService ? (
              <li key={menuItem.serviceId}>
                <NavLink
                  to={menuItem.controller}
                  className={({ isActive }) =>
                    isActive
                      ? "block pl-5 text-16 rounded-md py-2 bg-custom-orange text-white dark:text-dark_custom-full-white dark:bg-dark_custom-full-black"
                      : "block pl-5 text-16 rounded-md py-2 text-custom-dark dark:text-dark_custom-full-white"
                  }
                >
                  {lng === "en" ? menuItem.titleEn : menuItem.titleTr}
                </NavLink>
              </li>
            ) : menuItem.showInMenu && menuItem.inverseParent.length > 0 ? (
              <li
                className="rounded-11 cursor-pointer dark:text-dark_custom-full-white"
                key={menuItem.serviceId}
              >
                <div
                  className="w-full pl-5 text-16 rounded-11 text-custom-dark flex items-center justify-between py-2 dark:text-dark_custom-full-white"
                  onClick={() => toggleMenuItem(menuItem.serviceId)}
                >
                  {lng === "en" ? menuItem.titleEn : menuItem.titleTr}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`duration-300 ease-in-out ${
                      menuItem.serviceId === isActiveMenu
                        ? "rotate-180"
                        : "rotate-0"
                    }`}
                  >
                    <path
                      d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
                      fill="#b6b9c8"
                    />
                  </svg>
                </div>
                <ul
                  className={`pl-3 flex flex-col gap-y-1 cursor-default ease-in-out duration-200 ${
                    menuItem.serviceId === isActiveMenu
                      ? "h-auto visible overflow-auto"
                      : "h-0 invisible overflow-hidden"
                  }`}
                >
                  {menuItem.inverseParent.map(
                    (subMenuItem) =>
                      subMenuItem.showInMenu && (
                        <li
                          className="text-16 mt-1"
                          key={subMenuItem.serviceId}
                        >
                          <NavLink
                            to={subMenuItem.controller}
                            className={({ isActive }) =>
                              isActive
                                ? "block pl-4 text-14 rounded-md py-2 bg-custom-orange text-white dark:text-dark_custom-light-white dark:bg-dark_custom-full-black"
                                : "block pl-4 text-14 rounded-md py-2 text-custom-gray-muted dark:text-dark_custom-light-white"
                            }
                          >
                            {lng === "en"
                              ? subMenuItem.titleEn
                              : subMenuItem.titleTr}
                          </NavLink>
                        </li>
                      )
                  )}
                </ul>
              </li>
            ) : null
          )}
      </ul>
    </nav>
  );
};
