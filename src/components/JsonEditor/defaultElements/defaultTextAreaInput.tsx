import { DefaultTextAreaElementProps } from "../../../types/JsonEditor.types";
import { Textarea } from "../../ui/textarea";

function DefaultTextAreaElement({ value }: DefaultTextAreaElementProps) {
  return <Textarea value={value} />;
}

export default DefaultTextAreaElement;