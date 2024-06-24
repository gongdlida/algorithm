import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { inputFile } from "./container";

interface FileUploadProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileUploaded: (options: Record<string, any>) => void;
}

const FileUpload = ({ onFileUploaded }: FileUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => inputFile(onFileUploaded, acceptedFiles),
    [onFileUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

export default FileUpload;
