// /components/CheckBoxGroup.tsx
import React from "react";
import { useForm } from "../contexts/FormContext";

type CheckBoxGroupProps = {
  label?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  className?: string;
};

const CheckBoxGroup: React.FC<CheckBoxGroupProps> = ({
  label = "Select Options",
  options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ],
  className,
  required = false,
}) => {
  const { formData, handleChange, errors, touchedFields } = useForm();

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="checkbox"
              name="checkboxes"
              value={option.value}
              checked={formData.checkboxes?.includes(option.value) || false}
              onChange={handleChange}
              className={`${className} form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500`}
            />
            <span className="ml-2">{option.label}</span>
          </label>
        ))}
      </div>
      {touchedFields.checkboxes && errors.checkboxes && (
        <p className="text-red-500 text-sm">{errors.checkboxes}</p>
      )}
    </div>
  );
};

export default CheckBoxGroup;
