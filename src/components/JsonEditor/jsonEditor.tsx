import { createContext, CSSProperties, ReactNode, useContext, useRef, useState } from "react";
import RenderObject from "./renderElements/renderObject";
import RenderArray from "./renderElements/renderArray";
import RenderValue from "./renderElements/renderValue";
import {
  EditingConfig,
  GlobalSubmitButtonConfigs,
  HandleOnChange,
  HandleOnSubmit,
  JsonEditorContextType,
  JsonEditorProps,
} from "../../types/JsonEditor.types";
import {
  deepCopy,
  deepEqual,
  findJsonDiff,
  getValueByPath,
  pathToRegex,
  updateValueByPath,
} from "../../functions/functions";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  ARRAY_PATH_IDENTIFIER,
  GLOBAL_EDITING_MODE,
  GLOBAL_INDIVIDUAL_EDITING_MODE,
  INDIVIDUAL_EDITING_MODE,
  INLINE_EDITING_MODE,
} from "../../constants/constants";
import "./jsonEditor.css";
import { RegexTrie } from "../../utils/regexTrie";

const JsonEditorContext = createContext<JsonEditorContextType>({} as JsonEditorContextType);
export const useJsonEditorContext = () => useContext(JsonEditorContext);

function JsonEditor({
  json,
  className = '',
  isExpanded = false,
  onSubmit,
  onChange,
  editingConfig = {} as EditingConfig,
  globalSubmitButtonConfigs = {} as GlobalSubmitButtonConfigs,
  styles = {} as CSSProperties
}: JsonEditorProps) {
  const [jsonState, setJsonState] = useState<Record<string, any> | null>(json);
  const [editJsonState, setEditJsonState] = useState<Record<string, any> | null>(json);
  const jsonRef = useRef(json)
  const [selectedFieldsForEditing, setSelectedFieldsForEditing] = useState<Record<string, any>>({})  
  const [validations, setValidations] = useState<Record<string, any>>({})  
  const {
    editingMode = INLINE_EDITING_MODE,
    allFieldsEditable = true,
    editableFields = {}, 
    nonEditableFields = {},
    debouncing = false,
    enableTypeBasedRendering = true
  } = editingConfig;
  
  const regexPatternsTrie = useRef(new RegexTrie())
  const editableFieldsRef = useRef({})
  const nonEditableFieldsRef = useRef({})

  // // update jsonState when json changes
  if (!deepEqual(json,jsonRef.current)){ // to prevent infinite rerenders, 
    // Calculating deepEqual on every render maybe costly, but necessary to update json state on changes. 
    // In the future, we can offer users an option to enable or disable state updates on json changes.
    setJsonState(json) 
    setEditJsonState(json)
    jsonRef.current = json
  }

  // only create/update regex paths trie when there is a change in editableFields or nonEditableFields
  if (!deepEqual(editableFieldsRef.current,editableFields) || !deepEqual(nonEditableFieldsRef.current,nonEditableFields)){
    for (let editableFieldPath in editableFields){
      // convert any paths in editableFields that includes [] into regex and store it in trie
      // example sample.[].name is stored as regex in trie
      // trie is used for efficient retrieval of regex later on in renderValue
      if (editableFieldPath.includes(ARRAY_PATH_IDENTIFIER)){
        const regex = pathToRegex(editableFieldPath)
        regexPatternsTrie.current.insert(editableFieldPath,regex)
      }
    };
    for (let nonEditableFieldPath in nonEditableFields){
      if (nonEditableFieldPath.includes(ARRAY_PATH_IDENTIFIER)){
        const regex = pathToRegex(nonEditableFieldPath)
        regexPatternsTrie.current.insert(nonEditableFieldPath,regex)
      }
    };
    editableFieldsRef.current = deepCopy(editableFields)
    nonEditableFieldsRef.current = deepCopy(nonEditableFields)
  }

  let isEditing = false;
  if ("isEditing" in editingConfig){
    isEditing = editingConfig.isEditing || false
  }

  const handleOnChange : HandleOnChange = (value,path) => {
    const tempEditJsonState = deepCopy(editJsonState)
    updateValueByPath(tempEditJsonState,path,value)
    if (onChange && jsonState){
      onChange({ // callback function exposed to lib consumer
        initialJson : deepCopy(editJsonState),
        updatedJson : tempEditJsonState,
        updatedKeys: findJsonDiff(jsonState,tempEditJsonState),
        editorMode : editingMode,
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
        editorMode : editingMode,
        submitType : editingMode === GLOBAL_INDIVIDUAL_EDITING_MODE ? INDIVIDUAL_EDITING_MODE : editingMode
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
        editorMode : editingMode,
        submitType : editingMode === GLOBAL_INDIVIDUAL_EDITING_MODE ? GLOBAL_EDITING_MODE : editingMode
      })
    }
    setJsonState(tempEditJsonState)
  }

  const handleInlneFieldReset = (path: string) => {
    if (jsonState){
      const fieldOriginalValue = getValueByPath(jsonState,path)
      const tempEditJsonState = deepCopy(editJsonState)
      updateValueByPath(tempEditJsonState,path,fieldOriginalValue)
      setEditJsonState(tempEditJsonState)
      // clear out any validation error for that field
      setValidations(prev => {
        return {
          ...prev,
          [path] : ""
        }
      })
    }
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
  const noOfValidationErrors = Object.values(validations).reduce((count, value) => {
    return value !== "" ? count + 1 : count;
  }, 0);

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
        validations,
        setValidations,
        debouncing,
        regexPatternsTrie,
        handleInlneFieldReset,
        enableTypeBasedRendering
      }}
    >
      <div
        style={styles}
        className={cn("w-full h-auto b border-2 py-5", className)}
      >
        {renderJson(jsonState)}
        {[GLOBAL_EDITING_MODE, GLOBAL_INDIVIDUAL_EDITING_MODE].includes(editingMode) 
        && isEditing 
        && noOfValidationErrors === 0 
        && (
            <Button
              variant={globalSubmitButtonConfigs?.variant || "secondary"}
              className={cn("ml-5 mt-2", globalSubmitButtonConfigs?.className)}
              onClick={handleGlobalSubmit}
            >
              {globalSubmitButtonConfigs?.buttonText || "Submit"}
              {globalSubmitButtonConfigs?.children}
            </Button>
          )}
      </div>
    </JsonEditorContext.Provider>
  );
}

export default JsonEditor;
