import { DefaultNumberElementProps } from "../../../types/JsonEditor.types";
import { Input } from "../../ui/input";

function DefaultNumberInput({ value }: DefaultNumberElementProps) {
  return <Input value={value} />;
}

export default DefaultNumberInput;
