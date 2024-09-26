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
  checkboxes?: string[];
  age?: number;
  satisfaction?: number;
  comments?: string;
  selectOption?: string;
  files?: FileList | null;
};

export type ValidationRules = {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
};

const useFormContext = (
  initialValues: FormData,
  initialValidationRules?: Record<keyof FormData, ValidationRules>
) => {
  const [formData, setFormData] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [validationRules, setValidationRulesState] = useState<
    Record<keyof FormData, ValidationRules>
  >(() => initialValidationRules || {} as Record<keyof FormData, ValidationRules>);
  
  const setValidationRules = debounce((field: keyof FormData, rules: ValidationRules) => {
    setValidationRulesState((prev) => ({
      ...prev,
      [field]: rules,
    }));
  }, 300);

  const validateField = debounce((name: keyof FormData, value: any) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      const minLength = validationRules[name]?.minLength || 5;
      const maxLength = validationRules[name]?.maxLength || 15;
      const min = validationRules[name]?.min || 1;
      const max = validationRules[name]?.max || 100;
      if (value.trim() === "") {
        delete newErrors[name];
      } else {
        switch (name) {
          case "username":
            const usernameValidation = validateUsername(value, minLength, maxLength);
            if (!usernameValidation.valid) {
              newErrors[name] = usernameValidation.message;
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
          case "age":
            if (value < min || value > max) {
              newErrors[name] = `Age must be between ${min} and ${max}.`;
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, type, value } = e.target;

    if (e.target instanceof HTMLInputElement) {
      const { checked, files } = e.target;

      if (type === "file") {
        setFormData((prev) => ({
          ...prev,
          [name]: files || null,
        }));
      } else if (type === "checkbox") {
        const updatedCheckboxes = formData.checkboxes || [];
        if (checked) {
          updatedCheckboxes.push(value);
        } else {
          const index = updatedCheckboxes.indexOf(value);
          if (index > -1) {
            updatedCheckboxes.splice(index, 1);
          }
        }
        setFormData((prev) => ({
          ...prev,
          [name]: updatedCheckboxes,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    validateField(name as keyof FormData, value);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    validateField(name as keyof FormData, formData[name as keyof FormData] || "");
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
    handleSubmit: () => {
      if (Object.keys(errors).length === 0) {
        console.log(formData);
      }
    },
    setValidationRules,
  };
};

export default useFormContext;
