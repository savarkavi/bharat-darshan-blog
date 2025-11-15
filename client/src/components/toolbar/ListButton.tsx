import { DropdownMenu } from "../common/Dropdown";
import { GoListUnordered, GoListOrdered } from "react-icons/go";
import { IoChevronDown } from "react-icons/io5";
import { useEditorStore } from "../../store/use-editor";
import { cn } from "../../lib/utils";

const ListButton = () => {
  const editor = useEditorStore((state) => state.editor);
  const isActive =
    editor?.isActive("bulletList") || editor?.isActive("orderedList");

  const lists = [
    { label: "Bullet List", value: "bulletList", icon: <GoListUnordered /> },
    { label: "Ordered List", value: "orderedList", icon: <GoListOrdered /> },
  ];

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <button
          className={`hover:bg-light-parchment flex cursor-pointer items-center rounded-md p-1 ${isActive && "bg-light-parchment"} `}
        >
          <GoListUnordered className="size-5" />
          <IoChevronDown className="size-3" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content classNames="p-1">
        <div className="flex w-fit flex-col gap-1">
          {lists.map((list) => (
            <div
              key={list.label}
              className={cn(
                "hover:bg-light-parchment flex cursor-pointer items-center gap-3 rounded-md px-3 py-1",
                editor?.isActive(list.value) && "bg-light-parchment",
              )}
              onClick={
                list.label === "Bullet List"
                  ? () => editor?.commands.toggleBulletList()
                  : () => editor?.commands.toggleOrderedList()
              }
            >
              <div>{list.icon}</div>
              <p className="text-nowrap">{list.label}</p>
            </div>
          ))}
        </div>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

export default ListButton;
