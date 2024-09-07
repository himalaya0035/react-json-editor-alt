import { useState } from "react";
import JsonEditor from "./components/JsonEditor/jsonEditor";
import {
  EditableFielsdObjectType,
  NonEditableFieldsObjectType,
} from "./types/JsonEditor.types";
import { indianStatesOptions } from "./temp";
import { Button } from "./components/ui/button";

function App() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const x: Record<string, any> = {
    name: "Himalaya",
    surname: "Gupta",
    dob: "03/12/2000",
    about: "Hello, I am a software developer",
    address: {
      city: "Bareilly",
      state: "Uttar Pradesh",
      key: {
        _id: "66c3ab28dc5e92c6ea662626",
        name: "Allen Beck",
        gender: "male",
        company: "HAWKSTER",
        email: "allenbeck@hawkster.com",
        phone: 283839389,
        secondKey: {
          _id: "66c3ab28dc5e92c6ea662626",
          name: "Allen Beck",
          gender: "female",
          company: "HAWKSTER",
          email: "allenbeck@hawkster.com",
          phone: "+1 (866) 599-3761",
        },
      },
    },
    sampleData: [
      {
        _id: "66c3ab28dc5e92c6ea662626",
        name: "Allen Beck",
        gender: "male",
        company: "HAWKSTER",
        email: "allenbeck@hawkster.com",
        phone: "+1 (866) 599-3761",
        secondKey: {
          _id: "66c3ab28dc5e92c6ea662626",
          name: "Allen Beck",
          gender: "male",
          company: "HAWKSTER",
          email: "allenbeck@hawkster.com",
          phone: "+1 (866) 599-3761",
          thirdKey: {
            _id: "66c3ab28dc5e92c6ea662626",
            name: "Allen Beck",
            gender: "male",
            company: "HAWKSTER",
            email: "allenbeck@hawkster.com",
            phone: "+1 (866) 599-3761",
          },
        },
      },
      {
        _id: "66c3ab28cdadb9ffd1e92675",
        name: "Walters Mullen",
        gender: "male",
        company: "BOILICON",
        email: "waltersmullen@boilicon.com",
        phone: "+1 (911) 573-2834",
      },
    ],
    hobbies: ["Movies", "Music"],
  };

  const editbaleFieldsObject: EditableFielsdObjectType = {
    dob: {
      type: "date",
      format: "DD/MM/YYYY",
    },
    about: {
      type: "textArea",
    },
    "address.state": {
      type: "select",
      options: indianStatesOptions,
    },
    "address.key.phone": {
      type: "number",
    },
    "sampleData.email": {
      type: "string",
      validations: {
        regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        regexValidationMessage: "Please enter a valid email address.",
      },
    },
    "address.key.gender": {
      type: "radio",
      options: [
        { key: "male", value: "male" },
        { key: "female", value: "female" },
        { key: "others", value: "others" },
      ],
    },
    "address.key.secondKey.gender": {
      type: "radio",
      options: [
        { key: "male", value: "male" },
        { key: "female", value: "female" },
        { key: "others", value: "others" },
      ],
    },
    "sampleData.secondKey.gender": {
      type: "radio",
      options: [
        { key: "male", value: "Male" },
        { key: "female", value: "Female" },
        { key: "other", value: "Other" },
      ],
    },
  };

  const nonEditbaleFieldObject: NonEditableFieldsObjectType = {
    name: true,
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-5">Json Editor</h1>
      <div className="flex items-center mb-4">
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Read Mode" : "Edit Mode"}
        </Button>
        <Button className="ml-2" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>
      <JsonEditor
        allFieldsEditable={true}
        json={x}
        isEditing={isEditing}
        editableFields={editbaleFieldsObject}
        nonEditableFields={nonEditbaleFieldObject}
        isExpanded={isExpanded}
      />
    </div>
  );
}

export default App;
