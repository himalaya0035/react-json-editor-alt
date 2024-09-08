import { DefaultValueElementProps } from "../../../types/JsonEditor.types";
function DefaultValueElement({
  value,
}: DefaultValueElementProps) {
  return (
    <>
      <span>{value}</span>
    </>
  );
}

export default DefaultValueElement;

/*
function DefaultValueElement({
  value,
  allowSelectiveFieldEditing,
  path,
  selectedFieldsForEditing,
  setSelectedFieldsForEditing,
}: DefaultValueElementProps) {
  return (
    <>
      <span>{value}</span>
      {allowSelectiveFieldEditing && (
        <Button
          variant={"outline"}
          size={"icon"}
          title="Edit"
          onClick={() => {
            if (
              selectedFieldsForEditing &&
              setSelectedFieldsForEditing &&
              !selectedFieldsForEditing.hasOwnProperty(path)
            ) {
              setSelectedFieldsForEditing((prev) => {
                return {
                  ...prev,
                  [path]: true,
                };
              });
            }
          }}
        >
          <Edit2Icon size={14} />
        </Button>
      )}
    </>
  );
}
*/