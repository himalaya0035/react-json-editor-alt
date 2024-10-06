import { useState } from 'react';
import JsonEditor from './components/JsonEditor/jsonEditor';

const App = () => {
  const [jsonData, setJsonData] = useState({
    name: 'John Doe',
    id: "DOZJHAH12",
    age: 30,
    isActive: true,
    bio: "Sample bio for John Doe",
    gender: "male",
    contact: {
      email: "test@gmail.com",
      country: "USA"
    }
  });

  type EditorMode = 'global' | 'individual' | 'global-individual' | 'inline'

  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingMode, setEditingMode] = useState<EditorMode>("inline"); // or 'global', 'individual', 'global-individual'

  const handleChange = (props:any) => {
    setJsonData(props.updatedJson);
  };

  const handleSubmit = (props:any) => {
    if (props.submitType === "global"){
      setIsEditing(false)
    }
    console.log(props);
  };

  const styles = {
    container: {
      padding: "20px",
      margin: "0 auto",
      fontFamily: "'Arial', sans-serif",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "15px",
    },
    button: {
      background: "#ddd",
      padding: "8px 12px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      marginBottom: "15px",
      marginRight: "10px",
      transition: "background-color 0.3s",
    },
    buttonInactive: {
      background: "#ddd",
      color: "#333",
      cursor: "pointer",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    select: {
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      marginBottom: "15px",
      display: "block",
    },
    modeInfo: {
      fontSize: "15px",
      marginBottom: "10px",
    },
    note: {
      fontSize: "15px",
      marginBottom:"10px"
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Example/Demo: editingMode</h1>
      
      <label htmlFor="editingMode" style={styles.label}>Toggle Editing Mode:</label>
      <select
        value={editingMode}
        onChange={(e:any) => setEditingMode(e.target.value)}
        id="editingMode"
        style={styles.select}
      >
        <option value="inline">inline</option>
        <option value="global">global</option>
        <option value="individual">individual</option>
        <option value="global-individual">global-individual</option>
      </select>

      {editingMode === "inline" && (
        <p style={styles.modeInfo}>
          <strong>Inline</strong>: Directly edit individual fields by clicking the edit icon next to them.
        </p>
      )}
      
      {editingMode === "global" && (
        <p style={styles.modeInfo}>
          <strong>Global</strong>: Enter a global editing state, where all fields are editable simultaneously, with a global submit button.
        </p>
      )}
      
      {editingMode === "individual" && (
        <p style={styles.modeInfo}>
          <strong>Individual</strong>: All fields are editable simultaneously but each field has its own submit button for individual updates.
        </p>
      )}
      
      {editingMode === "global-individual" && (
        <p style={styles.modeInfo}>
          <strong>Global-Individual</strong>: A hybrid mode where both global and individual submissions are allowed.
        </p>
      )}
      
      {editingMode === "inline" && (
        <p style={styles.note}>
          <strong>Note:</strong> In inline mode, the <code>isEditing</code> prop has no effect. It is only applicable in global, individual, and global-individual modes, where it must be used to control the editability of the entire editor or specific fields.
        </p>
      )}
      

      {editingMode !== "inline" && (
        <button
          style={styles.button}
          onClick={() => setIsEditing(prev => !prev)}
        >
          {isEditing ? "Read Mode" : "Edit Mode"}
        </button>
      )}

      <button
        style={styles.button}
        onClick={() => setIsExpanded(prev => !prev)}
      >
        {isExpanded ? "Collapse" : "Expand"}
      </button>
      
      <JsonEditor
        json={jsonData}
        isExpanded = {isExpanded}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editingConfig={{
          isEditing: isEditing,
          editingMode: editingMode,
          editableFields: {
            "name": {
              type: "string",
              validations: {
                maxLength: 30
              }
            },
            "bio": {
              type: "textArea"
            },
            "gender": {
              type: "radio",
              options: [
                { key: "male", value: "male" },
                { key: "female", value: "female" },
                { key: "other", value: "other" }
              ]
            },
            "contact.email": {
              type: "string",
              validations: {
                regex: /^[^@]+@[^@]+\.[^@]+$/,
                regexValidationMessage: "Please enter a valid email address."
              }
            },
            "contact.country": {
              type: "select",
              options: [
                { key: "USA", value: "USA" },
                { key: "India", value: "India" }
              ]
            }
          },
          nonEditableFields: {
            "id": true
          }
        }}
      />
     <strong style={{
      display : "block",
      marginTop : "10px"
     }}>More examples are coming soon!</strong>
    </div>
  );
};

export default App;
