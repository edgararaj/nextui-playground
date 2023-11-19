"use client";

import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SunDim, Moon } from "@phosphor-icons/react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      defaultSelected
      size="lg"
      color="success"
      isSelected={theme === "light"}
      onValueChange={(e) => setTheme(e === true ? "light" : "dark")}
      startContent={<SunDim size="21" weight="fill" fill="black" />}
      endContent={<Moon size="21" weight="fill" />}
    />
  );
}
