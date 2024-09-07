import { DefaultTextElementProps } from "../../../types/JsonEditor.types";
import { Input } from "../../ui/input";

function DefaultTextInput({ value }: DefaultTextElementProps) {
    return <Input value={value} />;
}

export default  DefaultTextInput
 