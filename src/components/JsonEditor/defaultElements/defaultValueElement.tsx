import { DefaultValueElementProps } from "../../../types/JsonEditor.types";
import { useJsonEditorContext } from "../jsonEditor";
import InlineEditButton from "../inlineElements/inlineEditButton";
import { INLINE_EDITING_MODE } from "../../../constants/constants";

function DefaultValueElement({ value, path, isFieldPresentInNonEditableLookup}: DefaultValueElementProps) {
  const { editingMode} = useJsonEditorContext();

  return (
    <>
      <span>{value}</span>
      {(editingMode === INLINE_EDITING_MODE && !isFieldPresentInNonEditableLookup) && (
        <InlineEditButton path={path} />
      )}
    </>
  );
}

export default DefaultValueElement;
