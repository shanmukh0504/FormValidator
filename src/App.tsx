import React from "react";
import FormValidator from "./components/FormValidator/index";

const App = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="container mx-auto p-4">
      <FormValidator
        username={true}
        email={true}
        password={true}
        reenterPassword={true}
        onSubmit={(values) => console.log(values)}
      />
    </div>
  );
};

export default App;
