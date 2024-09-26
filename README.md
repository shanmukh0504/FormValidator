**FormValidator Kit**

FormValidator Kit is a lightweight, customizable form validation library built with React and TypeScript. It provides a flexible way to handle form validation with real-time feedback, easy-to-use components, and validation logic for various form fields.

**Features:**

- Real-Time Validation: Provides instant feedback to users as they interact with form fields.
- Customizable Components: Easily style the input fields and error messages to suit your design.
- Validation Rules: Define minimum and maximum lengths, and custom validation rules.
- Debounced Validation: Ensures smooth user experience by debouncing input validations.
- Field Types: Supports various input types like text, email, password, number, file upload, checkboxes, radio buttons, and more.
- Lightweight: Minimal package size with essential functionality.

**Installation:**

To install FormValidator Kit, run the following command:

```bash
npm install formvalidator-kit
```

or using yarn:

```bash
yarn add formvalidator-kit
```

**Usage:**

Wrap your application or form components with `FormProvider` to manage form state and validation.

Example:

```tsx
import React from "react";
import {
  FormProvider,
  FormValidator,
  UsernameInput,
  EmailInput,
  PasswordInput,
  SubmitButton,
} from "formvalidator-kit";

const App: React.FC = () => {
  return (
    <FormProvider>
      <form>
        <UsernameInput />
        <EmailInput />
        <PasswordInput />
        <SubmitButton />
      </form>
    </FormProvider>
  );
};

export default App;
```

**Available Components:**

- `FormValidator`: Main wrapper for form validation logic.
- `UsernameInput`: Handles username validation with customizable length.
- `EmailInput`: Validates email input.
- `PasswordInput`: Validates password with custom rules.
- `ReenterPasswordInput`: Confirms password matches the original.
- `CheckBox`, `RadioGroup`: Handles checkbox and radio group inputs.
- `NumberInput`, `SliderInput`, `SelectInput`, `FileUpload`: Additional input types.

**Custom Validation Rules:**

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

**Handling Form Submission:**

You can use the `handleSubmit` function to manage form submission and validation.

Example:

```tsx
const { handleSubmit } = useFormContext();

const onSubmit = () => {
  handleSubmit(); // Handles form submission and validates all fields
};
```

**API:**

`useFormContext(initialValues: FormData, validationRules?: Record<keyof FormData, ValidationRules>)`

This hook provides the following:

- `formData`: Current form data.
- `errors`: Object containing error messages for invalid fields.
- `touchedFields`: Tracks which fields have been interacted with.
- `handleChange()`, `handleBlur()`, `handleFocus()`: Event handlers for form fields.
- `handleSubmit()`: Function to trigger form submission and validation.

**Contributing:**

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

**License:**

This project is licensed under the MIT License. See the LICENSE file for details.
