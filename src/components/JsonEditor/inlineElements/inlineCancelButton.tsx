import { INLINE_EDITING_MODE } from "../../../constants/constants";
import { Button } from "../../ui/button";
import { useJsonEditorContext } from "../jsonEditor";
import { Cross1Icon } from "@radix-ui/react-icons";

type InlineCancelButtonProps = {
  path: string;
};

// Implemented dedicated cancel button for each input type to ensure plug-and-play functionality.
// This avoids repetitive function definitions and simplifies adding new input types.
const InlineCancelButton = ({ path }: InlineCancelButtonProps) => {
  const {
    editingMode,
    selectedFieldsForEditing,
    setSelectedFieldsForEditing,
    handleFieldReset,
  } = useJsonEditorContext();

  if (editingMode !== INLINE_EDITING_MODE) {
    return null;
  }

  const handleInlineCancelButtonClick = () => {
    if (selectedFieldsForEditing && setSelectedFieldsForEditing) {
      setSelectedFieldsForEditing((prev) => ({
        ...prev,
        [path]: false,
      }));
      handleFieldReset(path)
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      title="Cancel"
      onClick={handleInlineCancelButtonClick}
    >
      <Cross1Icon width={14} height={14} />
    </Button>
  );
};

export default InlineCancelButton;