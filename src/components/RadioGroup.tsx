import React from "react";

type RadioOption = {
  value: string;
  label: string;
};

type RadioGroupProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  options?: RadioOption[];
  label?: string;
  required?: boolean;
};

const defaultOptions: RadioOption[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onChange,
  error,
  options,
  className,
  label = "Gender",
  required = false,
}) => {
  const radioOptions = options || defaultOptions;
  
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-semibold">{label} {required && <span className="text-red-500">*</span>}</label>
      <div className="flex space-x-4">
        {radioOptions.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="radio"
              name="radio"
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className={`${className} form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300`}
              required = {required}
            />
            <span className="ml-2">{option.label}</span>
          </label>
        ))} 
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default RadioGroup;
