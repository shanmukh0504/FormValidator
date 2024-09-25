import React from "react";
import { useForm } from "../context/FormContext";

const PasswordInput: React.FC = () => {
  const { formData, handleChange, handleBlur, handleFocus, errors, touchedFields } = useForm();

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-semibold">
        Password <span className="text-red-500">*</span>
      </label>
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        className={`block w-full px-4 py-2 text-base border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${touchedFields.password && errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
        value={formData.password || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required
      />
      {touchedFields.password && errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
    </div>
  );
};

export default PasswordInput;