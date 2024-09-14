import { useCallback, useState } from "react";
import { DefaultNumberElementProps } from "../../../types/JsonEditor.types";
import { Input } from "../../ui/input";
import { debounce } from "../../../functions/functions";
import { DEBOUNCE_DELAY } from "../../../constants/constants";
import { Button } from "../../ui/button";
import { Check } from "lucide-react";
import { useJsonEditorContext } from "../jsonEditor";
import InlineCancelButton from "../inlineElements/inlineCancelButton";

function DefaultNumberInput({
  value,
  readModeValue,
  path,
}: DefaultNumberElementProps) {
  const [numberInputValue, setNumberInputValue] = useState(value);
  const {handleOnChange,handleOnSubmit,editingMode, setSelectedFieldsForEditing} = useJsonEditorContext();
  
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumberInputValue(value);
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

  const handleNumberInputSubmit = () => {
    handleOnSubmit(numberInputValue,path)
    if (editingMode === "inline"){
      setSelectedFieldsForEditing(prev => {
        return {
          ...prev,
          [path] : false
        }
      })
    }
  }

  let disabled = readModeValue === numberInputValue;

  return (
    <>
      <Input
        type="number"
        value={numberInputValue}
        onChange={handleNumberInputChange}
      />
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
      {editingMode === "inline" && (
        <InlineCancelButton path={path}/>
      )}
    </>
  );
}

export default DefaultNumberInput;
