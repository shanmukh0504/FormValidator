import React from "react";
import { useForm } from "../contexts/FormContext";

type SelectInputProps = {
  label?: string;
  options?: { value: string; label: string }[];
  className?: string;
  required?: boolean;
};

const SelectInput: React.FC<SelectInputProps> = ({
  label = "Select Value",
  options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ],
  className,
  required = false,
}) => {
  const {
    formData,
    handleChange,
    handleBlur,
    handleFocus,
    errors,
    touchedFields,
  } = useForm();

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name="selectOption"
        value={formData.selectOption || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={`${className} block w-full px-4 py-2 text-base border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          touchedFields.selectOption && errors.selectOption
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : ""
        }`}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {touchedFields.selectOption && errors.selectOption && (
        <p className="text-red-500 text-sm">{errors.selectOption}</p>
      )}
    </div>
  );
};

export default SelectInput;
