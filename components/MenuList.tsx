import React, { useMemo } from "react";

interface ListItem {
  name: string;
}

interface MenuListProps {
  listItems: ListItem[];
  inputValue: string;
  setSelectedItems: React.Dispatch<React.SetStateAction<ListItem[]>>;
  selectedItems: ListItem[];
}

const MenuList = ({
  listItems,
  inputValue,
  selectedItems,
  setSelectedItems,
}: MenuListProps) => {
  const filteredItems = listItems.filter((item) => {
    const isItemSelected = selectedItems.some(
      (selectedItem) => selectedItem.name === item.name
    );
    const includesInput = item.name
      .toLocaleLowerCase()
      .includes(inputValue.toLocaleLowerCase());
    return !isItemSelected && includesInput;
  });

  const handleClick = (name: string) => {
    setSelectedItems((prev) => [...prev, { name }]);
  };
  return (
    <ul className="bg-red-100 flex flex-col gap-2">
      {filteredItems.map((item) => (
        <li
          className="bg-blue-200"
          key={item.name}
          onClick={() => handleClick(item.name)}
          role="button">
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
