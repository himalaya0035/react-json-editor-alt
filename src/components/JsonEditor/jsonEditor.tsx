import { createContext, ReactNode, useContext, useState } from "react";
import RenderObject from "./renderElements/renderObject";
import RenderArray from "./renderElements/renderArray";
import RenderValue from "./renderElements/renderValue";
import { EditingConfig, HandleOnChange, HandleOnSubmit, JsonEditorContextType, JsonEditorProps } from "../../types/JsonEditor.types";
import { deepCopy, findJsonDiff, updateValueByPath } from "../../functions/functions";
import "./jsonEditor.css";
import { cn } from "../../lib/utils";

const JsonEditorContext = createContext<JsonEditorContextType>({} as JsonEditorContextType);
export const useJsonEditorContext = () => useContext(JsonEditorContext);

function JsonEditor({
  json,
  className = '',
  isExpanded = false,
  onSubmit,
  onChange,
  editingConfig = {} as EditingConfig
}: JsonEditorProps) {
  const [jsonState, setJsonState] = useState<Record<string, any> | null>(json);
  const [editJsonState, setEditJsonState] = useState<Record<string, any> | null>(json);
  const [selectedFieldsForEditing, setSelectedFieldsForEditing] = useState<Record<string, any>>({})  

  const {
    editingMode = 'global-individual',
    allFieldsEditable = true,
    editableFields = {}, 
    nonEditableFields = {}
  } = editingConfig;

  let isEditing = false;
  if ("isEditing" in editingConfig){
    isEditing = editingConfig.isEditing || false
  }

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
          />
        );
      } else {
        return (
          <RenderObject
            obj={value}
            isRootLevelKey={isRootLevelKey}
            path={path}
            renderJson={renderJson}
          />
        );
      }
    } else {
      return (
        <RenderValue
          value={value}
          path={path}
        />
      );
    }
  };

  return (
    <JsonEditorContext.Provider
      value={{
        editingMode,
        jsonState,
        editJsonState,
        isEditing,
        allFieldsEditable,
        isExpanded,
        editableFields,
        nonEditableFields,
        handleOnChange,
        handleOnSubmit,
        selectedFieldsForEditing,
        setSelectedFieldsForEditing,
      }}
    >
      <div className={cn("w-full h-auto border-black border-2 py-5", className)}>
        {renderJson(jsonState)}
      </div>
    </JsonEditorContext.Provider>
  );
}

export default JsonEditor;
