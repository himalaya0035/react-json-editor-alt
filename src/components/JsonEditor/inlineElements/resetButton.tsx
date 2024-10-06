import { INLINE_EDITING_MODE } from "../../../constants/constants";
import { Button } from "../../ui/button";
import { useJsonEditorContext } from "../jsonEditor";
import { ResetIcon } from "@radix-ui/react-icons";

type ResetButtonProps = {
  path: string;
  callBack?: () => void
};

// Implemented dedicated cancel button for each input type to ensure plug-and-play functionality.
// This avoids repetitive function definitions and simplifies adding new input types.
const ResetButton = ({ path, callBack }: ResetButtonProps) => {
  const {
    editingMode,
    handleFieldReset,
  } = useJsonEditorContext();

  if (editingMode === INLINE_EDITING_MODE) {
    return null;
  }

  const handleResetButtonClick = () => {
    handleFieldReset(path)
    if (callBack){
        callBack()
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      title="Reset"
      onClick={handleResetButtonClick}
    >
      <ResetIcon width={14} height={14} />
    </Button>
  );
};

export default ResetButton;