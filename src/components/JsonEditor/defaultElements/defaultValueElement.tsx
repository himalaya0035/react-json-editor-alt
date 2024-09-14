import { DefaultValueElementProps } from "../../../types/JsonEditor.types";
import { useJsonEditorContext } from "../jsonEditor";
import InlineEditButton from "../inlineElements/inlineEditButton";

function DefaultValueElement({ value, path, isFieldPresentInNonEditableLookup}: DefaultValueElementProps) {
  const { editingMode} = useJsonEditorContext();

  return (
    <>
      <span>{value}</span>
      {(editingMode === "inline" && !isFieldPresentInNonEditableLookup) && (
        <InlineEditButton path={path} />
      )}
    </>
  );
}

export default DefaultValueElement;
