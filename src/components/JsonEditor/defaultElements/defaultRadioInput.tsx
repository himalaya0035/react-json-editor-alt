import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { DefaultRadioElementProps } from "../../../types/JsonEditor.types";

function DefaultRadioInput({ value, options }: DefaultRadioElementProps) {
  return (
    <RadioGroup value={value} onValueChange={(val:string) => console.info(val)} defaultValue={value}>
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
