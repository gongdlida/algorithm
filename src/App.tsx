/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import FileUpload from "./components/FileUploader";
import OptionDisplay from "./components/OptionDisplay";

const App: React.FC = () => {
  const [options, setOptions] = useState<Record<string, any>>({});

  const handleFileUploaded = (uploadedOptions: Record<string, any>) => {
    setOptions(uploadedOptions);
  };

  return (
    <div className="App">
      <h1>ESLint Options Helper</h1>
      <FileUpload onFileUploaded={handleFileUploaded} />
      <OptionDisplay options={options} />
    </div>
  );
};

export default App;
