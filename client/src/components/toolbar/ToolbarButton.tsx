import type { IconType } from "react-icons/lib";
import { cn } from "../../lib/utils";

interface ToolbarButtonProps {
  icon: IconType;
  iconSize?: string;
  isActive?: boolean;
  onClick: () => void;
}

const ToolbarButton = ({
  icon: Icon,
  iconSize,
  isActive,
  onClick,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "hover:bg-light-parchment cursor-pointer rounded-md p-1",
        isActive && "bg-light-parchment",
      )}
    >
      <Icon className={iconSize ? iconSize : "size-5"} />
    </button>
  );
};

export default ToolbarButton;
