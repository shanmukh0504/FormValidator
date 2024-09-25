import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utils/validators";

export type FormData = {
  username?: string;
  email?: string;
  password?: string;
  reenterPassword?: string;
  radio?: string;
  files?: FileList | null;
};

const useFormContext = (
  initialValues: FormData,
  validationRules?: Record<keyof FormData, { minLength?: number; maxLength?: number }>
) => {
  const [formData, setFormData] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const validateField = debounce((name: keyof FormData, value: any) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (value.trim() === "") {
        delete newErrors[name];
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
              newErrors[name] = passwordValidation.message;
            } else {
              delete newErrors[name];
            }
            break;
          case "reenterPassword":
            if (value !== formData.password) {
              newErrors[name] = "Passwords do not match.";
            } else {
              delete newErrors[name];
            }
            break;
          case "radio":
            if (!["male", "female", "other"].includes(value)) {
              newErrors[name] = "Please select a valid option.";
            } else {
              delete newErrors[name];
            }
            break;
          default:
            break;
        }
      }
      return newErrors;
    });
  }, 300);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: any } }
  ) => {
    if ("target" in e && e.target instanceof HTMLInputElement) {
      const { name, type, value, files } = e.target;

      if (type === "file") {
        setFormData((prev) => ({
          ...prev,
          [name]: files || null,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
        validateField(name as keyof FormData, value);
      }
    }
  };

  const handleSubmit = () => {
    if (Object.keys(errors).length === 0) {
      console.log(formData);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    validateField(name as keyof FormData, formData[name as keyof FormData] || '');
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: false }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  useEffect(() => {
    return () => {
      validateField.cancel();
    };
  }, []);

  return {
    formData,
    errors,
    touchedFields,
    handleChange,
    handleBlur,
    handleFocus,
    handleSubmit
  };
};

export default useFormContext;
