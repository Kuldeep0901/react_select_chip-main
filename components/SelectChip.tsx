"use client";

import React, {
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import MenuList from "./MenuList";

interface ListItem {
  name: string;
}

const LISTITEMS: ListItem[] = [
  {
    name: "Sumeet Debnath",
  },
  {
    name: "Sunil Debnath",
  },
  {
    name: "Suraj Raj",
  },
  {
    name: "Suman",
  },
  {
    name: "Swapan",
  },
  {
    name: "Sunil man",
  },
  {
    name: "Sumit Dev",
  },
  {
    name: "SSSSSsssssssssssssssssssssssssssssssssssss",
  },
  {
    name: "S. Gamer",
  },
  {
    name: "Ranti",
  },
  {
    name: "Gouri",
  },
  {
    name: "Kanchan",
  },
];

const SelectChip: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [showList, setShowList] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<ListItem[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 0) {
      setHighlightedIndex(0);
      setShowList(true);
    }
  };

  const filteredItems = LISTITEMS.filter((item) => {
    const isItemSelected = selectedItems.some(
      (selectedItem) => selectedItem.name === item.name
    );
    const includesInput = item.name
      .toLocaleLowerCase()
      .includes(inputValue.toLocaleLowerCase());
    return !isItemSelected && includesInput;
  });

  const handleClick = (name: string) => {
    setInputValue("");
    setSelectedItems((prev) => [...prev, { name }]);
    inputRef.current?.focus();
    setShowList(false);
    setHighlightedIndex(-1);
  };
  const removeSelected = (name: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.name !== name));
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      setHighlightedIndex((prev) =>
        prev - 1 < 0 ? filteredItems.length - 1 : prev - 1
      );
    } else if (event.key === "ArrowDown") {
      setHighlightedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (event.key === "Enter" && highlightedIndex !== -1) {
      if (filteredItems.length !== 0) {
        const selectedName = filteredItems[highlightedIndex].name;
        handleClick(selectedName);
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

  // useEffect(() => {
  //   if (showList) {
  //     setHighlightedIndex(0);
  //   }
  // }, [showList]);
  return (
    <>
      <div className="border-b-2 border-blue-700 bg-transparent w-full flex flex-wrap px-1 pb-1">
        {selectedItems.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            {selectedItems.map((item) => (
              <span
                className="flex items-center gap-2 bg-stone-200 py-1 px-2 rounded-full h-[36px]"
                key={item.name}>
                <p className="truncate max-w-[200px]">{item.name}</p>
                <button onClick={() => removeSelected(item.name)}>X</button>
              </span>
            ))}
          </div>
        ) : null}
        <div className="relative min-w-[200px] flex-1 h-[36px] ml-1">
          <input
            ref={inputRef}
            id="chipselect"
            name="chipselect"
            autoFocus
            type="text"
            className="outline-none w-full bg-transparent h-full"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowList(inputValue.length > 0)}
            // onBlur={() => setShowList(false)}
          />
          {showList && filteredItems.length > 0 && (
            <ul
              ref={listRef}
              className="absolute top-[40px] overflow-x-hidden flex flex-col gap-2 p-2 w-[300px] shadow-lg max-h-[220px] overflow-auto bg-stone-100 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
              {filteredItems.map((item, index) => (
                <li
                  className={`hover:bg-stone-200 pl-2 pr-1 py-1 ${
                    index === highlightedIndex ? "bg-blue-200" : ""
                  }`}
                  key={item.name}
                  onClick={() => handleClick(item.name)}
                  role="button">
                  <div className="w-full truncate">{item.name}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectChip;
