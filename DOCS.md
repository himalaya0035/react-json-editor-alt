# Documentation

Welcome to the documentation for the React JSON Editor Library. This guide provides detailed information on how to effectively integrate and utilize the library in your React applications. You will find information on installation, configuration, available props, and usage examples to help you get started quickly and easily.

## Installation

To install the library, use npm or yarn:

```bash
npm install react-json-editor-alt
```

**or**

```bash
yarn add react-json-editor-alt
```

## Basic Usage

Import the `JsonEditor` component into your desired React component file:

```jsx
import {JsonEditor} from 'react-json-editor-alt';
```

### Step 3.1: Basic Usage

```jsx
import { useState } from 'react';
import {JsonEditor} from 'react-json-editor-alt';

const App = () => {
  const [jsonData, setJsonData] = useState({
    name: "John Doe",
    age: 30,
    active: true
  });

  const handleChange = (props) => {
    console.log(props.updatedKeys)
  };

  return (
    <JsonEditor
      json={jsonData}
      onChange={handleChange}
    />
  );
};

export default App;
```

### Step 3.2: Advanced Usage

```jsx
import { useState } from 'react';
import {JsonEditor} from 'react-json-editor-alt';

const App = () => {
  const [jsonData, setJsonData] = useState({
    name: 'John Doe',
    id : "DOZJHAH12",
    age: 30,
    isActive: true,
    bio : "Sample bio for john doe",
    gender: "male",
    contact: {
        email : "test@gmail.com",
        country : "USA"
    }
  });

  const handleChange = (props) => {
    console.log(props)
  };

  const handleSubmit = (props) => {
    setJsonData(props.updatedJson);
  }

  return (
    <div style={{
      padding : "20px"
    }}>
      <h1>My JSON Editor</h1>
      <JsonEditor
        json={jsonData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editingConfig={{
          //  isEditing : true, // true/false, comment out in case of modes other than inline
          editingMode: 'inline', // or 'global', 'individual', 'global-individual',
          editableFields: {
            "name" : {
              type : "string",
              validations : {
                maxLength :30
              }
            },
            "bio" : {
              type : "textArea"
            },
            "gender": {
                type: "radio",
                options: [
                  { key: "male", value: "male" },
                  { key: "female", value: "female" },
                  { key: "other", value: "other" },
                ],
            },
            "contact.email" : {
                type: "string",
                validations: {
                    regex: /^[^@]+@[^@]+\.[^@]+$/,
                    regexValidationMessage: "Please enter a valid email address.",
                },
            },
            "contact.country" : {
              type : "select",
              options : [
                {key : "USA", value : "USA"}, 
                {key : "India", value : "India"}
              ]
            }
          },
          nonEditableFields: {
            "id" : true
          }
        }}
      />
    </div>
  );
};

export default App;
```

## JSON Editor Props

### `1.json` (object, required)

The JSON data or JavaScript object to be rendered and edited. The `json` prop must be passed and cannot be `null`, as the editor's primary function is to modify and display this data.

```jsx
<JsonEditor
  json={{
    "name" : "John Doe",
    "contact" : {
      "email" : "john.doe@gmail.com"
    } 
  }}
/>
```

### `2.onChange` (function, optional)

The `onChange` callback function is triggered when a user modifies an editable field in the JSON editor.

### `3.onSubmit` (function, optional)

The `onSubmit` Callback function is triggered when the user submits the changes made in the editor.

#### onChange|onSubmit Props Types

| Property      | Type                                      | Description                                                                                                                           |     |
| ------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `initialJson` | `Record<string, any>`                     | The JSON object representing the initial state before any changes were made.                                                          |
| `updatedJson` | `Record<string, any>`                     | The JSON object reflecting the state after changes have been applied, including all updates.                                          |
| `updatedKeys` | `DiffKeyValues`                           | An object mapping the keys that were modified, with each key containing its `initial` and `updated` values.                           |
| `editorMode`  | `EditorMode`                              | Indicates the current editing mode, which can be one of `global`, `individual`, `global-individual`, or `inline`.                     |
| `submitType`  | `Exclude<EditorMode,'global-individual'>` | Received only in the `onSubmit` callback handler. Specifies the type of submission, which can be `global`, `individual`, or `inline`. |     |

The submitType prop is helpful in cases where you need to perform actions based on the type of submission. For instance, you might want to switch the editor to read-only mode after a global submission, but not when the user submits an individual field.

