import { useState } from "react";
import JsonEditor from "../components/JsonEditor/jsonEditor";
import { Button } from "../components/ui/button";

function GlobalIndiviualModeExample({
  json,
  editableFieldObject,
  nonEditableFieldsObject,
}: {
  json: Record<string, any>;
  editableFieldObject: Record<string, any>;
  nonEditableFieldsObject: Record<string, any>;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center gap-1 mt-8">
        <h1 className="font-bold">Global-Individual Mode</h1>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Read Mode" : "Edit Mode"}
        </Button>
        <Button className="ml-2" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>
      <JsonEditor
        json={json}
        isExpanded={isExpanded} // defaults to false
        className="border-2 rounded-lg"
        styles={{
          marginTop: "10px",
        }}
        onChange={(props) => console.log(props)}
        onSubmit={(props) => {
          console.log(props)
          if (props.submitType === "global"){
              setIsEditing(false)
          }
        }}
        editingConfig={{
          editingMode: "global-individual", // defaults to inline
          isEditing : isEditing, // defaults to false
          allFieldsEditable: false, // default to true
          debouncing: false, // defaults to true
          enableTypeBasedRendering: true, // defaults to true
          editableFields: editableFieldObject,
          nonEditableFields: nonEditableFieldsObject,
        }}
      />
    </>
  );
}

export default GlobalIndiviualModeExample;
