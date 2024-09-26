// /components/TextInput.tsx
import React from "react";
import { useForm } from "../contexts/FormContext";

type TextInputProps = {
  label?: string;
  className?: string;
  required?: boolean;
};

const TextInput: React.FC<TextInputProps> = ({
  label = "Comments",
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
      <textarea
        name="comments"
        placeholder={`Enter ${label}`}
        className={`${className} block w-full px-4 py-2 text-base border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          touchedFields.comments && errors.comments
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : ""
        }`}
        value={formData.comments || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required={required}
      />
      {touchedFields.comments && errors.comments && (
        <p className="text-red-500 text-sm">{errors.comments}</p>
      )}
    </div>
  );
};

export default TextInput;
