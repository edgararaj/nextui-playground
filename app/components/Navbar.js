import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { usePathname } from "next/navigation";

const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default function MyNavbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  return (
    <Navbar isBlurred classNames={{
      base: 'bg-background/90',
    }}>
      <NavbarBrand className="inverse-color">
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Button
            as={Link}
            href="/"
            variant={pathname === "/" ? "shadow" : "light"}
            color={pathname === "/" ? "primary" : "default"}
            className={pathname === "/" ? "font-bold" : "font-normal"}
          >
            Login
          </Button>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/necchange"}>
          <Button
            as={Link}
            href="/necchange"
            aria-current="page"
            variant={pathname === "/necchange" ? "shadow" : "light"}
            color={pathname === "/necchange" ? "primary" : "default"}
            className={pathname === "/necchange" ? "font-bold" : "font-normal"}
          >
            NECChange
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            variant="light"
            color="default"
            href="#"
            className="font-normal"
          >
            Integrations
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <ThemeSwitcher />
        <Dropdown placement="bottom-end" className="text-foreground">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
