import { createContext, ReactNode, useContext, useState } from "react";
import RenderObject from "./renderElements/renderObject";
import RenderArray from "./renderElements/renderArray";
import RenderValue from "./renderElements/renderValue";
import { EditingConfig, GlobalSubmitButtonConfigs, HandleOnChange, HandleOnSubmit, JsonEditorContextType, JsonEditorProps } from "../../types/JsonEditor.types";
import { deepCopy, findJsonDiff, updateValueByPath } from "../../functions/functions";
import "./jsonEditor.css";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

const JsonEditorContext = createContext<JsonEditorContextType>({} as JsonEditorContextType);
export const useJsonEditorContext = () => useContext(JsonEditorContext);

function JsonEditor({
  json,
  className = '',
  isExpanded = false,
  onSubmit,
  onChange,
  editingConfig = {} as EditingConfig,
  globalSubmitButtonConfigs = {} as GlobalSubmitButtonConfigs
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
        updatedKeys: findJsonDiff(editJsonState,tempEditJsonState),
        editorMode : editingMode
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
        updatedKeys: findJsonDiff(jsonState,tempJsonState),
        editorMode : editingMode
      })
    }
    setJsonState(tempJsonState)
  }

  const handleGlobalSubmit = () => {
    const tempEditJsonState = deepCopy(editJsonState)
    if (onSubmit && jsonState){
      onSubmit({ // callback function exposed to lib consumer
        initialJson : deepCopy(editJsonState),
        updatedJson : tempEditJsonState,
        updatedKeys: findJsonDiff(jsonState,tempEditJsonState),
        editorMode : editingMode
      })
    }
    setJsonState(tempEditJsonState)
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
    <div className={cn("w-full h-auto b border-2 py-5", className)}>
      {renderJson(jsonState)}
      {["global","global-individual"].includes(editingMode) && isEditing && (
        <Button
          variant={globalSubmitButtonConfigs?.variant || "secondary"}
          className={cn("ml-5 mt-2",globalSubmitButtonConfigs?.className)}
          onClick={handleGlobalSubmit}
        >
          {globalSubmitButtonConfigs?.buttonText || "Submit"}
          {globalSubmitButtonConfigs?.children}
        </Button>
      ) }
    </div>
    </JsonEditorContext.Provider>
  );
}

export default JsonEditor;
