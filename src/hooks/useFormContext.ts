import { useState, useEffect } from "react";
import { debounce } from "lodash";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utils/validators";

type FormData = {
  username?: string;
  email?: string;
  password?: string;
  reenterPassword?: string;
  radio?: string;
  files?: FileList | null;
};

const useFormContext = (
  initialValues: FormData,
  onSubmit: (values: FormData) => void,
  requiredFields?: Partial<Record<keyof FormData, boolean>>
) => {
  const [formData, setFormData] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const validateField = debounce((name: keyof FormData, value: string) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      const isRequired = requiredFields?.[name] ?? true;
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
              newErrors[name] = "Please select a radio.";
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
    } else if ("target" in e && "name" in e.target && "value" in e.target) {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };



  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target;

    setTouchedFields((prev) => ({ ...prev, [name]: true }));

    // Skip validation for file inputs as we are not validating files like text fields
    if (type === "file") return;

    // Validate only if the value is a string (i.e., for text inputs)
    validateField(name as keyof FormData, formData[name as keyof FormData] as string || "");
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      onSubmit(formData);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      validateField.cancel(); // Cancel the debounced function
    };
  }, []);

  return {
    formData,
    errors,
    touchedFields,
    handleChange,
    handleBlur,
    handleFocus,
    handleSubmit,
  };
};

export default useFormContext;
