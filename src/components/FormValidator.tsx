import React from "react";
import useFormContext from '../hooks/useFormContext';
import UsernameInput from "./UsernameInput";
import EmailInput from "./EmailInput";
import RadioGroup from "./RadioGroup";
import FileUpload from "./FileUpload";
import PasswordInput from "./PasswordInput";
import ReenterPasswordInput from "./ReenterPasswordInput";
import SubmitButton from "./SubmitButton";

type FormData = {
  username?: string;
  email?: string;
  password?: string;
  reenterPassword?: string;
  radio?: string;
  files?: FileList | null;
};

const FormValidator: React.FC<{ onSubmit: (values: FormData) => void }> = ({ onSubmit }) => {
  const { formData, errors, touchedFields, handleChange, handleBlur, handleFocus } = useFormContext(
    {
      username: "",
      email: "",
      password: "",
      reenterPassword: "",
      radio: "",
      files: null as FileList | null,
    },
    onSubmit
  );

  const handleFileChange = (files: FileList | null) => {
    handleChange({ target: { name: "files", value: files } });
  };
  

  return (
    <form
      className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <UsernameInput
        value={formData.username || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        error={touchedFields.username ? errors.username : undefined}
      />
      <EmailInput
        value={formData.email || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        error={touchedFields.email ? errors.email : undefined}
      />
      <RadioGroup
        value={formData.radio || ""}
        onChange={handleChange}
        error={touchedFields.radio ? errors.radio : undefined}
        // label="Select Your Gender"
        // options={[{ value: "male", label: "Male"}, { value: "female", label: "Female"}, { value: "other", label: "Other"}]}
        // required={true}
      />
      <PasswordInput
        value={formData.password || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        error={touchedFields.password ? errors.password : undefined}
      />
      <ReenterPasswordInput
        value={formData.reenterPassword || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        error={touchedFields.reenterPassword ? errors.reenterPassword : undefined}
      />
      <FileUpload
        onChange={handleFileChange}
        error={touchedFields.files ? errors.files : undefined}
        // required={true}
        // label="Upload Resume"
      />
      <SubmitButton 
        text="Submit" 
        onClick={() => {}}
      />
    </form>
  );
};

export default FormValidator;
