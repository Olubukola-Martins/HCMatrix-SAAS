import JoditEditor from "jodit-react";
import Form from "antd/es/form";
import { generalValidationRules } from "utils/formHelpers/validation";

const config = {
  height: 400,
  iframe: true,
  spellcheck: true,
  showCharsCounter: false,
  showWordsCounter: false,
  showXPathInStatusbar: false,
  buttons:
    "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,classSpan,lineHeight,superscript,subscript,file,image,video,spellcheck,cut,preview",
  buttonsMD:
    "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,classSpan,lineHeight,superscript,subscript,file,image,video,spellcheck,cut,preview",
  buttonsSM:
    "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,classSpan,lineHeight,superscript,subscript,file,image,video,spellcheck,cut,preview",
  buttonsXS:
    "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,classSpan,lineHeight,superscript,subscript,file,image,video,spellcheck,cut,preview",
  minHeight: 0,
  minWidth: 0,
  allowResizeY: false,
  uploader: {
    insertImageAsBase64URI: true,
  },
  toolbarAdaptive: false,
};
export const JoditEditorComponent: React.FC<{
  showLabel?: boolean;
  control?: { label: string; name: string; multiple?: boolean };
}> = ({ showLabel, control }) => {
  return (
    <Form.Item
      name={control?.name ?? "joditName"}
      label={showLabel ? control?.label ?? "Template" : null}
      rules={generalValidationRules}
    >
      <JoditEditor config={config} value={""} />
    </Form.Item>
  );
};
