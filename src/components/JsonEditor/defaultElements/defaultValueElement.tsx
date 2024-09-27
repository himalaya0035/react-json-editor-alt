import { DefaultValueElementProps } from "../../../types/JsonEditor.types";
import { useJsonEditorContext } from "../jsonEditor";
import InlineEditButton from "../inlineElements/inlineEditButton";
import { INLINE_EDITING_MODE } from "../../../constants/constants";

function DefaultValueElement({ value, path, isFieldPresentInNonEditableLookup}: DefaultValueElementProps) {
  const { editingMode} = useJsonEditorContext();

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
      <span className={`${style}`}>
        {text}
      </span>
      {(editingMode === INLINE_EDITING_MODE && !isFieldPresentInNonEditableLookup) && (
        <InlineEditButton path={path} />
      )}
    </>
  );
}

export default DefaultValueElement;
