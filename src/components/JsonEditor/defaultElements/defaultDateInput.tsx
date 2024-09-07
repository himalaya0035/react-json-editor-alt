import { convertPatternIntoDate } from "../../../functions/functions";
import { DefaultDateElementProps } from "../../../types/JsonEditor.types";
import { DatePicker } from "../../ui/datePicker";

function DefaultDateInput({value,format}: DefaultDateElementProps) {
  let dateValue;
  try {
    dateValue = convertPatternIntoDate(value,format)
  }catch(err){
    
  }
  return <DatePicker dateValue={dateValue} />
}

export default DefaultDateInput;