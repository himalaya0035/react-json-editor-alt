import { Check } from "lucide-react";
import { DefaultSelectElementProps } from "../../../types/JsonEditor.types";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useJsonEditorContext } from "../jsonEditor";

function DefaultSelectInput({
  value,
  readModeValue,
  path,
  options,
}: DefaultSelectElementProps) {
  const {handleOnChange,handleOnSubmit} = useJsonEditorContext();

  const handleSelectInputChange = (selectedValue: string) => {
    handleOnChange(selectedValue, path);
  };

  const handleSelectInputSubmit = () => {
    handleOnSubmit(value,path)
  }

  let disabled = readModeValue === value

  return (
    <>
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
    <Button
        variant={"outline"}
        disabled={disabled}
        size={"icon"}
        className={`${disabled && 'hidden'}`}
        title="Submit"
        onClick={handleSelectInputSubmit}
      >
        <Check size={14} />
      </Button>
    </>
  );
}

export default DefaultSelectInput;
