import { DefaultValueElementProps } from "../../../types/JsonEditor.types";
import InlineEditButton from "../inlineElements/inlineEditButton";

function DefaultValueElement({ value, path, canEditInline}: DefaultValueElementProps) {

  const getFormattedContent = () => {
    if (value === undefined) {
      return { text: 'Undefined', style: 'text-gray-500' }; 
    }
    if (value === null) {
      return { text: 'Null', style: 'text-rose-500' }; 
    }
    if (value === true) {
      return { text: 'True', style: 'text-emerald-500' }; 
    }
    if (value === false) {
      return { text: 'False', style: 'text-amber-500' }; 
    }
    if (value === '') {
      return { text: 'Empty', style: 'text-indigo-500' };
    }
    return { text: value, style : ''}; 
  };

  const { text, style } = getFormattedContent();

  return (
    <>
      <span className={`${style}`}>{text}</span>
      {canEditInline && <InlineEditButton path={path} />}
    </>
  );
}

export default DefaultValueElement;
