import { useState } from "react";
import JsonEditor from "./components/JsonEditor/jsonEditor";
import {
  EditableFielsdObjectType,
  NonEditableFieldsObjectType,
  onChangePropsType,
  OnSubmitPropsType,
} from "./types/JsonEditor.types";
import { indianStatesOptions } from "./temp";
import { Button } from "./components/ui/button";
import { GLOBAL_EDITING_MODE } from "./constants/constants";

function App() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const x: Record<string, any> = {
    name: "Himalaya",
    surname: "Gupta",
    age : 23,
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
    surname : {
      type : "string",
      validations : {
        maxLength: 12
      }
    },
    age : {
      type : "number",
      validations : {
        minValue:1,
        maxValue: 50,
      }
    },
    about: {
      type: "textArea",
      validations : {
        minLength : 1,
      }
    },
    "address.state": {
      type: "select",
      options: indianStatesOptions,
    },
    "address.key.phone": {
      type: "number"
    },
    "sampleData.email": {
      type: "string",
      validations: {
        regex: /^[^@]+@[^@]+\.[^@]+$/,
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
    "sampleData.0.secondKey.gender": {
      type: "radio",
      options: [
        { key: "male", value: "male" },
        { key: "female", value: "female" },
        { key: "other", value: "other" },
      ],
    },
    "hobbies.0" : {
      type : "textArea",
    },
  };

  const nonEditbaleFieldObject: NonEditableFieldsObjectType = {
    name: true,
  };

  const onSubmit = (props : OnSubmitPropsType) => {
    console.info(props)
    if (props.submitType === GLOBAL_EDITING_MODE){
      setIsEditing(false)
    }
  }

  const onChange = (props : onChangePropsType) => {
    console.info(props)
  }

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
        json={x}
        isExpanded={isExpanded}
        onSubmit={onSubmit}
        onChange={onChange}
        editingConfig={{
          editingMode : 'inline',
          debouncing : true,
          editableFields : editbaleFieldsObject,
          nonEditableFields: nonEditbaleFieldObject
        }}
      />
    </div>
  );
}

export default App;
