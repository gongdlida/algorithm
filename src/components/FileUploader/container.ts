import parseEslintConfig from "../../utils/parseEslintConfig";

export const inputFile = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileUploaded: (options: Record<string, any>) => void,
  acceptedFiles: File[]
) => {
  acceptedFiles.forEach((file) => {
    if (file.name.includes("eslint")) {
      const fileType = file.name.split(".").pop();
      if (["json", "js", "ts", "cjs", "mjs"].includes(fileType || "")) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            const parsedOptions = parseEslintConfig(
              reader.result as string,
              fileType as string
            );
            onFileUploaded(parsedOptions.rules || {});
          }
        };
        reader.readAsText(file);
      } else {
        console.error("Unsupported file type:", fileType);
      }
    } else {
      console.error('File name does not contain "eslint":', file.name);
    }
  });
};