### `4.isExpanded` (boolean, optional)

Determines whether the editor should be expanded or collapsed by default. 

- `true`: The editor will show all nested keys expanded upon loading.
- `false`: The editor will start in a collapsed state, hiding nested keys until they are explicitly expanded by the user.

**Default**: `false`

The optimal approach is to create a state that allows the user to expand or collapse the nested fields in the JSON editor.

**For example**

```jsx
function IsExpandedExample() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center gap-1">
        <Button className="ml-2" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>
      <JsonEditor
        json={json}
        isExpanded={isExpanded} // defaults to false
      />
    </>
  );
}
```
**Collapsed Mode**

![Collapsed](/src/assets/collapsed.png)

**Expanded Mode**
![Expanded](/src/assets/expanded.png)

### `5.className` (string, optional)

Allows the user to apply a custom CSS class to the editor component for styling purposes.


### `6.styles` (object, optional)

Accepts an object of inline styles that will be applied directly to the editor component. 

### `7.editingConfig` (**Important**)

---

The `editingConfig` prop is the core configuration for defining how the JSON Editor behaves in terms of user interaction, field editing, and rendering. This configuration allows you to control which fields are editable, how they are displayed, and which validation rules apply.

#### Example Usage

**Inline Mode**
```jsx
<JsonEditor
  json={json}
  editingConfig={{
    editingMode: "inline", // defaults to inline
    allFieldsEditable: true, // default to true
    debouncing: false, // defaults to false
    enableTypeBasedRendering: true, // defaults to true
    editableFields: editableFieldObject,
    nonEditableFields: nonEditableFieldsObject,
  }}
/>
```

**Other Modes**

```jsx
const [isEditing, setIsEditing] = useState(false);

<JsonEditor
  json={json}
  editingConfig={{
    isEditing: true, // defaults to false
    editingMode: "global", // defaults to inline
    allFieldsEditable: true, // default to true
    debouncing: false, // defaults to false
    enableTypeBasedRendering: true, // defaults to true
    editableFields: editableFieldObject,
    nonEditableFields: nonEditableFieldsObject,
  }}
/>
```


#### `7.1 editingMode` (string, optional)

Defines how the fields are edited within the JSON Editor. The supported modes are:
- `inline`: Directly edit individual fields by clicking the edit icon next to them.
  ![Inline Mode Example](/src/assets/InlineModeExample.png)


