import React from "react";

type SubmitButtonProps = {
  text: string;
  onClick: () => void;
  className?: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`${className} w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition ease-in-out duration-300`}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
