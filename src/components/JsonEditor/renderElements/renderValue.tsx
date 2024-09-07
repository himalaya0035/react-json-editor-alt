import { removeArrayIndexFromPropertyPath } from "../../../functions/functions";
import { RenderValueProps } from "../../../types/JsonEditor.types";
import DefaultTextInput from "../defaultElements/defaultTextInput";
import DefaultNumberInput from "../defaultElements/defaultNumberInput";
import DefaultDateInput from "../defaultElements/defaultDateInput";
import DefaultSelectInput from "../defaultElements/defaultSelectInput";
import DefaultRadioInput from "../defaultElements/defaultRadioInput";
import DefaultTextAreaElement from "../defaultElements/defaultTextAreaInput";

function RenderValue({
  value,
  path,
  editableFields,
  nonEditableFields,
  allFieldsEditable,
  isEditing,
}: RenderValueProps) {
  // Ex: need to convert "a.1.b" => "a.b", because editable lookup does not account for indices
  const pathWithoutArrayIndices = removeArrayIndexFromPropertyPath(path);
  const isFieldPresentInEditabeLookup =
    editableFields && editableFields.hasOwnProperty(pathWithoutArrayIndices);
  const isFieldPresentInNonEditableLookup =
    nonEditableFields && nonEditableFields.hasOwnProperty(pathWithoutArrayIndices);

  // render a editable input field when:
  // The editor is in editing mode and,
  // Either all fields are editable or the field is in the editableFields lookup and,
  // The field is not present in the nonEditableFields lookup.  
  if (isEditing && (allFieldsEditable || isFieldPresentInEditabeLookup) && !isFieldPresentInNonEditableLookup) {
    if (isFieldPresentInEditabeLookup && editableFields[pathWithoutArrayIndices] !== true) {
      const editableField = editableFields[pathWithoutArrayIndices];
      switch (editableField.type) {
        case "string": {
          return <DefaultTextInput path={path} value={value as string} />;
        }
        case "number": {
          return <DefaultNumberInput path={path} value={value as string} />;
        }
        case "select": {
          return (
            <DefaultSelectInput
              options={editableField.options}
              value={value as string}
              path={path}
              pathWithoutArrayIndices={pathWithoutArrayIndices}
            />
          );
        }
        case "date": {
          return <DefaultDateInput value={value as string} path={path} format={editableField.format} />;
        }
        case "radio": {
          return <DefaultRadioInput value={value as string} path={path} options={editableField.options} />;
        }
        case "textArea": {
          return <DefaultTextAreaElement value={value as string} path={path} />;
        }
        default: {
          return <DefaultTextInput path={path} value={value as string} />;
        }
      }
    } else {
      return <DefaultTextInput path={path} value={value as string} />;
    }
  }

  return <span>{value}</span>;
}

export default RenderValue;
