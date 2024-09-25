import React from "react";
import FormValidator from "./components/FormValidator";

const App: React.FC = () => {
  const handleSubmit = () => {};

  return (
    <div>
      <FormValidator onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
