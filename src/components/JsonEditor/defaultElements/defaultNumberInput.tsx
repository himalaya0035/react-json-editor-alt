import { useCallback, useState } from "react";
import { DefaultNumberElementProps } from "../../../types/JsonEditor.types";
import { Input } from "../../ui/input";
import { debounce } from "../../../functions/functions";
import { DEBOUNCE_DELAY } from "../../../constants/constants";

function DefaultNumberInput({ value, path, onChange }: DefaultNumberElementProps) {
  const [numberInputValue, setNumberInputValue] = useState(value);

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumberInputValue(value);
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

  return <Input type="number" value={numberInputValue} onChange={handleNumberInputChange} />;
}

export default DefaultNumberInput;
