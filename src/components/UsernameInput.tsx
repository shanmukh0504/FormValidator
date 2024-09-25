import React from "react";

type UsernameInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | undefined;
  className?: string;
};

const UsernameInput: React.FC<UsernameInputProps> = ({
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  className,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-semibold">
        Username <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="username"
        placeholder="Enter your username"
        className={`${className} block w-full px-4 py-2 text-base border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default UsernameInput;
