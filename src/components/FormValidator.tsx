// /components/FormValidator.tsx
import React from "react";
import { useForm } from "../contexts/FormContext";
import UsernameInput from "./UsernameInput";
import PasswordInput from "./PasswordInput";
import ReenterPasswordInput from "./ReenterPasswordInput";
import FileUpload from "./FileUpload";
import RadioGroup from "./RadioGroup";
import CheckBox from "./CheckBox";
import NumberInput from "./NumberInput";
import SliderInput from "./SliderInput";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import SubmitButton from "./SubmitButton";
import EmailInput from "./EmailInput";

const FormValidator: React.FC = () => {
  const { handleSubmit } = useForm();

  return (
    <form
      className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <UsernameInput />
      <EmailInput />
      <PasswordInput />
      <ReenterPasswordInput />
      <RadioGroup />
      <CheckBox />
      <NumberInput max={50}/>
      <SliderInput />
      <TextInput />
      <SelectInput />
      <FileUpload />
      <SubmitButton />
    </form>
  );
};

export default FormValidator;
