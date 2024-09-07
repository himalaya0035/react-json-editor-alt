import { ReactNode, useEffect, useState } from "react";
import { JsonEditorProps } from "../../types/JsonEditor.types";
import RenderObject from "./renderElements/renderObject";
import RenderArray from "./renderElements/renderArray";
import RenderValue from "./renderElements/renderValue";
import { deepEqual } from "../../functions/functions";
import "./jsonEditor.css";
import { cn } from "../../lib/utils";

function JsonEditor({
  json,
  isEditing,
  editableFields,
  nonEditableFields,
  className = '',
  allFieldsEditable = true,
  isExpanded = false
}: JsonEditorProps) {
  const [jsonState, setJsonState] = useState<Record<string, any> | null>({});
  const [editJsonState, setEditJsonState] = useState<Record<
    string,
    any
  > | null>({});

  useEffect(() => {
    if (!deepEqual(json, jsonState)) {
      setJsonState(json);
      setEditJsonState(json);
    }
  }, [json]);

  const handleOnChange = () => {};

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
