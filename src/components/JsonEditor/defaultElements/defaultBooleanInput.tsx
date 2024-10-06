import { Check } from "lucide-react";
import { GLOBAL_EDITING_MODE, INLINE_EDITING_MODE } from "../../../constants/constants";
import { DefaultBooleanElementProps } from "../../../types/JsonEditor.types";
import { Button } from "../../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import InlineCancelButton from "../inlineElements/inlineCancelButton";
import { useJsonEditorContext } from "../jsonEditor";
import ResetButton from "../inlineElements/resetButton";

function DefaultBooleanInput({ value, readModeValue, path }: DefaultBooleanElementProps) {
  const {
    editingMode,
    handleOnChange,
    handleOnSubmit,
    setSelectedFieldsForEditing,
  } = useJsonEditorContext();

  const booleanAsString =
  value === true ? "true" : value === false ? "false" : "";

  const handleBooleanInputChange = (selectedValue: string) => {
    const stringAsBoolean = selectedValue === "true" ? true : false;
    handleOnChange(stringAsBoolean, path);
  };

  const handleBooleanInputSubmit = () => {
    handleOnSubmit(value, path);
    if (editingMode === INLINE_EDITING_MODE) {
      setSelectedFieldsForEditing((prev) => {
        return {
          ...prev,
          [path]: false,
        };
      });
    }
  };

  const disabled = readModeValue === value;

  return (
    <>
      <Tabs
        value={booleanAsString}
        onValueChange={handleBooleanInputChange}
      >
        <TabsList>
          <TabsTrigger value="true">True</TabsTrigger>
          <TabsTrigger value="false">False</TabsTrigger>
        </TabsList>
      </Tabs>
      {editingMode !== GLOBAL_EDITING_MODE && (
        <Button
          variant={"outline"}
          disabled={disabled}
          size={"icon"}
          className={`${disabled && "hidden"}`}
          title="Submit"
          onClick={handleBooleanInputSubmit}
        >
          <Check size={14} />
        </Button>
      )}
      {editingMode === INLINE_EDITING_MODE && <InlineCancelButton path={path} />}
      {(editingMode !== INLINE_EDITING_MODE && !disabled) && <ResetButton path={path} />}
    </>
  );
}

export default DefaultBooleanInput;
