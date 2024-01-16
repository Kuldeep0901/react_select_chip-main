"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface ListItem {
  label: string;
  value: string;
  image?: string;
}

interface SelectChipProps {
  listItems: ListItem[];
  selectedItems: ListItem[];
  onSelect: Dispatch<SetStateAction<ListItem[]>>;
}

const DEFAULT_PROFILE_IMAGE =
  "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1412446893.1705276800&semt=ais";

const SelectChip: React.FC<SelectChipProps> = ({
  listItems,
  onSelect,
  selectedItems,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [showList, setShowList] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [highlightedChip, setHighlightedChip] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 0) {
      setHighlightedIndex(0);
      if (filteredItems.length > 0) {
        setShowList(true);
      }
    }
  };

  const filteredItems = useMemo(
    () =>
      listItems.filter((item) => {
        const isItemSelected = selectedItems.some(
          (selectedItem) => selectedItem.label === item.label
        );
        const includesInput = item.label
          .toLocaleLowerCase()
          .includes(inputValue.toLocaleLowerCase());
        return !isItemSelected && includesInput;
      }),
    [inputValue, listItems, selectedItems]
  );

  const handleClick = (item: ListItem) => {
    setInputValue("");
    onSelect((prev) => [...prev, item]);
    inputRef.current?.focus();
    setShowList(false);
    setHighlightedIndex(-1);
  };

  const removeSelected = (item: ListItem) => {
    onSelect((prev) =>
      prev.filter((listItem) => listItem.label !== item.label)
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.code === "ArrowUp") {
      setHighlightedIndex((prev) =>
        prev - 1 < 0 ? filteredItems.length - 1 : prev - 1
      );
    } else if (event.code === "ArrowDown") {
      setHighlightedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (event.code === "Enter" && highlightedIndex !== -1) {
      if (filteredItems.length !== 0) {
        const selectedItem = filteredItems[highlightedIndex];
        handleClick(selectedItem);
      }
    } else if (
      event.key === "Backspace" &&
      inputValue === "" &&
      selectedItems.length > 0
    ) {
      setHighlightedChip(true);
      if (highlightedChip) {
        const lastSelectedItem = selectedItems[selectedItems.length - 1];
        removeSelected(lastSelectedItem);
        setHighlightedChip(false);
      }
    }
  };

  useEffect(() => {
    if (listRef.current && highlightedIndex !== -1) {
      const listItems = listRef.current.children;
      if (listItems && listItems[highlightedIndex]) {
        listItems[highlightedIndex].scrollIntoView({
          behavior: "auto",
          block: "nearest",
        });
      }
    }
  }, [highlightedIndex]);

  return (
    <>
      <div className="border-b-2 border-blue-700 bg-transparent w-full flex flex-wrap px-1 pb-1">
        {selectedItems.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            {selectedItems.map((item, index) => {
              return (
                <div
                  className={`flex items-center gap-2 bg-stone-200 py-1 pr-2 rounded-full h-[36px] border-2 ${
                    highlightedChip && index === selectedItems.length - 1
                      ? "border-blue-400"
                      : ""
                  }`}
                  key={item.label}>
                  <img
                    src={item.image || DEFAULT_PROFILE_IMAGE}
                    alt={item.label}
                    width={36}
                    height={36}
                    className="object-cover h-[36px] w-[36px] rounded-full"
                  />
                  <p className="truncate max-w-[200px]">{item.label}</p>
                  <button onClick={() => removeSelected(item)}>X</button>
                </div>
              );
            })}
          </div>
        ) : null}
        <div className="relative min-w-[200px] flex-1 h-[36px] ml-1">
          <input
            autoComplete="off"
            ref={inputRef}
            id="chipselect"
            placeholder={`${selectedItems.length === 0 ? "Add new user" : ""}`}
            name="chipselect"
            autoFocus
            type="text"
            className="outline-none w-full bg-transparent h-full"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowList(inputValue.length > 0)}
          />
          {showList && filteredItems.length > 0 && (
            <ul
              ref={listRef}
              className="absolute top-[40px] overflow-x-hidden flex flex-col gap-2 p-2 w-[300px] shadow-lg max-h-[220px] overflow-auto bg-stone-100 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
              {filteredItems.map((item, index) => {
                return (
                  <li
                    className={`flex items-center gap-2 hover:bg-stone-200 pl-2 pr-1 py-1 ${
                      index === highlightedIndex ? "bg-blue-200" : ""
                    }`}
                    key={item.label}
                    onClick={() => handleClick(item)}
                    role="button">
                    <img
                      src={item.image || DEFAULT_PROFILE_IMAGE}
                      alt={item.label}
                      width={40}
                      height={40}
                      className="object-cover h-[40px] w-[40px] rounded-full"
                    />
                    <div className="w-full truncate">{item.label}</div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectChip;
