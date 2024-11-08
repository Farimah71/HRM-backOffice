// import { CiCalendarDate } from "react-icons/ci";
import { useSelector } from "react-redux";
import { TextInput } from "./text-input";
import { NumberInput } from "./number-input";

export const Input = ({
  field,
  placeholder,
  label,
  type = "text",
  classes,
  disabled,
  onChange,
  readOnly = false,
  complex,
}) => {
  // ----------store----------
  let theme = useSelector((state) => state.themeSlice.theme);

  // ---------- render jsx ----------
  // if (type === "date") {
  //   return (
  //     <div className="w-full">
  //       <label className="text-14 text-custom-dark font-medium capitalize dark:text-dark_custom-full-white">
  //         {label}
  //       </label>
  //       <div className="flex items-center border border-custom-gray rounded-md mt-2 overflow-hidden pr-2">
  //         <input
  //           {...field}
  //           type={"text"}
  //           onKeyUp={(e) => onChange && onChange(e)}
  //           placeholder={placeholder}
  //           className={`w-full h-10 bg-white read-only:bg-slate-50 read-only:cursor-default  text-custom-dark text-14 placeholder:text-14 placeholder:text-custom-gray-muted p-2 outline-none dark:bg-dark_custom-average-black dark:placeholder:text-dark_custom-gray-muted dark:text-dark_custom-full-white ${classes} : ${
  //             label && ""
  //           }`}
  //           disabled={disabled}
  //           readOnly={readOnly}
  //         />
  //         <CiCalendarDate className="w-6 h-6 dark:text-dark_custom-full-white" />
  //       </div>
  //     </div>
  //   );
  // } else {
  return (
    <>
      {type === "textarea" ? (
        <div>
          <label className="text-14 text-custom-dark font-medium capitalize dark:text-dark_custom-full-white">
            {label}
          </label>
          <textarea
            {...field}
            className={`w-full bg-white resize-none border border-custom-gray rounded-md text-16 ${
              theme === "light"
                ? "disabled:bg-slate-100"
                : "disabled:dark:bg-[#495057]"
            } bg-dark_custom-average-black placeholder:text-14 text-custom-dark p-2 mt-2 outline-none ${classes} dark:bg-dark_custom-average-black dark:placeholder:text-dark_custom-gray-muted dark:text-dark_custom-full-white`}
            placeholder={placeholder}
            rows={5}
            disabled={disabled}
            readOnly={readOnly}
          />
        </div>
      ) : type === "number" ? (
        <NumberInput
          field={field}
          onChange={onChange}
          placeholder={placeholder}
          label={label}
          readOnly={readOnly}
          disabled={disabled}
          classes={classes}
          theme={theme}
        />
      ) : (
        <TextInput
          field={field}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          label={label}
          complex={complex}
          readOnly={readOnly}
          disabled={disabled}
          classes={classes}
          theme={theme}
        />
      )}
    </>
  );
};
// };
