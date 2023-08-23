import React from "react";
import JoditEditor from "jodit-react";
import "../assets/style.css";

interface JoditEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const JoditEditorComponent: React.FC<JoditEditorProps> = ({
  value,
  onChange,
}) => {
  const config = {
    height: 400,
    iframe: true,
    spellcheck: true,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    buttons:
      "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,classSpan,lineHeight,superscript,subscript,file,image,video,spellcheck,cut,preview",
    minHeight: 0,
    minWidth: 0,
    allowResizeY: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
    toolbarAdaptive: false,
  };

  return (
    <JoditEditor
      value={value}
      config={config}
      onBlur={(newContent) => onChange(newContent)}
    />
  );
};

export default JoditEditorComponent;
