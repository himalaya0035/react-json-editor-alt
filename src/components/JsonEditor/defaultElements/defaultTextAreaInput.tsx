import { useCallback, useState } from "react";
import { DefaultTextAreaElementProps } from "../../../types/JsonEditor.types";
import { Textarea } from "../../ui/textarea";
import { debounce } from "../../../functions/functions";
import { DEBOUNCE_DELAY } from "../../../constants/constants";
import { Button } from "../../ui/button";
import { Check } from "lucide-react";
import { useJsonEditorContext } from "../jsonEditor";

function DefaultTextAreaElement({
  value,
  readModeValue,
  path,
}: DefaultTextAreaElementProps) {
  const [textAreaInputValue, setTextAreaInputValue] = useState(value);
  const { handleOnChange, handleOnSubmit } = useJsonEditorContext();

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
    handleOnSubmit(textAreaInputValue,path)
  }

  let disabled = readModeValue === textAreaInputValue;

  return (
    <>
      <Textarea
        value={textAreaInputValue}
        onChange={handleTextAreaInputChange}
      />
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
    </>
  );
}

export default DefaultTextAreaElement;
