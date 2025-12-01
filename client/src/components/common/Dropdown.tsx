import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/utils";

interface DropdownContextTypes {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DropdownContext = createContext<DropdownContextTypes | null>(null);

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within Dropdown");
  }

  return context;
};

interface DropdownProps {
  children: React.ReactNode;
}

const Dropdown = ({ children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={dropdownRef} className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

interface DropdownTriggerProps {
  children: React.ReactNode;
}

const DropdownTrigger = ({ children }: DropdownTriggerProps) => {
  const { isOpen, setIsOpen } = useDropdown();

  return <div onClick={() => setIsOpen(!isOpen)}>{children}</div>;
};

interface DropdownContentProps {
  children: React.ReactNode;
  classNames?: string;
  position?: "Left" | "Center" | "Right";
}

const DropdownContent = ({
  children,
  classNames,
  position = "Center",
}: DropdownContentProps) => {
  const { isOpen } = useDropdown();

  if (!isOpen) return null;

  const positionClass =
    position === "Left"
      ? "left-0"
      : position === "Center"
        ? "left-1/2 -translate-x-1/2"
        : "right-0";

  return (
    <div
      className={cn(
        "bg-dark-parchment absolute top-12 z-99 w-fit rounded-md p-4 shadow-lg",
        positionClass,
        classNames,
      )}
    >
      {children}
    </div>
  );
};

export const DropdownMenu = Object.assign(Dropdown, {
  Trigger: DropdownTrigger,
  Content: DropdownContent,
});