- `global`: Enter a global editing state, where all fields are editable simultaneously, with a global submit button.
  ![Global Mode Example](/src/assets//GlobaModeExample.png)


- `individual`:  All fields are editable simultaneously but each field has its own submit button for individual updates.
- ![Individual Mode example](/src/assets/IndividualModeExample.png)
  

- `global-individual`: A hybrid mode where both global and individual submissions are allowed.
  ![Global-individual mode example](/src/assets/GlobalIndividiualModeExample.png)

**Default**: `inline`

#### `7.2 isEditing` (boolean, optional)

Determines whether the editor is in reading or editing mode. This prop is essential when using modes other than `inline` to switch between the two states.

- `true`: The editor is in editing mode, allowing the user to modify the fields.
- `false`: The editor is in reading mode, preventing any changes to the fields.

**Note**: In `inline` mode, the `isEditing` prop has no effect. It is only applicable in `global`, `individual`, and `global-individual` modes, where it must be used to control the editability of the entire editor or specific fields.

**Default**: `false`

#### `7.3 allFieldsEditable` (boolean, optional)

Determines whether all fields are editable by default.

- `true`: All fields are editable unless explicitly mentioned in the `nonEditableFields` object.
- `false`: All fields are non-editable unless explicitly mentioned in the `editableFields` object.

This setting is useful when specifying exceptions. For instance, if most fields should be editable, but a few should not, set this to `true` and specify the non-editable fields and vice versa.

**Default**: `true`

#### Use Case:

```jsx
<JsonEditor
  json={exampleJson}
  editingConfig={{
    allFieldsEditable: true,
    nonEditableFields: {
      "name": true,
      "contact.email": true
    }
  }}
/>
```
Here, all fields are editable in json except `name` and `contact.email`.

#### `7.4 editableFields` (object, optional)

A JSON object specifying which fields are editable and the types or validations they should follow. You can define custom fields with their own input types (`string`, `number`, `textarea`, `boolean`, `radio`, `select`) and validations.

Each key in the `editableFields` object corresponds to a JSON path, and its value specifies the type of input and validations for that field.

#### Example Editable Fields Configuration:

```jsx
const editableFieldsObject = {
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
    type: "number",
    validations: {
      maxValue: new Date().getFullYear(),
      minLength: 4,
      maxLength: 4,
      validationMessage: `Please enter a valid year. The year can't be greater than ${new Date().getFullYear()}`,
    },
  },
  "hobbies.1": {
    type: "string",
    validations: {
      maxLength: 20,
    },
  },
}
```
#### Editable Field Types:

- `string`: Default field type. Renders a text input.
- `number`: Renders a number input.
- `textArea`: Renders a textarea input with optional length validations.
- `boolean`: Renders a toggle between `true`/`false`.
- `radio`: Renders radio button options.
- `select`: Renders a dropdown with options.

#### Field Validations:

- `minLength` / `maxLength`: Set limits for the length of the input value.
- `regex`: Apply a regular expression for validation.
- `validationMessage` / `regexValidationMessage`: Display a custom error message when validation fails.

Please find more details on validation in the [Validation Section](#validations).

#### `7.5 nonEditableFields` (object, optional)

A JSON object that specifies which fields are not editable. This is especially useful when `allFieldsEditable` is set to `true`, allowing you to disable specific fields.

Each key in `nonEditableFields` corresponds to a JSON path, and its value should be `true` to make the field non-editable.

#### Example Non-Editable Fields:

```jsx
const nonEditableFieldsObject = {
  name: true,
  "contact.phone": true,
};
```
In this example `name` and `contact.phone` are not editable.

Note: If a field is present in both editableFields and nonEditableFields, the non-editable field takes precedence and the field becomes non-editable.

#### 💡 Special JSON Paths: Array Field Targeting

When working with arrays in your JSON structure, it can be cumbersome to manually specify validation rules or field types for every element in the array. To simplify this, you can use a special syntax in the `editableFields` and `nonEditableFields` paths by including `[]` in place of array indices.

#### Usage of `[]` for Array Fields

If you have an array of objects and want to apply a validation or field type to the same key in every object in the array, you can target all elements at once by using `[]` in the path.

For example:

```json
{
  "education": [
    { "graduationYear": 2015 },
    { "graduationYear": 2018 },
    { "graduationYear": 2020 }
  ]
}
```

You can target the `graduationYear` field across all objects in the education array by using the path `education.[].graduationYear` instead of writing it out for every index (`education.0.graduationYear`, `education.1.graduationYear`, etc.).

```jsx
const editableFieldObject = {
  "education.[].graduationYear": {
    "type": "number",
    "validations": {
      "minValue": 1900,
      "maxValue": new Date().getFullYear(),
      "validationMessage": "Please enter a valid graduation year."
    }
  }
}
```

This ensures that the `graduationYear` field in every object within the education array follows the same validation rules and uses the same input type (number).

#### More Specific Paths Take Precedence
If you want to apply a specific rule or field type to one particular item in the array, you can do so by specifying the index of the element. More specific paths take precedence over general paths using [].

**For example:**

```jsx
{
  "education.[].graduationYear": {
    "type": "number",
    "validations": {
      "minValue": 1900,
      "maxValue": new Date().getFullYear(),
      "validationMessage": "Please enter a valid graduation year."
    }
  },
  "education.1.graduationYear": {
    "type": "string",
    "validations": {
      "maxLength": 4,
      "validationMessage": "Graduation year must be a string of 4 characters."
    }
  }
}
```

All elements in the education array will have the graduationYear field as a number with a minimum and maximum value, except for `education[1]`.
For `education[1]`, the graduationYear field will be treated as a string with a maxLength validation of 4 characters.

This feature helps keep the configuration concise and avoids redundant definitions, while still allowing fine-tuned control over individual array elements when needed.

#### `7.6 debouncing` (boolean, optional)

Controls whether input changes are debounced. Debouncing is useful for performance optimization, particularly when handling continuous input changes (such as typing).

- `true`: Input changes are debounced, reducing the number of times the `onChange` callback is fired.
- `false`: Input changes are processed instantly, and validation messages (if any) are shown immediately.

**Note**: Setting `debouncing` to true can significantly improve performance when working with large JSON objects. However, for smaller JSONs, the effect may be negligible. However, with debouncing set to true, validation messages will be delayed by 300ms after the user stops typing, as immediate validation is deferred to optimize performance.

**Default**: `false`


#### `7.7 enableTypeBasedRendering` (boolean, optional)

Enables automatic rendering of input fields based on the type of the JSON value. This means you don't have to explicitly define the field type in the `editableFields` object for basic types like `boolean` and `number`.

For example:
- A boolean field (`isAdult: true`) will be rendered as a true/false toggle.
- A number field (`age: 23`) will be rendered as a number input.

If set to `false`, the editor will default to rendering all fields as text inputs unless explicitly defined in `editableFields`.

**Default**: `true`

---

### `8.globalSubmitButtonConfigs`

A configuration Object to customise global submit button in `global` and `global-individual` editing mode.  

#### `8.1 variant` (string, optional)

Defines the visual style of the button. You can choose from the following options:

- `"secondary"`: A standard secondary button style.
- `"outline"`: A button with an outlined style.
- `"ghost"`: A transparent button with minimal styling.
- `"link"`: A button that resembles a hyperlink.
- `"destructive"`: A button styled to indicate a destructive action (e.g., delete).

#### `8.2 className` (string, optional)

A custom CSS class that can be added to the button for styling purposes. This allows you to apply additional styles or override default styles to match your application's design.

#### `8.3 buttonText` (string, optional)

The text that will be displayed on the button. This prop provides a simple way to set the button's label to communicate its action clearly to users.

#### `8.4 children` (React.ReactNode, optional)

Enables the inclusion of nested React components or elements within the button. This allows for more complex button content, such as icons or additional text elements, providing greater flexibility in design.

### Example

```jsx
  <JsonEditor
    json={json}
    globalSubmitButtonConfigs={{
      variant : "secondary",
      buttonText : "Submit JSON",
      className : "rounded",
    }}
  />
