import { DefaultSelectElementProps } from "../../../types/JsonEditor.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

function DefaultSelectInput({ value,path,onChange,options }: DefaultSelectElementProps) {
  const handleSelectInputChange = (selectedValue : string) => {
    if (onChange){
      onChange(selectedValue,path)
    }
  }

  return (
    <Select value={value} onValueChange={handleSelectInputChange}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {options?.map((option, index) => {
          return (
            <SelectItem key={index + option.key} value={option.key}>
              {option.value}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default DefaultSelectInput;
