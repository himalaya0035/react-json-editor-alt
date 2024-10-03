# editingConfig 

The `editingConfig` prop is the core configuration for defining how the JSON Editor behaves in terms of user interaction, field editing, and rendering. This configuration allows you to control which fields are editable, how they are displayed, and which validation rules apply.

#### Example Usage

```jsx
<JsonEditor
  json={json}
  editingConfig={{
    editingMode: "inline", // defaults to inline
    allFieldsEditable: true, // default to true
    debouncing: false, // defaults to true
    enableTypeBasedRendering: true, // defaults to true
    editableFields: editableFieldObject,
    nonEditableFields: nonEditableFieldsObject,
  }}
/>
```

#### `1.editingMode` (string, optional)

Defines how the fields are edited within the JSON Editor. The supported modes are:

- `inline`: Directly edit individual fields by clicking the edit icon next to them.
- `global`: Enter a global editing state, where all fields are editable simultaneously, with a global submit button.
- `individual`:  All fields are editable simultaneously but each field has its own submit button for individual updates.
- `global-individual`: A hybrid mode where both global and individual submissions are allowed.

**Default**: `inline`

#### `2.allFieldsEditable` (boolean, optional)

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


#### `3.editableFields` (object, optional)

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

#### `4.nonEditableFields` (object, optional)

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

#### `5.debouncing` (boolean, optional)

Controls whether input changes are debounced. Debouncing is useful for performance optimization, particularly when handling continuous input changes (such as typing).

- `true`: Input changes are debounced, reducing the number of times the `onChange` callback is fired.
- `false`: Input changes are processed instantly, and validation messages (if any) are shown immediately.

**Default**: `true`

#### `6.enableTypeBasedRendering` (boolean, optional)

Enables automatic rendering of input fields based on the type of the JSON value. This means you don't have to explicitly define the field type in the `editableFields` object for basic types like `boolean` and `number`.

For example:
- A boolean field (`isAdult: true`) will be rendered as a true/false toggle.
- A number field (`age: 23`) will be rendered as a number input.

If set to `false`, the editor will default to rendering all fields as text inputs unless explicitly defined in `editableFields`.

**Default**: `true`

***

### Validations

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

