import { useState } from "react";
import JsonEditor from "../components/JsonEditor/jsonEditor";
import { Button } from "../components/ui/button";

function InlineModeExample({
  json,
  editableFieldObject,
  nonEditableFieldsObject,
}: {
  json: Record<string, any>;
  editableFieldObject: Record<string, any>;
  nonEditableFieldsObject: Record<string, any>;
}) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center gap-1">
        <h1 className="font-bold">Inline Mode</h1>
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
        onSubmit={(props) => console.log(props)}
        editingConfig={{
          editingMode: "inline", // defaults to inline
          allFieldsEditable: true, // default to true
          debouncing: false, // defaults to true
          enableTypeBasedRendering: true, // defaults to true
          editableFields: editableFieldObject,
          nonEditableFields: nonEditableFieldsObject,
        }}
      />
    </>
  );
}

export default InlineModeExample;
