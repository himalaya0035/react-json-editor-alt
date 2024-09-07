import { useCallback, useState } from "react";
import { DefaultTextElementProps } from "../../../types/JsonEditor.types";
import { Input } from "../../ui/input";
import { debounce } from "../../../functions/functions";
import { DEBOUNCE_DELAY } from "../../../constants/constants";

function DefaultTextInput({ value, path, onChange }: DefaultTextElementProps) {
  const [textInputValue, setTextInputValue] = useState(value);

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTextInputValue(value);
    debouncedOnChange(value);
  };

  // Memoize debounced onChange with useCallback, recreating when onChange updates.
  // This prevents stale closures and ensures the component uses the latest onChange.
  const debouncedOnChange = useCallback(
    debounce((value: string) => {
      if (onChange) {
        onChange(value, path);
      }
    }, DEBOUNCE_DELAY),
    [onChange]
  );

  return <Input value={textInputValue} onChange={handleTextInputChange} />;
}

export default DefaultTextInput;
