import React from "react";
import { useForm } from "../context/FormContext";

const ReenterPasswordInput: React.FC = () => {
  const { formData, handleChange, handleBlur, handleFocus, errors, touchedFields } = useForm();

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-semibold">
        Re-enter Password <span className="text-red-500">*</span>
      </label>
      <input
        type="password"
        name="reenterPassword"
        placeholder="Re-enter your password"
        className={`block w-full px-4 py-2 text-base border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${touchedFields.reenterPassword && errors.reenterPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
        value={formData.reenterPassword || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required
      />
      {touchedFields.reenterPassword && errors.reenterPassword && <p className="text-red-500 text-sm">{errors.reenterPassword}</p>}
    </div>
  );
};

export default ReenterPasswordInput;