import GlobalIndiviualModeExample from "./globalIndividualExample";
import GlobalModeExample from "./globalModeExample";
import IndividualModeExample from "./individualModeExample";
import InlineModeExample from "./inlineModeExample";

function Example() {
  const exampleJson = {
    name: "John Doe",
    age: 30,
    isAdult: true,
    gender: "male",
    description: "Hey, I am a software developer!",
    education: [
      {
        degree: "Bachelor of Science",
        major: "Computer Science",
        university: "Tech University",
        graduationYear: 2015,
      },
      {
        degree: "Master of Science",
        major: "Software Engineering",
        university: "Advanced Institute of Technology",
        graduationYear: 2017,
      },
    ],
    hobbies: ["coding", "reading", "hiking", "photography"],
    contact: {
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      address: {
        street: "123 Tech Lane",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        country: "USA",
      },
    },
  };

  const editableFieldObject: Record<string, any> = {
    gender: {
      type: "radio",
      options: [
        { key: "male", value: "male" },
        { key: "female", value: "female" },
        { key: "others", value: "others" },
      ],
    },
    description: {
      type: "textArea",
      validations: {
        minLength: 1,
        maxLength: 100,
      },
    },
    "contact.email": {
      type: "string",
      validations: {
        regex: /^[^@]+@[^@]+\.[^@]+$/,
        regexValidationMessage: "Please enter a valid email address.",
      },
    },
    "contact.address.country": {
      type: "select",
      options: [
        { key: "India", value: "India" },
        { key: "USA", value: "USA" },
      ],
    },
    "education.[].graduationYear": {
      // can target multiple array entries using []
      type: "number",
      validations: {
        maxValue: new Date().getFullYear(),
        minLength: 4,
        maxLength: 4,
        validationMessage: `Please enter a valid year and the year can't be greater than ${new Date().getFullYear()}`,
      },
    },
    "education.0.major": {
      // can target specific array item
      type: "string",
      validations: {
        maxLength: 30,
      },
    },
    "hobbies.1": {
      // can target specific array item
      type: "string",
      validations: {
        maxLength: 20,
      },
    },
  };

  const nonEditableFieldsObject: Record<string, any> = {
    name: true,
    "education.[].degree": true,
    "contact.phone": true,
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Examples</h1>
      <InlineModeExample
        json={exampleJson}
        editableFieldObject={editableFieldObject}
        nonEditableFieldsObject={nonEditableFieldsObject}
      />
      <GlobalModeExample
        json={exampleJson}
        editableFieldObject={editableFieldObject}
        nonEditableFieldsObject={nonEditableFieldsObject}
      />
       <IndividualModeExample
        json={exampleJson}
        editableFieldObject={editableFieldObject}
        nonEditableFieldsObject={nonEditableFieldsObject}
      />
       <GlobalIndiviualModeExample
        json={exampleJson}
        editableFieldObject={editableFieldObject}
        nonEditableFieldsObject={nonEditableFieldsObject}
      />
    </div>
  );
}

export default Example;
