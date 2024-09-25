import React, { useState } from "react";
import { debounce } from "lodash";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "./validators";

// Type for form data
type FormData = {
  username?: string;
  email?: string;
  password?: string;
  reenterPassword?: string;
};

type ValidatorProps = {
  username?: boolean;
  email?: boolean;
  password?: boolean;
  reenterPassword?: boolean;
  onSubmit: (values: FormData) => void;
};

const FormValidator: React.FC<ValidatorProps> = ({
  username,
  email,
  password,
  reenterPassword,
  onSubmit,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    reenterPassword: "",
  });
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name as keyof FormData, value);
  };

  // Handle input blur (when user leaves the input field)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouchedFields({ ...touchedFields, [name]: true });
    validateField(
      name as keyof FormData,
      formData[name as keyof FormData] || ""
    );
  };

  // Handle input focus (to clear the error message)
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouchedFields({ ...touchedFields, [name]: false });
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  // Validation logic
  const validateField = debounce((name: keyof FormData, value: string) => {
    const newErrors = { ...errors };

    if (value.trim() === "") {
      delete newErrors[name]; // If the field is empty, remove the error
    } else {
      switch (name) {
        case "username":
          if (!validateUsername(value)) {
            newErrors[name] = "Username must be between 5 and 15 characters.";
          } else {
            delete newErrors[name];
          }
          break;

        case "email":
          if (!validateEmail(value)) {
            newErrors[name] = "Please enter a valid email address.";
          } else {
            delete newErrors[name];
          }
          break;

        case "password":
          const passwordValidation = validatePassword(value);
          if (!passwordValidation.valid) {
            newErrors[name] = passwordValidation.message; // Use the message from the validator
          } else {
            delete newErrors[name]; // Clear the error if valid
          }
          break;

        case "reenterPassword":
          if (value !== formData.password) {
            newErrors[name] = "Passwords do not match.";
          } else {
            delete newErrors[name];
          }
          break;
      }
    }
    setErrors(newErrors);
  }, 300);

  // CSS classes for input based on error state
  const getInputClass = (name: keyof FormData) => {
    const baseClass =
      "block w-full px-4 py-2 text-base border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
    return touchedFields[name] && errors[name]
      ? `${baseClass} border-red-500 focus:ring-red-500 focus:border-red-500`
      : baseClass;
  };

  return (
    <form
      className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      {username && (
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className={getInputClass("username")}
            value={formData.username || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus} // Clear error on focus
            required
          />
          {touchedFields.username && errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>
      )}
      {email && (
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className={getInputClass("email")}
            value={formData.email || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus} // Clear error on focus
            required
          />
          {touchedFields.email && errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
      )}
      {password && (
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className={getInputClass("password")}
            value={formData.password || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus} // Clear error on focus
            required
          />
          {touchedFields.password && errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
      )}
      {reenterPassword && (
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold">
            Re-enter Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="reenterPassword"
            placeholder="Re-enter your password"
            className={getInputClass("reenterPassword")}
            value={formData.reenterPassword || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus} // Clear error on focus
            required
          />
          {touchedFields.reenterPassword && errors.reenterPassword && (
            <p className="text-red-500 text-sm">{errors.reenterPassword}</p>
          )}
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition ease-in-out duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default FormValidator;
