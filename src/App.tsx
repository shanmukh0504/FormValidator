import React from "react";
import FormValidator from "./components/FormValidator";
import { FormProvider } from "./context/FormContext";

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