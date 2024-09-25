import React from "react";
import { useForm } from "../contexts/FormContext";

const defaultOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const RadioGroup: React.FC = () => {
  const { formData, handleChange, errors, touchedFields } = useForm();
  const radioOptions = defaultOptions;

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-semibold">
        Gender <span className="text-red-500">*</span>
      </label>
      <div className="flex space-x-4">
        {radioOptions.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="radio"
              name="radio"
              value={option.value}
              checked={formData.radio === option.value}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              required
            />
            <span className="ml-2">{option.label}</span>
          </label>
        ))}
      </div>
      {touchedFields.radio && errors.radio && (
        <p className="text-red-500 text-sm">{errors.radio}</p>
      )}
    </div>
  );
};

export default RadioGroup;
