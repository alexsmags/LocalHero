'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import LogoLocalHero from "../../public/images/LocalHero_logo_no_background.png";
import { AvatarIcon } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function App() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Navbar isBordered style={{ backgroundColor: "#04b54e" }}>
      {/* Navbar Start - Logo */}
      <NavbarContent justify="start" className="flex-shrink-0">
        <NavbarBrand className="mr-4">
          <Link href="/">
            <Image
              src={LogoLocalHero}
              alt="logo image"
              width={75}
              height={75}
              className="z-20"
              priority
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Navbar Center - Links */}
      <NavbarContent className="hidden md:flex gap-3 flex-grow justify-center">
        <NavbarItem>
          <Link style={{ fontFamily: "PPGoshaBold, sans-serif", color: "#FFFFFF" }} href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link style={{ fontFamily: "PPGoshaBold, sans-serif", color: "#FFFFFF" }} href="/businesses">
            Businesses
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link style={{ fontFamily: "PPGoshaBold, sans-serif", color: "#FFFFFF" }} href="/artisans">
            Artisans
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link style={{ fontFamily: "PPGoshaBold, sans-serif", color: "#FFFFFF" }} href="/discover">
            Discover
          </Link>
        </NavbarItem>
        {session?.user?.role === "businessowner" ? (
          <NavbarItem>
            <Link style={{ fontFamily: "PPGoshaBold, sans-serif", color: "#FF0000" }} href="/business_tool">
              Business Management
            </Link>
          </NavbarItem>
        ) : null}

        {session?.user?.role === "artisan" ? (
          <NavbarItem>
            <Link style={{ fontFamily: "PPGoshaBold, sans-serif", color: "#FF0000" }} href="/artisan_tool">
              Artisan Management
            </Link>
          </NavbarItem>
        ) : null}
      </NavbarContent>

      {/* Navbar End - Avatar/Log In/Sign Up */}
      <NavbarContent className="items-center flex-shrink-0" justify="end">
        {session ? (
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
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              className="w-64 bg-white shadow-lg rounded-lg text-gray-800"
            >
              <DropdownItem
                key="profile"
                className="h-20 flex flex-col items-start gap-1 px-4 py-2 border-b border-gray-200"
              >
                <p className="font-semibold text-sm text-gray-600">
                  Signed in as{" "}
                  <span className="text-gray-900">
                    {session.user.name || "Guest"}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  {`Role: ${session.user.role}`}
                </p>
                <p className="text-xs text-gray-500">{`Email: ${session.user.email}`}</p>
                <p className="text-xs text-gray-500">{`Location: ${session.user.location}`}</p>
              </DropdownItem>

              <DropdownItem
                key="settings"
                className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
              >
                <span className="material-icons text-gray-500">My Settings</span>
              </DropdownItem>

              <DropdownItem
                key="help_and_feedback"
                className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
              >
                <span className="material-icons text-gray-500">
                  Help & Feedback
                </span>
              </DropdownItem>

              <DropdownItem
                key="logout"
                color="danger"
                className="flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-gray-100"
                onPress={async () => {
                  await signOut({ redirect: false });
                  router.push("/login");
                }}
              >
                <span className="material-icons" style={{ color: "#04b54e" }}>
                  Log Out
                </span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              color="success"
              onClick={() => router.push("/login")}
              style={{
                fontFamily: "PPGoshaBold, sans-serif",
                backgroundColor: "#FFFFFF",
                color: "#04b54e",
              }}
            >
              Log In
            </Button>
            <Button
              color="success"
              onClick={() => router.push("/signup")}
              style={{
                fontFamily: "PPGoshaBold, sans-serif",
                backgroundColor: "#FFFFFF",
                color: "#04b54e",
              }}
            >
              Sign Up
            </Button>
          </div>
        )}
      </NavbarContent>
    </Navbar>
  );
}
