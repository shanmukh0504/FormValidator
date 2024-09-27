# **FormValidator Kit**

FormValidator Kit is a lightweight, customizable form validation library built with React and TypeScript. It provides a flexible way to handle form validation with real-time feedback, easy-to-use components, and validation logic for various form fields.

# **Features:**

- Real-Time Validation: Provides instant feedback to users as they interact with form fields.
- Customizable Components: Easily style the input fields and error messages to suit your design.
- Validation Rules: Define minimum and maximum lengths, and custom validation rules.
- Debounced Validation: Ensures smooth user experience by debouncing input validations.
- Field Types: Supports various input types like text, email, password, number, file upload, checkboxes, radio buttons, and more.
- Lightweight: Minimal package size with essential functionality.

# **Installation:**

To install FormValidator Kit, run the following command:

```bash
npm install formvalidator-kit
```

or using yarn:

```bash
yarn add formvalidator-kit
```

# **Usage:**

Wrap your application or form components with `FormProvider` to manage form state and validation.

Example:

```tsx
import "formvalidator-kit/dist/index.css";
import React from "react";
import {
  UsernameInput,
  SubmitButton,
  FormProvider,
  useForm,
  CheckBox,
  EmailInput,
  FileUpload,
  NumberInput,
  PasswordInput,
  RadioGroup,
  ReenterPasswordInput,
  SelectInput,
  SliderInput,
  TextInput,
} from "formvalidator-kit";

const FormComponent: React.FC = () => {
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
      <NumberInput />
      <SliderInput />
      <TextInput />
      <SelectInput />
      <FileUpload />
      <SubmitButton />
    </form>
  );
};

const App: React.FC = () => {
  return (
    <FormProvider>
      <FormComponent />
    </FormProvider>
  );
};

export default App;
```

Here’s a detailed explanation of each component in your form validation library:

# **Available Components:**

## 1. **FormValidator**: 
   - This is the main wrapper component that encapsulates the form validation logic. It serves as the parent component that holds and validates all the form fields. By including `FormValidator`, you can define validation rules for different inputs, manage the form state, and display error messages for invalid inputs. It makes it easier to manage the form as a whole and ensures consistent validation across multiple form fields.
   - **Usage**: Placed all form input fields inside `FormValidator`, and it automatically handles validation based on the rules you define.
   - **Example**: 
     ```tsx
     import React from "react";
     import {FormValidator} from "formvalidator-kit";
     import { FormProvider } from "formvalidator-kit";

     const App: React.FC = () => {
       return (
         <FormProvider>
           <div>
             <FormValidator />
           </div>
         </FormProvider>
       );
     };
 
     export default App;
     ```

## 2. **UsernameInput**:
   - This component is used for validating username input fields. It allows you to define specific rules such as minimum and maximum length, and it automatically provides feedback if the user enters a username that does not meet these criteria.
   - **Customization**: You can pass optional props such as `className`, `minLength` and `maxLength` to ensure the username falls within the acceptable range. It also provides built-in error handling, like showing an error if the username is too short or too long.
   - **Example**: 
     ```tsx
     <UsernameInput minLength={5} maxLength={15} />
     ```
   - This ensures the username must be between 5 and 15 characters.

## 3. **EmailInput**:
   - The `EmailInput` component ensures that the user inputs a valid email address. It automatically checks the input against standard email formatting rules (e.g., must contain "@" and ".").
   - **Features**: Real-time validation for email format, providing immediate feedback if the input is not a valid email.
   - **Example**:
     ```tsx
     <EmailInput />
     ```
   - Any invalid email format is flagged instantly.

## 4. **PasswordInput**:
   - This component handles password validation, ensuring the password meets custom rules, such as length, inclusion of special characters, numbers, or capital letters. The rules can be customized depending on the strength of the password required.
   - **Example**:
     ```tsx
     <PasswordInput />
     ```

