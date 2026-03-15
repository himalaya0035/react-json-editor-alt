import { useState } from "react";
import JsonEditor from "../components/JsonEditor/jsonEditor";
import { Button } from "../components/ui/button";
import { ComponentWrapper } from "./componentWrapper";
import { Maximize2, Minimize2 } from "lucide-react";

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

  const configCode = `editingConfig={{
  editingMode: "inline",
  allFieldsEditable: true,
  editableFields: editableFieldObject,
  nonEditableFields: nonEditableFieldsObject,
}}`;

  return (
    <ComponentWrapper
      title="Inline Editing Mode"
      description="The default mode where fields are editable directly within the JSON tree structure. Perfect for quick adjustments without losing context."
      code={JSON.stringify(json)}
      config={configCode}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <Minimize2 className="w-4 h-4" />
                Collapse All
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4" />
                Expand All
              </>
            )}
          </Button>
        </div>
        <JsonEditor
          json={json}
          isExpanded={isExpanded}
          className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-slate-50/30"
          styles={{
            padding: "20px",
          }}
          onChange={(props) => console.log("Changed:", props)}
          onSubmit={(props) => console.log("Submitted:", props)}
          editingConfig={{
            editingMode: "inline",
            allFieldsEditable: true,
            debouncing: true,
            enableTypeBasedRendering: true,
            editableFields: editableFieldObject,
            nonEditableFields: nonEditableFieldsObject,
          }}
        />
      </div>
    </ComponentWrapper>
  );
}

export default InlineModeExample;