```

## Validations

The `validations` object is applicable to the following field types:

- `string`
- `number`
- `textarea`

The validation can be defined using either basic length-based properties or regex-based validation. Here’s how they work:

#### 1.Basic Length Validation:

- `minLength`: Specifies the minimum number of characters allowed.
- `maxLength`: Specifies the maximum number of characters allowed.
- `validationMessage`: A custom message to be shown to the user if the validation fails. If no custom message is provided, a default message will be displayed.

**Example:**

```json
"description": {
  "type": "textArea",
  "validations": {
    "minLength": 10,
    "maxLength": 100,
    "validationMessage": "Description must be between 10 and 100 characters."
  }
}
```

#### 2.Regex Validation:

- `regex`: Allows you to define a custom regular expression for validation. This is useful for more complex validations like email formats or phone numbers.
- `regexValidationMessage`: A custom message to be shown to the user if the regex validation fails. Like `validationMessage`, if no custom message is provided, a default message will be shown.

#### Example:

```json
"contact.email": {
  "type": "string",
  "validations": {
    "regex": /^[^@]+@[^@]+\.[^@]+$/,
    "regexValidationMessage": "Please enter a valid email address."
  }
}
```

**Note**: When using regex validation, it can cover most validation needs, so the length properties like minLength or maxLength aren't needed, as regex itself can handle these checks.

#### 3.Number Field-Specific Validation

For `number` type fields, additional properties can be used to set minimum and maximum values:

- `minValue`: Specifies the minimum value allowed for the field.
- `maxValue`: Specifies the maximum value allowed for the field.

#### Example:

```json
"education.[].graduationYear": {
  "type": "number",
  "validations": {
    "minValue": 1900,
    "maxValue": new Date().getFullYear(),
    "validationMessage": "Please enter a valid graduation year between 1900 and the current year."
  }
}
```
## Examples
Examples are the most effective way to understand a library’s functionality. Visit [examples](https://himalaya0035.github.io/react-json-editor-alt/) to see what's available. Currently, only a few examples are provided, but we plan to add more soon. In the meantime, please refer to this official documentation. Thank you for your patience!

## Community and Support

We hope this documentation has helped you get the most out of the React JSON Editor. If you have any questions, encounter issues, or want to request features, feel free to open an issue or contribute directly via GitHub. We value your feedback and are always working to improve the library.

Stay tuned for future updates, and thank you for using the React JSON Editor!

If you find this library useful, consider giving it a **star** on [GitHub](https://github.com/himalaya0035/react-json-editor-alt).

