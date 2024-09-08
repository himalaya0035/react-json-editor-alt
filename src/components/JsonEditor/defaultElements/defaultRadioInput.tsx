import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { DefaultRadioElementProps } from "../../../types/JsonEditor.types";

function DefaultRadioInput({ value, path, onChange, options }: DefaultRadioElementProps) {
  const handleRadioInputChange = (selectedValue: string) => {
    if (onChange){
      onChange(selectedValue,path)
    }
  }

  return (
    <RadioGroup value={value} onValueChange={handleRadioInputChange} defaultValue={value}>
      {options.map((option) => (
        <div key={option.key} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={option.key} />
          <Label htmlFor={option.key}>{option.value}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}

export default DefaultRadioInput;
