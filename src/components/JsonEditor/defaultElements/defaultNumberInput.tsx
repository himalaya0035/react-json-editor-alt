import { useCallback, useState } from "react";
import { DefaultNumberElementProps } from "../../../types/JsonEditor.types";
import { Input } from "../../ui/input";
import { debounce } from "../../../functions/functions";
import { DEBOUNCE_DELAY, GLOBAL_EDITING_MODE, INLINE_EDITING_MODE } from "../../../constants/constants";
import { Button } from "../../ui/button";
import { Check } from "lucide-react";
import { useJsonEditorContext } from "../jsonEditor";
import InlineCancelButton from "../inlineElements/inlineCancelButton";

function DefaultNumberInput({
  value,
  readModeValue,
  path,
}: DefaultNumberElementProps) {
  const [numberInputValue, setNumberInputValue] = useState<number| string>(value);
  const {
    handleOnChange,
    handleOnSubmit,
    editingMode,
    setSelectedFieldsForEditing,
  } = useJsonEditorContext();

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumberInputValue(value);
    debouncedOnChange(value);
  };

  // Memoize debounced onChange with useCallback, recreating when onChange updates.
  // This prevents stale closures and ensures the component uses the latest onChange.
  const debouncedOnChange = useCallback(
    debounce((value: string) => {
      handleOnChange(Number(value), path);
    }, DEBOUNCE_DELAY),
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

  let disabled = readModeValue === Number(numberInputValue);

  return (
    <>
      <Input
        type="number"
        value={numberInputValue}
        onChange={handleNumberInputChange}
      />
      {editingMode !== GLOBAL_EDITING_MODE && (
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
    </>
  );
}

export default DefaultNumberInput;