## 5. **ReenterPasswordInput**:
   - Used to confirm that the user re-enters the same password as the original one. It cross-checks the value of this input field with the original `PasswordInput` to ensure they match.
   - **Example**:
     ```tsx
     <PasswordInput />
     <ReenterPasswordInput />
     ```
   - This ensures the passwords match before form submission.

## 6. **RadioGroup**:
   - This component handles the creation and validation of radio button groups. It allows users to select one option from a predefined set. The `RadioGroup` ensures that at least one option is selected (if required) and validates the selected value against the rules provided.
   - **Example**:
     ```tsx
     <RadioGroup 
        label = "Select Option",
        options = [
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          { value: "option3", label: "Option 3" },
        ],
        className = "transition-transform transform hover:scale-105 hover:border-zinc-800 hover:shadow-lg"
        required
      />
     ```
   - This ensures one of the options is selected.

## 7. **CheckBox**:
   - The `CheckBox` component is used to handle checkbox inputs. It supports both single and multiple checkboxes, ensuring that required checkboxes are selected before form submission. This is useful for things like "Terms and Conditions" agreements.
   - **Example**:
     ```tsx
     <CheckBox 
        label = "Select Options",
        options = [
          { value: "check1", label: "Check 1" },
          { value: "check2", label: "Check 2" },
          { value: "check3", label: "Check 3" },
        ],
        className = "transition-transform transform hover:scale-105 hover:border-zinc-800 hover:shadow-lg",
        required
     />
     ```
   - It ensures the user checks the box before submitting.

## 8. **NumberInput**:
   - The `NumberInput` component allows the user to input numeric values. It provides validation for numerical ranges, ensuring that the input stays within a specified minimum and maximum value. This is useful for fields like age or quantity.
   - **Example**:
     ```tsx
     <NumberInput min={18} max={65} />
     ```
   - This ensures the number entered is between 18 and 65.

## 9. **SliderInput**:
   - A slider input component that allows users to select a number from a range by dragging a slider. The component ensures the selected value stays within the predefined range, and it can be used for scenarios like selecting a budget range or rating.
   - **Example**:
     ```tsx
     <SliderInput min={0} max={100} />
     ```
   - This ensures the value falls within the given range.

## 10. **SelectInput**:
   - The `SelectInput` component provides a dropdown menu where users can select one option from a list. This component ensures the user selects an option, and it validates that the selected option is part of the predefined list.
   - **Example**:
     ```tsx
     <SelectInput
        options = [
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          { value: "option3", label: "Option 3" },
        ],
        required
      />
     ```
   - This ensures the user selects a valid option from the dropdown.

## 11. **FileUpload**:
   - The `FileUpload` component allows users to upload files such as images, documents, or other file types. It validates the file type, size, and whether or not a file has been uploaded.
   - **Example**:
     ```tsx
     <FileUpload />
     ```

---

# **Custom Validation Rules:**

You can customize validation rules for each input field.

Example:

```tsx
const initialValidationRules = {
  username: { minLength: 5, maxLength: 15 },
  age: { min: 18, max: 100 },
};

<FormProvider
  initialValues={{ username: "", age: "" }}
  validationRules={initialValidationRules}
>
  <UsernameInput />
  <NumberInput name="age" />
  <SubmitButton />
</FormProvider>;
```

# **Handling Form Submission:**

You can use the `handleSubmit` function to manage form submission and validation.

Example:

```tsx
const { handleSubmit } = useFormContext();

const onSubmit = () => {
  handleSubmit(); // Handles form submission and validates all fields
};
```

# **API:**

`useFormContext(initialValues: FormData, validationRules?: Record<keyof FormData, ValidationRules>)`

This hook provides the following:

- `formData`: Current form data.
- `errors`: Object containing error messages for invalid fields.
- `touchedFields`: Tracks which fields have been interacted with.
- `handleChange()`, `handleBlur()`, `handleFocus()`: Event handlers for form fields.
- `handleSubmit()`: Function to trigger form submission and validation.

# **Contributing:**

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

# **License:**

This project is licensed under the MIT License. See the LICENSE file for details.
