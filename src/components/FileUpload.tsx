import React, { useState } from "react";

type FileUploadProps = {
  onChange: (files: FileList) => void;
  error?: string;
  label?: string;
  required?: boolean;
};

const FileUpload: React.FC<FileUploadProps> = ({ onChange, error, label = "Upload Files", required = false }) => {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const names = Array.from(files).map((file) => file.name);
      setFileNames(names);
      onChange(files);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-semibold">{label} {required && <span className="text-red-500">*</span>}</label>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="border rounded-md p-2"
        required={required}
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FileUpload;
