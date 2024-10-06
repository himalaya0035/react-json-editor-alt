import { useCallback, useState } from "react";
import { DefaultNumberElementProps } from "../../../types/JsonEditor.types";
import { Input } from "../../ui/input";
import { debounce, validateValue } from "../../../functions/functions";
import { DEBOUNCE_DELAY, GLOBAL_EDITING_MODE, INLINE_EDITING_MODE } from "../../../constants/constants";
import { Button } from "../../ui/button";
import { Check } from "lucide-react";
import { useJsonEditorContext } from "../jsonEditor";
import InlineCancelButton from "../inlineElements/inlineCancelButton";
import ResetButton from "../inlineElements/resetButton";

function DefaultNumberInput({
  value,
  readModeValue,
  path,
  fieldValidations
}: DefaultNumberElementProps) {
  const [numberInputValue, setNumberInputValue] = useState<number| string>(value);
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

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let result = null;
    if (fieldValidations){
      result = validateValue(value,fieldValidations)
      setLocalValidationError(result || '')
    }
    setNumberInputValue(value);
    debouncedOnChange(value,result || "");
  };

  // Memoize debounced onChange with useCallback, recreating when onChange updates.
  // This prevents stale closures and ensures the component uses the latest onChange.
  const debouncedOnChange = useCallback(
    debounce((value: string,validationMessage? : string) => {
      const updatedValidations = {
        ...validations,
        [path] : validationMessage
      }
      handleOnChange(Number(value), path,updatedValidations);
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

  const handleNumberInputSubmit = () => {
    handleOnSubmit(Number(numberInputValue), path);
    if (editingMode === INLINE_EDITING_MODE) {
      setSelectedFieldsForEditing((prev) => {
        return {
          ...prev,
          [path]: false,
        };
      });
    }
  };

  const disabled = readModeValue === Number(numberInputValue);
  const validationMessage = localValidationError || validations[path]

  return (
    <>
      <Input
        type="number"
        value={numberInputValue}
        onChange={handleNumberInputChange}
      />
      {editingMode !== GLOBAL_EDITING_MODE && !validationMessage && (
        <Button
          variant={"outline"}
          disabled={disabled}
          size={"icon"}
          className={`${disabled && "hidden"}`}
          title="Submit"
          onClick={handleNumberInputSubmit}
        >
          <Check size={14} />
        </Button>
      )}
      {editingMode === INLINE_EDITING_MODE && <InlineCancelButton path={path} />}
      {(editingMode !== INLINE_EDITING_MODE && !disabled) && <ResetButton path={path} callBack={() => {
        setNumberInputValue(readModeValue as number)
        setLocalValidationError("")
      }} />}
      <span className="text-sm">{validationMessage}</span>
    </>
  );
}

export default DefaultNumberInput;
