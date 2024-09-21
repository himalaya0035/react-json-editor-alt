import { useCallback, useState } from "react";
import { DefaultTextAreaElementProps } from "../../../types/JsonEditor.types";
import { Textarea } from "../../ui/textarea";
import { debounce } from "../../../functions/functions";
import { DEBOUNCE_DELAY, GLOBAL_EDITING_MODE, INLINE_EDITING_MODE } from "../../../constants/constants";
import { Button } from "../../ui/button";
import { Check } from "lucide-react";
import { useJsonEditorContext } from "../jsonEditor";
import InlineCancelButton from "../inlineElements/inlineCancelButton";

function DefaultTextAreaElement({
  value,
  readModeValue,
  path,
}: DefaultTextAreaElementProps) {
  const [textAreaInputValue, setTextAreaInputValue] = useState(value);
  const {
    handleOnChange,
    handleOnSubmit,
    editingMode,
    setSelectedFieldsForEditing,
  } = useJsonEditorContext();

  const handleTextAreaInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setTextAreaInputValue(value);
    debouncedOnChange(value);
  };

  // Memoize debounced onChange with useCallback, recreating when onChange updates.
  // This prevents stale closures and ensures the component uses the latest onChange.
  const debouncedOnChange = useCallback(
    debounce((value: string) => {
      handleOnChange(value, path);
    }, DEBOUNCE_DELAY),
    [handleOnChange]
  );

  const handleTextAreaInputSubmit = () => {
    handleOnSubmit(textAreaInputValue, path);
    if (editingMode === INLINE_EDITING_MODE) {
      setSelectedFieldsForEditing((prev) => {
        return {
          ...prev,
          [path]: false,
        };
      });
    }
  };

  let disabled = readModeValue === textAreaInputValue;

  return (
    <>
      <Textarea
        value={textAreaInputValue}
        onChange={handleTextAreaInputChange}
      />
      {editingMode !== GLOBAL_EDITING_MODE && (
        <Button
          variant={"outline"}
          disabled={disabled}
          size={"icon"}
          className={`${disabled && "hidden"}`}
          title="Submit"
          onClick={handleTextAreaInputSubmit}
        >
          <Check size={14} />
        </Button>
      )}
      {editingMode === INLINE_EDITING_MODE && <InlineCancelButton path={path} />}
    </>
  );
}

export default DefaultTextAreaElement;
