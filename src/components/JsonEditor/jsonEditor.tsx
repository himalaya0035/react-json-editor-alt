import { ReactNode, useState } from "react";
import RenderObject from "./renderElements/renderObject";
import RenderArray from "./renderElements/renderArray";
import RenderValue from "./renderElements/renderValue";
import { HandleOnChange, HandleOnSubmit, JsonEditorProps } from "../../types/JsonEditor.types";
import { deepCopy, findJsonDiff, updateValueByPath } from "../../functions/functions";
import "./jsonEditor.css";
import { cn } from "../../lib/utils";

function JsonEditor({
  json,
  isEditing,
  editableFields,
  nonEditableFields,
  className = '',
  allFieldsEditable = true,
  isExpanded = false,
  onSubmit,
  onChange
}: JsonEditorProps) {
  const [jsonState, setJsonState] = useState<Record<string, any> | null>(json);
  const [editJsonState, setEditJsonState] = useState<Record<string, any> | null>(json);

  const handleOnChange : HandleOnChange = (value,path) => {
    const tempEditJsonState = deepCopy(editJsonState)
    updateValueByPath(tempEditJsonState,path,value)
    if (onChange && editJsonState){
      onChange({ // callback function exposed to lib consumer
        initialJson : deepCopy(editJsonState),
        updatedJson : tempEditJsonState,
        updatedKeys: findJsonDiff(editJsonState,tempEditJsonState)
      })
    }
    setEditJsonState(tempEditJsonState)
  };

  const handleOnSubmit : HandleOnSubmit = (value,path) => {
    const tempJsonState = deepCopy(jsonState)
    updateValueByPath(tempJsonState,path,value)
    if (onSubmit && jsonState){
      onSubmit({ // callback function exposed to lib consumer
        initialJson : deepCopy(jsonState),
        updatedJson : tempJsonState,
        updatedKeys: findJsonDiff(jsonState,tempJsonState)
      })
    }
    setJsonState(tempJsonState)
  }

  const renderJson = (
    value: any,
    path = "",
    isRootLevelKey = true
  ): ReactNode => {
    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        return (
          <RenderArray
            arr={value}
            path={path}
            isRootLevelKey={isRootLevelKey}
            renderJson={renderJson}
            isExpanded={isExpanded}
          />
        );
      } else {
        return (
          <RenderObject
            obj={value}
            isRootLevelKey={isRootLevelKey}
            path={path}
            renderJson={renderJson}
            isExpanded={isExpanded}
            searchText={""}
          />
        );
      }
    } else {
      return (
        <RenderValue
          value={value}
          isEditing={isEditing}
          path={path}
          jsonState={jsonState}
          editJsonState={editJsonState}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          allFieldsEditable={allFieldsEditable}
          editableFields={editableFields}
          nonEditableFields={nonEditableFields}
          searchText={""}
        />
      );
    }
  };

  return (
    <div className={cn("w-full h-auto border-black border-2 py-5",className)}>
      {renderJson(jsonState)}
    </div>
  );
}

export default JsonEditor;
