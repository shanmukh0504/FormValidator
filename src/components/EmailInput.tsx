import React from "react";
import { useForm } from "../context/FormContext";

const EmailInput: React.FC = () => {
  const { formData, handleChange, handleBlur, handleFocus, errors, touchedFields } = useForm();

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-semibold">
        Email <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        className={`block w-full px-4 py-2 text-base border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          touchedFields.email && errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
        }`}
        value={formData.email || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required
      />
      {touchedFields.email && errors.email && (
        <p className="text-red-500 text-sm">{errors.email}</p>
      )}
    </div>
  );
};

export default EmailInput;