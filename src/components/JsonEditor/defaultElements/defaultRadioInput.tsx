import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { DefaultRadioElementProps } from "../../../types/JsonEditor.types";
import { Button } from "../../ui/button";
import { Check } from "lucide-react";
import { useJsonEditorContext } from "../jsonEditor";
import InlineCancelButton from "../inlineElements/inlineCancelButton";
import { GLOBAL_EDITING_MODE, INLINE_EDITING_MODE } from "../../../constants/constants";

function DefaultRadioInput({
  value,
  readModeValue,
  path,
  options,
}: DefaultRadioElementProps) {
  const {
    handleOnChange,
    handleOnSubmit,
    editingMode,
    setSelectedFieldsForEditing,
  } = useJsonEditorContext();

  const handleRadioInputChange = (selectedValue: string) => {
    handleOnChange(selectedValue, path);
  };

  const handleRadioInputSubmit = () => {
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
      {editingMode !== GLOBAL_EDITING_MODE && (
        <Button
          variant={"outline"}
          disabled={disabled}
          size={"icon"}
          className={`${disabled && "hidden"}`}
          title="Submit"
          onClick={handleRadioInputSubmit}
        >
          <Check size={14} />
        </Button>
      )}
      {editingMode === INLINE_EDITING_MODE && <InlineCancelButton path={path} />}
    </>
  );
}

export default DefaultRadioInput;
