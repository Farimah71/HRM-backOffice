export const TextInput = ({
  field,
  type,
  placeholder,
  label,
  classes,
  disabled,
  onChange,
  readOnly,
  complex,
  theme,
}) => {
  // ---------- render jsx ----------
  return (
    <div className="w-full">
      <label className="text-14 text-custom-dark font-medium capitalize dark:text-dark_custom-full-white">
        {label}
      </label>
      <input
        {...field}
        type={type}
        onKeyUp={(e) => onChange && onChange(e)}
        onKeyDown={(e) =>
          !complex && e.key >= 0 && e.key <= 9 && e.preventDefault()
        }
        placeholder={placeholder}
        className={`w-full h-10 bg-white rounded-md border read-only:bg-slate-50 read-only:cursor-default border-custom-gray ${
          theme === "light"
            ? "disabled:bg-slate-100"
            : "disabled:dark:bg-[#495057]"
        } dark:bg-dark_custom-average-black text-custom-dark text-14 placeholder:text-14 placeholder:text-custom-gray-muted p-2 outline-none dark:placeholder:text-dark_custom-gray-muted dark:text-dark_custom-full-white ${classes} : ${
          label && "mt-2"
        }`}
        disabled={disabled}
        readOnly={readOnly}
      />
    </div>
  );
};
