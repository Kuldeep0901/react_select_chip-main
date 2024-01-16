"use client";
import SelectChip from "@/components/SelectChip";

export default function Home() {
  return (
    <>
      <div className="mt-[40px] w-[80%] flex flex-col items-center p-6 gap-[44px]">
        <h2 className="text-2xl font-bold text-blue-700">Pick Users</h2>
        <SelectChip />
      </div>
    </>
  );
}
