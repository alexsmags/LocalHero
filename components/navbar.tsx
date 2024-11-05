'use client'

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import Image from "next/image";
import LogoLocalHero from "../public/images/LocalHero_logo_no_background.png";
import { CiSearch } from "react-icons/ci";
import {AvatarIcon} from "@nextui-org/react";
export default function App() {
  return (
    <Navbar isBordered style={{ backgroundColor: '#04b54e' }}>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Image
            src={LogoLocalHero}
            alt="logo image"
            width={75}
            height={75}
            className="z-20"
            />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
        <NavbarItem>
            <Link style={{ fontFamily: 'PPGoshaBold, sans-serif', color: '#FFFFFF' }} href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link style={{ fontFamily: 'PPGoshaBold, sans-serif', color: '#FFFFFF' }} href="/products">
              Products
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link style={{ fontFamily: 'PPGoshaBold, sans-serif', color: '#FFFFFF' }} href="#">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link style={{ fontFamily: 'PPGoshaBold, sans-serif', color: '#FFFFFF' }} href="#">
              Other
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small font-PPGoshaBold", 
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<CiSearch size={18} />}
          type="search"
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              color="default"
              icon={<AvatarIcon />}
              classNames={{
                base: "bg-gradient-to-br from-[#FFFFFF] to-[#FFFFFF]",
                icon: "text-black/80",
              }}
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