"use client";
import SelectChip from "@/components/SelectChip";
import { useState } from "react";

const LISTITEMS = [
  { label: "Sumeet Debnath", value: "sumeet_debnath" },
  { label: "Sunil Debnath", value: "sunil_debnath" },
  { label: "Suraj Raj", value: "suraj_raj" },
  { label: "Suman", value: "suman" },
  { label: "Swapan", value: "swapan" },
  { label: "Sunil man", value: "sunil_man" },
  { label: "Sumit Dev", value: "sumit_dev" },
  {
    label: "SSSSSsssssssssssssssssssssssssssssssssssss",
    value: "ssssssssssssssssssssssssssssssssssssssssss",
  },
  { label: "S. Gamer", value: "s._gamer" },
  { label: "Ranti", value: "ranti" },
  { label: "Gouri", value: "gouri" },
  { label: "Kanchan", value: "kanchan" },
];

interface ListItem {
  label: string;
  value: string;
}

export default function Home() {
  const [selectedItems, setSelectedItems] = useState<ListItem[]>([]);

  return (
    <>
      <div className="mt-[40px] w-[80%] flex flex-col items-center p-6 gap-[44px]">
        <h2 className="text-2xl font-bold text-blue-700">Pick Users</h2>
        <SelectChip
          listItems={LISTITEMS}
          selectedItems={selectedItems}
          onSelect={setSelectedItems}
        />
      </div>
    </>
  );
}
