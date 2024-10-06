# REACT JSON EDITOR 

The **React JSON Editor** is a flexible and easy-to-use tool for rendering and editing JavaScript objects or JSON data in React applications. It lets developers set up editable and non-editable fields, add validation, and display inputs like select, boolean, radio, textarea, etc., based on field types and editing configuarations ensuring a smooth user experience.

![GitHub license](https://img.shields.io/github/license/himalaya0035/chrome-extension-boilerplate-react-vite-typescript)
![React](https://img.shields.io/badge/react-18.x-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-3.x-blue)
![Vite](https://img.shields.io/badge/vite-5.x-blue)


## Why Use This Library?

- ✏️ **Dynamic JSON Editing**: Define which fields are editable or non-editable at a granular level.
- ⚙️ **Flexible Field Rendering**: Configure editable fields to be displayed as dropdowns, radio buttons, boolean toggles, text areas, or other input types.
- 🔧 **Advanced Validation**: Support for length-based, regex-based, and number-specific validations (min/max values) to ensure data accuracy.
- 🔄 **Multiple Editing Modes**: Seamlessly switch between `inline`, `global`, `individual`, or `global-individual` editing modes, providing a tailored experience based on the use case.
- 🧩 **Type-Based Rendering**: Automatically render input types for common JSON values such as booleans and numbers without explicit configuration.
- ⚡ **Performance Optimizations**: Features like debouncing help ensure smooth and responsive interactions, even for large JSON structures.

Whether you're building complex forms, handling flexible data, or need a customizable JSON editor, this library offers the tools to do it efficiently and easily.

## Quick Start Guide

Get started with the **React JSON Editor** in just a few steps! For detailed documentation, refer to the in depth guide: [DOCS](DOCS.md).

### Step 1: Installation

To install the library, use npm or yarn:

```bash
npm install react-json-editor-alt
```

**or**

```bash
yarn add react-json-editor-alt
```

### Step 2: Import the Component
Import the `JsonEditor` component into your desired React component file:

```jsx
import JsonEditor from 'react-json-editor-alt';
```

### Step 3: Basic Usage

```jsx
import { useState } from 'react';
import JsonEditor from 'react-json-editor-alt';

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
    setJsonData(props.updatedJson);
  };

  const handleSubmit = (props) => {
    console.log(props)
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
          editingMode: 'inline', // or 'global', 'individual', 'global-individual'
          editableFields: {
            "name" : {
              type : "string",
              validations : {
                maxLength :30
              }
            },
            "bio" : {
              type : "textarea"
            }
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

### Step 4: Customizing the Editor
You can customize the editor by adjusting the `editingConfig` prop. This allows you to define editable and non-editable fields, validation rules, and more. Refer to the [editingConfig prop docs](DOCS.md/#editingconfig) for details.

## API Reference

This section provides a brief overview of the props used in the **React JSON Editor**. Each prop's type, purpose, and whether it is required or optional is outlined below.

### JsonEditor Props

| Prop Name         | Type           | Required | Description                                                                                           |
|-------------------|----------------|----------|-------------------------------------------------------------------------------------------------------|
| `json`            | `object`       | Yes      | The JSON data or JavaScript object to be rendered and edited.                                        |
| `onChange`        | `function`     | No       | Callback function triggered when a user modifies an editable field in the JSON editor.                                            |
| `onSubmit`        | `function`     | No       | Callback function called when the user submits the changes made in the editor.                       |
| `editingConfig`   | `object`       | No      | Configuration Object that controls editing behavior, specifying editable and non-editable fields along with their validations.             |
| `isExpanded`      | `boolean`      | No       | Controls whether the editor is expanded or collapsed.                                          |
| `className`       | `string`       | No       | Custom CSS class for styling the editor component.                                                   |
| `styles`          | `object`       | No       | Inline styles to be applied to the editor component.                                                 |
| `globalSubmitButtonConfigs`   | `object`       | No      | Configuration Object to customise global submit button in `global` and `global-individual` editing mode.        |

### onChange|onSubmit Props Types

| Property       | Type               | Description   ||
|----------------|--------------------|----------|-----------------------------------------------------------------------------------------------------------|
| `initialJson`  | `Record<string, any>`     | The JSON object representing the initial state before any changes were made.                              |
| `updatedJson`  | `Record<string, any>`      | The JSON object reflecting the state after changes have been applied, including all updates.              |
| `updatedKeys`  | `DiffKeyValues`          | An object mapping the keys that were modified, with each key containing its `initial` and `updated` values. |
| `editorMode`   | `EditorMode`           | Indicates the current editing mode, which can be one of `global`, `individual`, `global-individual`, or `inline`. |
| `submitType`   | `Exclude<EditorMode,'global-individual'>`           | Received only in the `onSubmit` callback handler. Specifies the type of submission, which can be `global`, `individual`, or `inline`. | |


### Editing Config Props

| Prop Name                | Type           | Required | Description                                                                                           |
|--------------------------|----------------|----------|-------------------------------------------------------------------------------------------------------|
| `isEditing`       | `boolean`      | No       | Determines whether the editor is in editing mode. Not required in `inline` editing mode.                |
| `editingMode`            | `string`       | No       | Defines how fields are edited (e.g., `inline`, `global`, `individual`, or `global-individual`).                          |
| `allFieldsEditable`      | `boolean`      | No       | Indicates whether all fields are editable by default.                                               |
| `editableFields`         | `object`       | No       | Specifies which fields are editable along with their types and validations.                          |
| `nonEditableFields`      | `object`       | No       | Specifies which fields are non-editable, overriding the editableFields settings.                     |
| `debouncing`             | `boolean`      | No       | Controls if input changes are debounced for performance optimization.                                 |
| `enableTypeBasedRendering`| `boolean`      | No       | Enables automatic rendering of input fields based on the type of the JSON value.                    |

### Global Submit Button Configs

| Property       | Type              | Required | Description                                                                                       |
|----------------|-------------------|----------|---------------------------------------------------------------------------------------------------|
| `variant`      | `string`          | No       | Specifies the variant style of the button. Options include `"secondary"`, `"outline"`, `"ghost"`, `"link"`, and `"destructive"`. |
| `className`    | `string`          | No       | Custom CSS class for styling the button. Allows for additional styling options beyond default styles. |
| `buttonText`   | `string`          | No       | Text to be displayed on the button. This provides a straightforward way to set the button label.  |
| `children`     | `React.ReactNode`  | No       | Allows for the inclusion of nested React components or elements within the button, enabling complex content. |

## Examples/Demo

Examples are the best way to grasp the functionality of any library. A demo site for the React JSON Editor will be live soon. In the meantime, please refer to the [official documentation](DOCS.md) for examples and usage guidelines to help you get started. Thank you for your patience!

## Planned Features

We are currently working on some exciting features for our next release. To make our library even better, we’d love to hear your thoughts! Please specify which features you would like to see implemented next. Your feedback is invaluable in shaping the future of this library.

Feel free to request features by creating an issue in our [GitHub repository](https://github.com/himalaya0035/react-json-editor-adv/issues) or participating in the discussions.

**Note**: The React JSON Editor works best in projects where Tailwind CSS is already installed. In projects without Tailwind, there may be instances where global styles of other components could be affected. We are addressing this issue for future releases.

## Contributing

Contributions are welcome! If you encounter any issues or have ideas for improvements, feel free to open an issue or submit a pull request.

To get started:

1. Fork the repository and clone it locally.
2. Install dependencies: `npm install`
3. Create a new branch: `git checkout -b feature-name`
4. Make your changes and commit: `git commit -m 'Add some feature'`
5. Push to your branch and open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Support

⭐️ If you find this library useful, consider giving it a star on [GitHub](https://github.com/himalaya0035/react-json-editor-alt).

---

Happy coding! If you have any questions or need further assistance, please don't hesitate to reach out.

