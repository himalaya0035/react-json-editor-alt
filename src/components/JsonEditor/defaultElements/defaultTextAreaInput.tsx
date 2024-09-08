import { useCallback, useState } from "react";
import { DefaultTextAreaElementProps } from "../../../types/JsonEditor.types";
import { Textarea } from "../../ui/textarea";
import { debounce } from "../../../functions/functions";
import { DEBOUNCE_DELAY } from "../../../constants/constants";

function DefaultTextAreaElement({ value, path, onChange }: DefaultTextAreaElementProps) {
  const [textAreaInputValue, setTextAreaInputValue] = useState(value);

  const handleTextAreaInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTextAreaInputValue(value);
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
  return <Textarea value={textAreaInputValue} onChange={handleTextAreaInputChange} />;
}

export default DefaultTextAreaElement;