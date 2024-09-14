type Validations = {
  minLength?: number;
  maxLength?: number;
  isZeroAllowed?: boolean;
  regex?: string;
  regexValidationMessage?: string;
};

type NumberField = {
  type: "number";
  validations?: Validations;
};

type StringField = {
  type: "string";
  validations?: Validations;
};

type TextAreaField = {
  type: "textArea";
  validations?: Validations;
};

type SelectField = {
  type: "select";
  options: Array<{ key: string; value: string }>;
};

type RadioField = {
  type: "radio";
  options: Array<{ key: string; value: string }>;
};

type RootField = {
  type: "root";
};

type DateFormat =
  | "DD/MM/YYYY"
  | "YYYY/MM/DD"
  | "MM/DD/YYYY"
  | "DD-MM-YYYY"
  | "YYYY-MM-DD"
  | "MM-DD-YYYY";

type DateField<F extends DateFormat = "DD/MM/YYYY"> = {
  type: "date";
  format: F;
  minDate?: F extends "DD/MM/YYYY" | "YYYY/MM/DD" | "MM/DD/YYYY"
    ? `${number}/${number}/${number}`
    : F extends "DD-MM-YYYY" | "YYYY-MM-DD" | "MM-DD-YYYY"
    ? `${number}-${number}-${number}`
    : never;
  maxDate?: F extends "DD/MM/YYYY" | "YYYY/MM/DD" | "MM/DD/YYYY"
    ? `${number}/${number}/${number}`
    : F extends "DD-MM-YYYY" | "YYYY-MM-DD" | "MM-DD-YYYY"
    ? `${number}-${number}-${number}`
    : never;
};

export type EditableFielsdObjectType = {
  [path: string]:
    | true
    | StringField
    | NumberField
    | SelectField
    | RadioField
    | TextAreaField
    | DateField
    | RootField;
};

export type NonEditableFieldsObjectType = {
  [path: string]: true | RootField;
};

export type DiffKeyValues = {
  [key: string]: { initial: string; updated: string };
}

// Type definition for callback functions exposed to the library consumer.
// The consumer receives initialJson, finalJson, and updatedKeys on events like onChange and onSubmit.      
export type onSubmitorChangePropsType = {
  initialJson : Record<string, any>,
  updatedJson : Record<string, any>,
  updatedKeys : DiffKeyValues
}

export type JsonEditorContextType = {
  jsonState:  Record<string, any> | null,
  editJsonState:  Record<string, any> | null,
  isEditing: boolean;
  editingMode?: 'global' | 'individual' | 'global-individual' | 'inline';
  allFieldsEditable?: boolean;
  editableFields?: EditableFielsdObjectType;
  nonEditableFields?: NonEditableFieldsObjectType;
  isExpanded : boolean,
  handleOnChange: HandleOnChange;
  handleOnSubmit: HandleOnSubmit;
  selectedFieldsForEditing: Record<string,any>,
  setSelectedFieldsForEditing: React.Dispatch<React.SetStateAction<Record<string, any>>>
}

type InlineEditingConfig = {
  editingMode: 'inline';
  isEditing : false,
  allFieldsEditable?: boolean;
  editableFields?: EditableFielsdObjectType;
  nonEditableFields?: NonEditableFieldsObjectType;
}

type StandardEditingConfig = {
  isEditing: boolean;
  editingMode?: 'global' | 'individual' | 'global-individual';
  allFieldsEditable?: boolean;
  editableFields?: EditableFielsdObjectType;
  nonEditableFields?: NonEditableFieldsObjectType;
}

export type EditingConfig = StandardEditingConfig | InlineEditingConfig;

export type JsonEditorProps = {
  json: Record<string, any>;
  className?: string;
  isExpanded? : boolean;
  onSubmit? : (props : onSubmitorChangePropsType) => void;
  onChange? : (props : onSubmitorChangePropsType) => void;
  editingConfig?: EditingConfig;
};

export type RenderJsonFunctionType = (
  val: any,
  path: string,
  isRootLevelKey: boolean
) => React.ReactNode;

export type RenderArrayProps = {
  arr: [] | any;
  path: string;
  isRootLevelKey: boolean;
  renderJson: RenderJsonFunctionType;
};

export type RenderArrayItemsProp = {
  val: any;
  children: React.ReactNode;
};

export type RenderObjectProps = {
  obj: any;
  path: string;
  renderJson: RenderJsonFunctionType;
  isRootLevelKey: boolean;
  searchText?: string;
};

export type RenderObjectKeysProps = {
  keyName: string;
  val: any;
  children: React.ReactNode;
  searchText?: string;
};

export type HandleOnChange = (value : string,path : string) => void 
export type HandleOnSubmit = (value : string,path : string) => void

export type RenderValueProps = {
  value: string | number | undefined | null;
  path: string;
};

export type DefaultValueElementProps = {
  path: string;
  value: string;
  pathWithoutArrayIndices?: string;
  isFieldPresentInNonEditableLookup?: boolean
}

export type DefaultInputField = {
  path: string;
  value: string;
  readModeValue ?: string,
  pathWithoutArrayIndices?: string;
};

export type DefaultSelectElementProps = {
  options: Array<{ key: string; value: string }>;
} & DefaultInputField;

export type DefaultTextElementProps = {} & DefaultInputField;

export type DefaultNumberElementProps = {} & DefaultInputField;

export type DefaultTextAreaElementProps = {} & DefaultInputField;

export type DefaultRadioElementProps = {
  options: Array<{ key: string; value: string }>;
} & DefaultInputField

export type DefaultDateElementProps<F extends DateFormat = "DD/MM/YYYY"> = {
  format: DateFormat;
  minDate?: F extends "DD/MM/YYYY" | "YYYY/MM/DD" | "MM/DD/YYYY"
    ? `${number}/${number}/${number}`
    : F extends "DD-MM-YYYY" | "YYYY-MM-DD" | "MM-DD-YYYY"
    ? `${number}-${number}-${number}`
    : never;
  maxDate?: F extends "DD/MM/YYYY" | "YYYY/MM/DD" | "MM/DD/YYYY"
    ? `${number}/${number}/${number}`
    : F extends "DD-MM-YYYY" | "YYYY-MM-DD" | "MM-DD-YYYY"
    ? `${number}-${number}-${number}`
    : never;
} & DefaultInputField;
