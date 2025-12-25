"use client";

interface TagProps {
  tag: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function Tag({ tag, checked = false, onChange }: TagProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        className="w-4 h-4 text-blue-600"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="text-gray-700">{tag}</span>
    </label>
  );
}
