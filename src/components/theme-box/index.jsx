import { useState } from "react";
import { useTranslation } from "react-i18next";
// ++++++++++ images import ++++++++++
import DarkModeIcon from "../../assets/images/dark-mode.png";
import { useRef } from "react";
import { useComponentToggle } from "../../hooks/useComponentToggle";
import { useDispatch } from "react-redux";
import { setDarkTheme, setLightTheme } from "../../redux/reducers/theme";

export const ThemeBox = () => {
  // ---------- state ----------
  const ref = useRef(null);
  const [activeTheme, setActiveTheme] = useState("light");
  const [isShowBox, setIsShowBox] = useState(false);

  // ---------- functions ----------
  const toggleTheme = (title) => {
    setActiveTheme(title);
    setIsShowBox(false);
  };
  const onClickOutside = () => setIsShowBox(false);
  const toggleThemeBox = () => setIsShowBox((currState) => !currState);

  // ---------- hooks ----------
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  useComponentToggle(ref, onClickOutside);
  const dispatch = useDispatch();

  // ---------- render jsx ----------
  return (
    <div className="flex items-center gap-x-1 relative cursor-pointer">
      <div onClick={toggleThemeBox}>
        {activeTheme === "light" ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.00062 2.52562C7.85772 2.52594 7.72004 2.47185 7.61557 2.37434C7.5111 2.27684 7.44765 2.14322 7.43812 2.00062V1.07812C7.43812 0.928941 7.49739 0.785867 7.60288 0.680377C7.70837 0.574888 7.85144 0.515625 8.00062 0.515625C8.14981 0.515625 8.29288 0.574888 8.39837 0.680377C8.50386 0.785867 8.56312 0.928941 8.56312 1.07812V2.00062C8.5536 2.14322 8.49015 2.27684 8.38568 2.37434C8.28121 2.47185 8.14353 2.52594 8.00062 2.52562ZM8.56312 14.9231V14.0381C8.56312 13.8889 8.50386 13.7459 8.39837 13.6404C8.29288 13.5349 8.14981 13.4756 8.00062 13.4756C7.85144 13.4756 7.70837 13.5349 7.60288 13.6404C7.49739 13.7459 7.43812 13.8889 7.43812 14.0381V14.9231C7.43812 15.0723 7.49739 15.2154 7.60288 15.3209C7.70837 15.4264 7.85144 15.4856 8.00062 15.4856C8.14981 15.4856 8.29288 15.4264 8.39837 15.3209C8.50386 15.2154 8.56312 15.0723 8.56312 14.9231ZM4.13063 4.13062C4.23596 4.02516 4.29513 3.88219 4.29513 3.73312C4.29513 3.58406 4.23596 3.44109 4.13063 3.33562L3.50063 2.75062C3.39566 2.70049 3.27773 2.68414 3.16309 2.70381C3.04844 2.72348 2.94271 2.77821 2.86046 2.86046C2.77821 2.94271 2.72348 3.04844 2.70381 3.16309C2.68414 3.27773 2.70049 3.39566 2.75063 3.50062L3.37313 4.12312C3.47859 4.22846 3.62156 4.28763 3.77063 4.28763C3.91969 4.28763 4.06266 4.22846 4.16812 4.12312L4.13063 4.13062ZM13.2881 13.2956C13.3412 13.2439 13.3834 13.1821 13.4122 13.1138C13.441 13.0456 13.4558 12.9722 13.4558 12.8981C13.4558 12.824 13.441 12.7507 13.4122 12.6824C13.3834 12.6141 13.3412 12.5523 13.2881 12.5006L12.6656 11.8706C12.6141 11.8154 12.552 11.771 12.483 11.7403C12.414 11.7095 12.3395 11.693 12.264 11.6917C12.1885 11.6903 12.1135 11.7042 12.0434 11.7325C11.9734 11.7608 11.9098 11.8029 11.8563 11.8563C11.8029 11.9098 11.7608 11.9734 11.7325 12.0434C11.7042 12.1135 11.6903 12.1885 11.6917 12.264C11.693 12.3395 11.7095 12.414 11.7403 12.483C11.771 12.552 11.8154 12.6141 11.8706 12.6656L12.4931 13.2956C12.6003 13.3985 12.7421 13.4574 12.8906 13.4606C13.0398 13.4605 13.1827 13.4011 13.2881 13.2956ZM2.52562 8.00062C2.52594 7.85772 2.47185 7.72004 2.37435 7.61557C2.27684 7.51109 2.14322 7.44765 2.00063 7.43812H1.07812C0.928941 7.43812 0.785867 7.49739 0.680377 7.60288C0.574888 7.70837 0.515625 7.85144 0.515625 8.00062C0.515625 8.14981 0.574888 8.29288 0.680377 8.39837C0.785867 8.50386 0.928941 8.56312 1.07812 8.56312H2.00063C2.14322 8.5536 2.27684 8.49015 2.37435 8.38568C2.47185 8.2812 2.52594 8.14353 2.52562 8.00062ZM15.5006 8.00062C15.4987 7.85204 15.4388 7.7101 15.3337 7.60502C15.2287 7.49995 15.0867 7.44007 14.9381 7.43812H14.0381C13.8889 7.43812 13.7459 7.49739 13.6404 7.60288C13.5349 7.70837 13.4756 7.85144 13.4756 8.00062C13.4756 8.14981 13.5349 8.29288 13.6404 8.39837C13.7459 8.50386 13.8889 8.56312 14.0381 8.56312H14.9231C14.998 8.56412 15.0723 8.55035 15.1418 8.52262C15.2114 8.49489 15.2748 8.45373 15.3284 8.40149C15.382 8.34926 15.4248 8.28697 15.4544 8.21819C15.4839 8.14941 15.4996 8.07548 15.5006 8.00062ZM3.50063 13.2956L4.12313 12.6656C4.17839 12.6141 4.22272 12.552 4.25346 12.483C4.2842 12.414 4.30074 12.3395 4.30207 12.264C4.3034 12.1885 4.28951 12.1135 4.26122 12.0434C4.23293 11.9734 4.19082 11.9098 4.1374 11.8563C4.08399 11.8029 4.02036 11.7608 3.95032 11.7325C3.88028 11.7042 3.80526 11.6903 3.72973 11.6917C3.65421 11.693 3.57972 11.7095 3.51072 11.7403C3.44172 11.771 3.37962 11.8154 3.32812 11.8706L2.75063 12.5006C2.69756 12.5523 2.65538 12.6141 2.62658 12.6824C2.59778 12.7507 2.58295 12.824 2.58295 12.8981C2.58295 12.9722 2.59778 13.0456 2.62658 13.1138C2.65538 13.1821 2.69756 13.2439 2.75063 13.2956C2.85601 13.4011 2.99899 13.4605 3.14813 13.4606C3.28085 13.4469 3.40506 13.3887 3.50063 13.2956ZM12.6656 4.13062L13.2881 3.50062C13.3478 3.39184 13.3699 3.26636 13.3509 3.14372C13.3319 3.02108 13.2728 2.90818 13.183 2.82259C13.0931 2.737 12.9775 2.68353 12.854 2.67052C12.7306 2.6575 12.6064 2.68567 12.5006 2.75062L11.8781 3.37312C11.7728 3.47859 11.7136 3.62156 11.7136 3.77062C11.7136 3.91969 11.7728 4.06266 11.8781 4.16812C11.9836 4.27346 12.1266 4.33263 12.2756 4.33263C12.4247 4.33263 12.5677 4.27346 12.6731 4.16812L12.6656 4.13062ZM8.00062 3.78562C7.16698 3.78562 6.35205 4.03283 5.6589 4.49598C4.96574 4.95913 4.4255 5.61742 4.10647 6.38761C3.78745 7.1578 3.70398 8.0053 3.86661 8.82293C4.02925 9.64056 4.43069 10.3916 5.02017 10.9811C5.60965 11.5706 6.36069 11.972 7.17832 12.1346C7.99595 12.2973 8.84344 12.2138 9.61364 11.8948C10.3838 11.5758 11.0421 11.0355 11.5053 10.3424C11.9684 9.6492 12.2156 8.83427 12.2156 8.00062C12.2156 6.88274 11.7715 5.81064 10.9811 5.02017C10.1906 4.2297 9.11851 3.78562 8.00062 3.78562Z"
              fill="#99a1b7"
            />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.50465 6.19765C6.15473 5.47951 5.95925 4.69599 5.93083 3.89764C5.90241 3.09929 6.04168 2.30385 6.33965 1.56265C6.40782 1.38643 6.42289 1.19411 6.38302 1.00943C6.34315 0.824741 6.25008 0.65577 6.11528 0.523369C5.98049 0.390969 5.80988 0.300934 5.62451 0.264377C5.43914 0.227819 5.24712 0.246339 5.07215 0.317651C4.24313 0.634293 3.48018 1.10224 2.82215 1.69765C1.97268 2.48543 1.33377 3.47321 0.963621 4.57102C0.59347 5.66883 0.503834 6.8418 0.702873 7.98311C0.901913 9.12442 1.3833 10.1978 2.10321 11.1055C2.82312 12.0132 3.75866 12.7264 4.82465 13.1802C4.66736 12.5522 4.58677 11.9075 4.58465 11.2602C4.56685 9.39153 5.25218 7.58451 6.50465 6.19765Z"
              fill="#A1A5B7"
            />
            <g opacity="0.3">
              <path
                d="M11.7318 12.3698C12.283 11.9608 12.7686 11.4702 13.1718 10.9148C13.2829 10.7648 13.3485 10.5861 13.361 10.3999C13.3735 10.2137 13.3323 10.0278 13.2422 9.8643C13.1522 9.70083 13.0172 9.56663 12.8531 9.47764C12.6891 9.38865 12.5029 9.34861 12.3168 9.36227C11.1373 9.52155 9.93772 9.30055 8.89241 8.73136C7.84711 8.16217 7.01055 7.27447 6.50432 6.19727C5.25186 7.58412 4.56652 9.39115 4.58432 11.2598C4.58644 11.9071 4.66703 12.5518 4.82432 13.1798C5.94511 13.6646 7.17404 13.8451 8.38691 13.7029C9.59977 13.5606 10.7536 13.1008 11.7318 12.3698Z"
                fill="#A1A5B7"
              />
            </g>
          </svg>
        )}
      </div>

      <div
        className={`absolute bg-white w-32 rounded-md duration-200 ease-in-out right-[10px] p-2 shadow-custom-box flex flex-col gap-y-2 z-[100] ${
          isShowBox
            ? "visible opacity-100 top-full dark:bg-dark_custom-light-black"
            : "opacity-0 invisible top-[180%]"
        }`}
        ref={ref}
      >
        <div
          className="flex items-center gap-x-2 p-1 rounded-md duration-200 ease-in-out hover:bg-custom-gray-light cursor-pointer"
          onClick={() => {
            toggleTheme("light");
            document.body.classList.remove("dark");
            dispatch(setLightTheme());
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.00062 2.52562C7.85772 2.52594 7.72004 2.47185 7.61557 2.37434C7.5111 2.27684 7.44765 2.14322 7.43812 2.00062V1.07812C7.43812 0.928941 7.49739 0.785867 7.60288 0.680377C7.70837 0.574888 7.85144 0.515625 8.00062 0.515625C8.14981 0.515625 8.29288 0.574888 8.39837 0.680377C8.50386 0.785867 8.56312 0.928941 8.56312 1.07812V2.00062C8.5536 2.14322 8.49015 2.27684 8.38568 2.37434C8.28121 2.47185 8.14353 2.52594 8.00062 2.52562ZM8.56312 14.9231V14.0381C8.56312 13.8889 8.50386 13.7459 8.39837 13.6404C8.29288 13.5349 8.14981 13.4756 8.00062 13.4756C7.85144 13.4756 7.70837 13.5349 7.60288 13.6404C7.49739 13.7459 7.43812 13.8889 7.43812 14.0381V14.9231C7.43812 15.0723 7.49739 15.2154 7.60288 15.3209C7.70837 15.4264 7.85144 15.4856 8.00062 15.4856C8.14981 15.4856 8.29288 15.4264 8.39837 15.3209C8.50386 15.2154 8.56312 15.0723 8.56312 14.9231ZM4.13063 4.13062C4.23596 4.02516 4.29513 3.88219 4.29513 3.73312C4.29513 3.58406 4.23596 3.44109 4.13063 3.33562L3.50063 2.75062C3.39566 2.70049 3.27773 2.68414 3.16309 2.70381C3.04844 2.72348 2.94271 2.77821 2.86046 2.86046C2.77821 2.94271 2.72348 3.04844 2.70381 3.16309C2.68414 3.27773 2.70049 3.39566 2.75063 3.50062L3.37313 4.12312C3.47859 4.22846 3.62156 4.28763 3.77063 4.28763C3.91969 4.28763 4.06266 4.22846 4.16812 4.12312L4.13063 4.13062ZM13.2881 13.2956C13.3412 13.2439 13.3834 13.1821 13.4122 13.1138C13.441 13.0456 13.4558 12.9722 13.4558 12.8981C13.4558 12.824 13.441 12.7507 13.4122 12.6824C13.3834 12.6141 13.3412 12.5523 13.2881 12.5006L12.6656 11.8706C12.6141 11.8154 12.552 11.771 12.483 11.7403C12.414 11.7095 12.3395 11.693 12.264 11.6917C12.1885 11.6903 12.1135 11.7042 12.0434 11.7325C11.9734 11.7608 11.9098 11.8029 11.8563 11.8563C11.8029 11.9098 11.7608 11.9734 11.7325 12.0434C11.7042 12.1135 11.6903 12.1885 11.6917 12.264C11.693 12.3395 11.7095 12.414 11.7403 12.483C11.771 12.552 11.8154 12.6141 11.8706 12.6656L12.4931 13.2956C12.6003 13.3985 12.7421 13.4574 12.8906 13.4606C13.0398 13.4605 13.1827 13.4011 13.2881 13.2956ZM2.52562 8.00062C2.52594 7.85772 2.47185 7.72004 2.37435 7.61557C2.27684 7.51109 2.14322 7.44765 2.00063 7.43812H1.07812C0.928941 7.43812 0.785867 7.49739 0.680377 7.60288C0.574888 7.70837 0.515625 7.85144 0.515625 8.00062C0.515625 8.14981 0.574888 8.29288 0.680377 8.39837C0.785867 8.50386 0.928941 8.56312 1.07812 8.56312H2.00063C2.14322 8.5536 2.27684 8.49015 2.37435 8.38568C2.47185 8.2812 2.52594 8.14353 2.52562 8.00062ZM15.5006 8.00062C15.4987 7.85204 15.4388 7.7101 15.3337 7.60502C15.2287 7.49995 15.0867 7.44007 14.9381 7.43812H14.0381C13.8889 7.43812 13.7459 7.49739 13.6404 7.60288C13.5349 7.70837 13.4756 7.85144 13.4756 8.00062C13.4756 8.14981 13.5349 8.29288 13.6404 8.39837C13.7459 8.50386 13.8889 8.56312 14.0381 8.56312H14.9231C14.998 8.56412 15.0723 8.55035 15.1418 8.52262C15.2114 8.49489 15.2748 8.45373 15.3284 8.40149C15.382 8.34926 15.4248 8.28697 15.4544 8.21819C15.4839 8.14941 15.4996 8.07548 15.5006 8.00062ZM3.50063 13.2956L4.12313 12.6656C4.17839 12.6141 4.22272 12.552 4.25346 12.483C4.2842 12.414 4.30074 12.3395 4.30207 12.264C4.3034 12.1885 4.28951 12.1135 4.26122 12.0434C4.23293 11.9734 4.19082 11.9098 4.1374 11.8563C4.08399 11.8029 4.02036 11.7608 3.95032 11.7325C3.88028 11.7042 3.80526 11.6903 3.72973 11.6917C3.65421 11.693 3.57972 11.7095 3.51072 11.7403C3.44172 11.771 3.37962 11.8154 3.32812 11.8706L2.75063 12.5006C2.69756 12.5523 2.65538 12.6141 2.62658 12.6824C2.59778 12.7507 2.58295 12.824 2.58295 12.8981C2.58295 12.9722 2.59778 13.0456 2.62658 13.1138C2.65538 13.1821 2.69756 13.2439 2.75063 13.2956C2.85601 13.4011 2.99899 13.4605 3.14813 13.4606C3.28085 13.4469 3.40506 13.3887 3.50063 13.2956ZM12.6656 4.13062L13.2881 3.50062C13.3478 3.39184 13.3699 3.26636 13.3509 3.14372C13.3319 3.02108 13.2728 2.90818 13.183 2.82259C13.0931 2.737 12.9775 2.68353 12.854 2.67052C12.7306 2.6575 12.6064 2.68567 12.5006 2.75062L11.8781 3.37312C11.7728 3.47859 11.7136 3.62156 11.7136 3.77062C11.7136 3.91969 11.7728 4.06266 11.8781 4.16812C11.9836 4.27346 12.1266 4.33263 12.2756 4.33263C12.4247 4.33263 12.5677 4.27346 12.6731 4.16812L12.6656 4.13062ZM8.00062 3.78562C7.16698 3.78562 6.35205 4.03283 5.6589 4.49598C4.96574 4.95913 4.4255 5.61742 4.10647 6.38761C3.78745 7.1578 3.70398 8.0053 3.86661 8.82293C4.02925 9.64056 4.43069 10.3916 5.02017 10.9811C5.60965 11.5706 6.36069 11.972 7.17832 12.1346C7.99595 12.2973 8.84344 12.2138 9.61364 11.8948C10.3838 11.5758 11.0421 11.0355 11.5053 10.3424C11.9684 9.6492 12.2156 8.83427 12.2156 8.00062C12.2156 6.88274 11.7715 5.81064 10.9811 5.02017C10.1906 4.2297 9.11851 3.78562 8.00062 3.78562Z"
              fill="#A1A5B7"
            />
          </svg>
          <span className="text-custom-dark text-14 font-medium dark:text-white">
            Light
          </span>
        </div>
        <div
          className="flex items-center gap-x-2 p-1 rounded-md duration-200 ease-in-out hover:bg-custom-gray-light cursor-pointer"
          onClick={() => {
            toggleTheme("dark");
            document.body.classList.add("dark");
            dispatch(setDarkTheme());
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.50465 6.19765C6.15473 5.47951 5.95925 4.69599 5.93083 3.89764C5.90241 3.09929 6.04168 2.30385 6.33965 1.56265C6.40782 1.38643 6.42289 1.19411 6.38302 1.00943C6.34315 0.824741 6.25008 0.65577 6.11528 0.523369C5.98049 0.390969 5.80988 0.300934 5.62451 0.264377C5.43914 0.227819 5.24712 0.246339 5.07215 0.317651C4.24313 0.634293 3.48018 1.10224 2.82215 1.69765C1.97268 2.48543 1.33377 3.47321 0.963621 4.57102C0.59347 5.66883 0.503834 6.8418 0.702873 7.98311C0.901913 9.12442 1.3833 10.1978 2.10321 11.1055C2.82312 12.0132 3.75866 12.7264 4.82465 13.1802C4.66736 12.5522 4.58677 11.9075 4.58465 11.2602C4.56685 9.39153 5.25218 7.58451 6.50465 6.19765Z"
              fill="#A1A5B7"
            />
            <g opacity="0.3">
              <path
                d="M11.7318 12.3698C12.283 11.9608 12.7686 11.4702 13.1718 10.9148C13.2829 10.7648 13.3485 10.5861 13.361 10.3999C13.3735 10.2137 13.3323 10.0278 13.2422 9.8643C13.1522 9.70083 13.0172 9.56663 12.8531 9.47764C12.6891 9.38865 12.5029 9.34861 12.3168 9.36227C11.1373 9.52155 9.93772 9.30055 8.89241 8.73136C7.84711 8.16217 7.01055 7.27447 6.50432 6.19727C5.25186 7.58412 4.56652 9.39115 4.58432 11.2598C4.58644 11.9071 4.66703 12.5518 4.82432 13.1798C5.94511 13.6646 7.17404 13.8451 8.38691 13.7029C9.59977 13.5606 10.7536 13.1008 11.7318 12.3698Z"
                fill="#A1A5B7"
              />
            </g>
          </svg>
          <span className="text-custom-dark text-14 font-medium dark:text-white">
            Dark
          </span>
        </div>
      </div>
    </div>
  );
};
