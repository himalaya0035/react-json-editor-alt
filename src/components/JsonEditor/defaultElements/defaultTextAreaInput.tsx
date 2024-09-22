import { useCallback, useState } from "react";
import { DefaultTextAreaElementProps } from "../../../types/JsonEditor.types";
import { Textarea } from "../../ui/textarea";
import { debounce, validateValue } from "../../../functions/functions";
import { DEBOUNCE_DELAY, GLOBAL_EDITING_MODE, INLINE_EDITING_MODE } from "../../../constants/constants";
import { Button } from "../../ui/button";
import { Check } from "lucide-react";
import { useJsonEditorContext } from "../jsonEditor";
import InlineCancelButton from "../inlineElements/inlineCancelButton";

function DefaultTextAreaElement({
  value,
  readModeValue,
  path,
  fieldValidations
}: DefaultTextAreaElementProps) {
  const [textAreaInputValue, setTextAreaInputValue] = useState(value);
  const [localValidationError, setLocalValidationError] = useState('')
  const {
    handleOnChange,
    handleOnSubmit,
    editingMode,
    setSelectedFieldsForEditing,
    validations,
    setValidations,
    debouncing
  } = useJsonEditorContext();

  const handleTextAreaInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    let result = null;
    if (fieldValidations){
      result = validateValue(value,fieldValidations)
      setLocalValidationError(result || '')
    }
    setTextAreaInputValue(value);
    debouncedOnChange(value,result || "");
  };

  // Memoize debounced onChange with useCallback, recreating when onChange updates.
  // This prevents stale closures and ensures the component uses the latest onChange.
  const debouncedOnChange = useCallback(
    debounce((value: string,validationMessage? : string) => {
      handleOnChange(value, path);
      if (fieldValidations){
        setValidations(prev => {
          return {
            ...prev,
            [path] :  validationMessage
          }
        })
      }
    }, debouncing ? DEBOUNCE_DELAY : 0),
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

  const disabled = readModeValue === textAreaInputValue;
  const validationMessage = localValidationError || validations[path]

  return (
    <>
      <Textarea
        value={textAreaInputValue}
        onChange={handleTextAreaInputChange}
      />
      {editingMode !== GLOBAL_EDITING_MODE && !validationMessage &&  (
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
      <span className="text-sm">{validationMessage}</span>
    </>
  );
}

export default DefaultTextAreaElement;
