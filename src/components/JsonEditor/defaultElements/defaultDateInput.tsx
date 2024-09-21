import { Check } from "lucide-react";
import { convertDateIntoPattern, convertPatternIntoDate } from "../../../functions/functions";
import { DefaultDateElementProps } from "../../../types/JsonEditor.types";
import { Button } from "../../ui/button";
import { DatePicker } from "../../ui/datePicker";
import { useJsonEditorContext } from "../jsonEditor";
import InlineCancelButton from "../inlineElements/inlineCancelButton";

function DefaultDateInput({value,readModeValue,path,format}: DefaultDateElementProps) {
  const {
    handleOnChange,
    handleOnSubmit,
    editingMode,
    setSelectedFieldsForEditing,
  } = useJsonEditorContext();

  const dateValue = convertPatternIntoDate(value,format)
  if (!dateValue){
    return "Invalid Date"
  }
  
  const handleDateInputChange = (selectedDate : Date | undefined) => {
    const dateString = convertDateIntoPattern(selectedDate as Date,format)
    if (dateString){
      handleOnChange(dateString,path)
    }
  };

  const handleDateInputSubmit = () => {
    handleOnSubmit(value, path);
    if (editingMode === "inline") {
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
      <DatePicker dateValue={dateValue} onChange={handleDateInputChange} />
      {editingMode !== "global" && (
        <Button
          variant={"outline"}
          disabled={disabled}
          size={"icon"}
          className={`${disabled && "hidden"}`}
          title="Submit"
          onClick={handleDateInputSubmit}
        >
          <Check size={14} />
        </Button>
      )}
      {editingMode === "inline" && <InlineCancelButton path={path} />}
    </>
  );
  

}

export default DefaultDateInput;