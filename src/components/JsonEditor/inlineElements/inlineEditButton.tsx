import { Edit2Icon } from "lucide-react";
import { Button } from "../../ui/button";
import { useJsonEditorContext } from "../jsonEditor";

type InlineEditButtonProps = {
  path: string;
};

// Implemented dedicated edit button for each input type to ensure plug-and-play functionality.
// This avoids repetitive function definitions and simplifies adding new input types.
const InlineEditButton = ({ path }: InlineEditButtonProps) => {
  const { selectedFieldsForEditing, setSelectedFieldsForEditing } =
    useJsonEditorContext();

  const handleInlineEditButtonClick = () => {
    if (selectedFieldsForEditing && setSelectedFieldsForEditing) {
      setSelectedFieldsForEditing((prev) => ({
        ...prev,
        [path]: true,
      }));
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      title="Edit"
      onClick={handleInlineEditButtonClick}
    >
      <Edit2Icon size={14} />
    </Button>
  );
};

export default InlineEditButton;