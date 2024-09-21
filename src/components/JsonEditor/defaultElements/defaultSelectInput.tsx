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
import InlineCancelButton from "../inlineElements/inlineCancelButton";
import { GLOBAL_EDITING_MODE, INLINE_EDITING_MODE } from "../../../constants/constants";

function DefaultSelectInput({
  value,
  readModeValue,
  path,
  options,
}: DefaultSelectElementProps) {
  const {
    handleOnChange,
    handleOnSubmit,
    editingMode,
    setSelectedFieldsForEditing,
  } = useJsonEditorContext();

  const handleSelectInputChange = (selectedValue: string) => {
    handleOnChange(selectedValue, path);
  };

  const handleSelectInputSubmit = () => {
    handleOnSubmit(value, path);
    if (editingMode === INLINE_EDITING_MODE) {
      setSelectedFieldsForEditing((prev) => {
        return {
          ...prev,
          [path]: false,
        };
      });
    }
  };

  let disabled = readModeValue === value;

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
      {editingMode !== GLOBAL_EDITING_MODE && (
        <Button
          variant={"outline"}
          disabled={disabled}
          size={"icon"}
          className={`${disabled && "hidden"}`}
          title="Submit"
          onClick={handleSelectInputSubmit}
        >
          <Check size={14} />
        </Button>
      )}
      {editingMode === INLINE_EDITING_MODE && <InlineCancelButton path={path} />}
    </>
  );
}

export default DefaultSelectInput;
