import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { DefaultRadioElementProps } from "../../../types/JsonEditor.types";
import { Button } from "../../ui/button";
import { Check } from "lucide-react";

function DefaultRadioInput({
  value,
  readModeValue,
  path,
  options,
  onChange,
  onSubmit
}: DefaultRadioElementProps) {
  const handleRadioInputChange = (selectedValue: string) => {
    if (onChange) {
      onChange(selectedValue, path);
    }
  };

  const handleRadioInputSubmit = () => {
    if (onSubmit) {
      onSubmit(value, path);
    }
  };

  let disabled = readModeValue === value;

  return (
    <>
    <RadioGroup
      value={value}
      onValueChange={handleRadioInputChange}
      defaultValue={value}
    >
      {options.map((option) => (
        <div key={option.key} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={option.key} />
          <Label htmlFor={option.key}>{option.value}</Label>
        </div>
      ))}
    </RadioGroup>
    <Button
        variant={"outline"}
        disabled={disabled}
        size={"icon"}
        className={`${disabled && 'hidden'}`}
        title="Submit"
        onClick={handleRadioInputSubmit}
      >
        <Check size={14} />
      </Button>
    </>
  );
}

export default DefaultRadioInput;
