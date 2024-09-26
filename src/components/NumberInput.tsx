import React, { useEffect } from "react";
import { useForm } from "../contexts/FormContext";

type NumberInputProps = {
  label?: string;
  min?: number;
  max?: number;
  className?: string;
  required?: boolean;
};

const NumberInput: React.FC<NumberInputProps> = ({
  label = "Enter your age",
  min = 1,
  max = 100,
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
    setValidationRules,
  } = useForm();

  useEffect(() => {
    setValidationRules("age", { min, max });
  }, [min, max, setValidationRules]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="number"
        name="age"
        min={min}
        max={max}
        placeholder={`Enter ${label}`}
        className={`${className} block w-full px-4 py-2 text-base border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          touchedFields.age && errors.age
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : ""
        }`}
        value={formData.age || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required={required}
      />
      {touchedFields.age && errors.age && (
        <p className="text-red-500 text-sm">{errors.age}</p>
      )}
    </div>
  );
};

export default NumberInput;
