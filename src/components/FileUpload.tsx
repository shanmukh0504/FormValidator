import React, { useState } from "react";
import { useForm } from "../context/FormContext";

const FileUpload: React.FC = () => {
  const { formData, handleChange, errors, touchedFields } = useForm();
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const names = Array.from(files).map((file) => file.name);
      setFileNames(names);
      handleChange(e);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-semibold">
        Upload Files <span className="text-red-500">*</span>
      </label>
      <input
        type="file"
        name="files"
        multiple
        onChange={handleFileChange}
        className="border rounded-md p-2"
        required
      />
      {fileNames.length > 0 && (
        <div className="mt-2">
          <h3 className="text-md font-semibold">Selected Files:</h3>
          <ul className="list-disc list-inside">
            {fileNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      )}
      {touchedFields.files && errors.files && <p className="text-red-500 text-sm">{errors.files}</p>}
    </div>
  );
};

export default FileUpload;