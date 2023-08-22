import React from 'react';
import JoditEditor from 'jodit-react';

interface JoditEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const JoditEditorComponent: React.FC<JoditEditorProps> = ({ value, onChange }) => {
  const config = {
    height: 400,
  };

  return (
    <JoditEditor
      value={value}
      config={config}
      onBlur={(newContent) => onChange(newContent)}
      className=''
    />
  );
};

export default JoditEditorComponent;
