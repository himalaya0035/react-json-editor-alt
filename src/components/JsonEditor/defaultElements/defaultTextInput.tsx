import { useCallback, useState } from "react";
import { DefaultTextElementProps } from "../../../types/JsonEditor.types";
import { Input } from "../../ui/input";
import { debounce } from "../../../functions/functions";
import { DEBOUNCE_DELAY } from "../../../constants/constants";
import { Check } from "lucide-react";
import { Button } from "../../ui/button";
import { useJsonEditorContext } from "../jsonEditor";

function DefaultTextInput({
  value,
  readModeValue,
  path,
}: DefaultTextElementProps) {
  const [textInputValue, setTextInputValue] = useState(value);
  const { handleOnChange, handleOnSubmit } = useJsonEditorContext();

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTextInputValue(value);
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

  const handleTextInputSubmit = () => {
    handleOnSubmit(textInputValue, path);
  };

  let disabled = readModeValue === textInputValue;

  return (
    <>
      <Input value={textInputValue} onChange={handleTextInputChange} />
      <Button
        variant={"outline"}
        disabled={disabled}
        size={"icon"}
        className={`${disabled && "hidden"}`}
        title="Submit"
        onClick={handleTextInputSubmit}
      >
        <Check size={14} />
      </Button>
    </>
  );
}

export default DefaultTextInput;
