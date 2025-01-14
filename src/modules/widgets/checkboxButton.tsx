import React, { ReactNode } from "react";

export function CheckboxButton({
  onClick,
  checked,
  children,
}: {
  onClick: () => void;
  checked: boolean;
  children: ReactNode;
}) {
  return (
    <label>
      <button onClick={onClick}>
        <input type={"checkbox"} checked={checked} readOnly /> {children}
      </button>
    </label>
  );
}
