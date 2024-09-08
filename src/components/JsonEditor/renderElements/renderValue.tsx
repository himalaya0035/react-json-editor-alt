import DefaultTextInput from "../defaultElements/defaultTextInput";
import DefaultNumberInput from "../defaultElements/defaultNumberInput";
import DefaultDateInput from "../defaultElements/defaultDateInput";
import DefaultSelectInput from "../defaultElements/defaultSelectInput";
import DefaultRadioInput from "../defaultElements/defaultRadioInput";
import DefaultTextAreaElement from "../defaultElements/defaultTextAreaInput";
import { getValueByPath, removeArrayIndexFromPropertyPath } from "../../../functions/functions";
import { RenderValueProps } from "../../../types/JsonEditor.types";
import DefaultValueElement from "../defaultElements/defaultValueElement";
import { useJsonEditorContext } from "../jsonEditor";

function RenderValue({
  value,
  path
}: RenderValueProps) {

  const {
    isEditing,
    editJsonState,
    editableFields,
    nonEditableFields,
    allFieldsEditable,
    allowSelectiveFieldEditing,
    selectedFieldsForEditing,
  } = useJsonEditorContext();
  
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
  if ((isEditing && (allFieldsEditable || isFieldPresentInEditabeLookup) && !isFieldPresentInNonEditableLookup)
    ||
    (allowSelectiveFieldEditing && selectedFieldsForEditing && selectedFieldsForEditing[pathWithoutArrayIndices])
  ) {
    const editableValue = getValueByPath(editJsonState, path)
    if (isFieldPresentInEditabeLookup && editableFields[pathWithoutArrayIndices] !== true) {
      const editableField = editableFields[pathWithoutArrayIndices];
      switch (editableField.type) {
        case "string": {
          return (
            <DefaultTextInput
              path={path}
              pathWithoutArrayIndices={pathWithoutArrayIndices}
              value={editableValue as string}
              readModeValue={value as string}
            />
          );
        }
        case "number": {
          return (
            <DefaultNumberInput
              path={path}
              pathWithoutArrayIndices={pathWithoutArrayIndices}
              value={editableValue as string}
              readModeValue={value as string}
            />
          );
        }
        case "select": {
          return (
            <DefaultSelectInput
              path={path}
              pathWithoutArrayIndices={pathWithoutArrayIndices}
              value={editableValue as string}
              readModeValue={value as string}
              options={editableField.options}
            />
          );
        }
        case "date": {
          return (
            <DefaultDateInput
              value={editableValue as string}
              path={path}
              pathWithoutArrayIndices={pathWithoutArrayIndices}
              format={editableField.format}
            />
          );
        }
        case "radio": {
          return (
            <DefaultRadioInput
              path={path}
              pathWithoutArrayIndices={pathWithoutArrayIndices}
              value={editableValue as string}
              readModeValue={value as string}
              options={editableField.options}
            />
          );
        }
        case "textArea": {
          return (
            <DefaultTextAreaElement
              path={path}
              pathWithoutArrayIndices={pathWithoutArrayIndices}
              value={editableValue as string}
              readModeValue={value as string}
            />
          );
        }
        default: {
          return (
            <DefaultTextInput
              path={path}
              pathWithoutArrayIndices={pathWithoutArrayIndices}
              value={editableValue as string}
              readModeValue={value as string}
            />
          );
        }
      }
    } else {
      return (
        <DefaultTextInput
          path={path}
          pathWithoutArrayIndices={pathWithoutArrayIndices}
          value={editableValue as string}
          readModeValue={value as string}
        />
      );
    }
  }

  return (
    <DefaultValueElement
      value={value as string}
      path={path}
      pathWithoutArrayIndices={pathWithoutArrayIndices}
    />
  ) 
}

export default RenderValue;
