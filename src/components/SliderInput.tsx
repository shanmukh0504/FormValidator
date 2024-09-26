import React from "react";
import { useForm } from "../contexts/FormContext";

type SliderInputProps = {
  label?: string;
  min?: number;
  max?: number;
  className?: string;
  required?: boolean;
};

const SliderInput: React.FC<SliderInputProps> = ({
  label = "Satisfation Level",
  min = 1,
  max = 100,
  className,
  required = false,
}) => {
  const { formData, handleChange, errors, touchedFields } = useForm();

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="range"
        name="satisfaction"
        min={min}
        max={max}
        value={formData.satisfaction || 50}
        onChange={handleChange}
        className={`${className} w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer`}
        required={required}
      />
      <div className="text-sm font-semibold">
        {formData.satisfaction || 50}%
      </div>
      {touchedFields.satisfaction && errors.satisfaction && (
        <p className="text-red-500 text-sm">{errors.satisfaction}</p>
      )}
    </div>
  );
};

export default SliderInput;
