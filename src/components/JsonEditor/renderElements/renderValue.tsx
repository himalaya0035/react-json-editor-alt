import DefaultTextInput from "../defaultElements/defaultTextInput";
import DefaultNumberInput from "../defaultElements/defaultNumberInput";
import DefaultDateInput from "../defaultElements/defaultDateInput";
import DefaultSelectInput from "../defaultElements/defaultSelectInput";
import DefaultRadioInput from "../defaultElements/defaultRadioInput";
import DefaultTextAreaElement from "../defaultElements/defaultTextAreaInput";
import DefaultBooleanInput from "../defaultElements/defaultBooleanInput";
import { containsArrayIndex, getValueByPath, testPathAgainstRegex } from "../../../functions/functions";
import { FieldsType, RenderValueProps } from "../../../types/JsonEditor.types";
import DefaultValueElement from "../defaultElements/defaultValueElement";
import { useJsonEditorContext } from "../jsonEditor";
import { INLINE_EDITING_MODE } from "../../../constants/constants";

function RenderValue({
  value,
  path
}: RenderValueProps) {

  const {
    isEditing,
    editingMode,
    editJsonState,
    editableFields,
    nonEditableFields,
    allFieldsEditable,
    selectedFieldsForEditing,
    regexPatternsTrie,
    enableTypeBasedRendering
  } = useJsonEditorContext();
  
  let resolvedPath = null
  if (containsArrayIndex(path) && !editableFields[path]){
    // resolving paths like sample.1.name to sample.[].name
    resolvedPath = testPathAgainstRegex(regexPatternsTrie.current,path)
  }
  if (!resolvedPath){
    resolvedPath = path
  }

  const isFieldPresentInEditabeLookup =
    editableFields && editableFields.hasOwnProperty(resolvedPath);
  const isFieldPresentInNonEditableLookup =
    nonEditableFields && nonEditableFields.hasOwnProperty(resolvedPath);

  // render a editable input field when:
  // the editor is in editing mode and,
  // either all fields are editable or the field is in the editableFields lookup and,
  // the field is not present in the nonEditableFields lookup
  // editingMode is not inline
  const canEditField =
    isEditing &&
    (allFieldsEditable || isFieldPresentInEditabeLookup) &&
    !isFieldPresentInNonEditableLookup &&
    editingMode !== INLINE_EDITING_MODE;

  // render a editable input field when:
  // the editingMode is inline and,
  // and the field is requested by user to be editable and,
  // the field is not present in the nonEditableFields lookup.  
  const canEditInlineField =
    editingMode === INLINE_EDITING_MODE &&
    selectedFieldsForEditing[path] &&
    !isFieldPresentInNonEditableLookup;

  if (canEditField || canEditInlineField){
    let editableValue = getValueByPath(editJsonState, path);
    if (editableValue === null || editableValue === undefined){
      editableValue = ''
    }
    if (
      isFieldPresentInEditabeLookup &&
      editableFields[resolvedPath] !== true
    ) {
      const editableField = editableFields[resolvedPath] as FieldsType;
      switch (editableField.type) {
        case "string": {
          const fieldValidations = editableField?.validations
          return (
            <DefaultTextInput
              path={path}
              value={editableValue as string}
              readModeValue={value as string}
              fieldValidations={fieldValidations}
            />
          );
        }
        case "number": {
          const fieldValidations = editableField?.validations
          return (
            <DefaultNumberInput
              path={path}
              value={editableValue as number}
              readModeValue={value as number}
              fieldValidations={fieldValidations}
            />
          );
        }
        case "select": {
          return (
            <DefaultSelectInput
              path={path}
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
              readModeValue={value as string}
              path={path}
              format={editableField.format}
            />
          );
        }
        case "radio": {
          return (
            <DefaultRadioInput
              path={path}
              value={editableValue as string}
              readModeValue={value as string}
              options={editableField.options}
            />
          );
        }
        case "textArea": {
          const fieldValidations = editableField?.validations
          return (
            <DefaultTextAreaElement
              path={path}
              value={editableValue as string}
              readModeValue={value as string}
              fieldValidations={fieldValidations}
            />
          );
        }
        case "boolean": {
          return (
            <DefaultBooleanInput
              path={path}
              value={editableValue}
              readModeValue={value as any}
            />
          );
        }
        default: {
          return (
            <DefaultTextInput
              path={path}
              value={editableValue as string}
              readModeValue={value as string}
            />
          );
        }
      }
    } else {
      if (enableTypeBasedRendering){
        if (typeof value === "number"){
          return (
            <DefaultNumberInput
                path={path}
                value={editableValue as number}
                readModeValue={value}
             />
          )
        }else if (typeof value === "boolean"){
          return (
            <DefaultBooleanInput
              path={path}
              value={editableValue}
              readModeValue={value}
            />
          )
        }
      }
      console.info({
        path,
        editableValue,
        value
      })
      return (
        <DefaultTextInput
          path={path}
          value={editableValue as string}
          readModeValue={value as string}
        />
      );
    }
  }

  const canEditInline =
    editingMode === INLINE_EDITING_MODE &&
    (allFieldsEditable || isFieldPresentInEditabeLookup) &&
    !isFieldPresentInNonEditableLookup;
  return (
    <DefaultValueElement
      value={value as string}
      path={path}
      canEditInline={canEditInline}
    />
  ) 
}

export default RenderValue;
