import { useState } from "react";
import JsonEditor from "../components/JsonEditor/jsonEditor";
import { Button } from "../components/ui/button";
import { ComponentWrapper } from "./componentWrapper";
import { Maximize2, Minimize2, Edit3, BookOpen } from "lucide-react";

function IndividualModeExample({
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

  const configCode = `editingConfig={{
  editingMode: "individual",
  isEditing : \${isEditing},
  allFieldsEditable: true,
  editableFields: editableFieldObject,
  nonEditableFields: nonEditableFieldsObject,
}}`;

  return (
    <ComponentWrapper
      title="Individual Mode"
      description="In this mode, you can toggle edit mode for specific fields while keeping others in read-only mode. Great for granular control."
      code={JSON.stringify(json)}
      config={configCode}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-end gap-2">
           <Button 
            variant={isEditing ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <BookOpen className="w-4 h-4" />
                Read Mode
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4" />
                Edit Mode
              </>
            )}
          </Button>
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
          onSubmit={(props) => {
            console.log("Submitted:", props);
          }}
          editingConfig={{
            editingMode: "individual",
            isEditing: isEditing,
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

export default IndividualModeExample;

