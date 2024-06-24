interface OptionDisplayProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Record<string, any>;
}

const OptionDisplay: React.FC<OptionDisplayProps> = ({ options }) => {
  return (
    <div className="options-container">
      {Object.entries(options).map(([key, value]) => (
        <div key={key} className="option-item">
          <h3>{key}</h3>
          <p>{JSON.stringify(value)}</p>
          <a
            href={`https://eslint.org/docs/rules/${key}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </div>
      ))}
    </div>
  );
};

export default OptionDisplay;
