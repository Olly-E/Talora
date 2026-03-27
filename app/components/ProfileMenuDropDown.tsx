import Link from "next/link";
import clsx from "clsx";

import { useComponentVisible } from "../hooks/useComponentVisible";
import { useHandleLogout } from "../hooks/useLogout";
import { Loader } from "./elements/Loader";
import { Avatar } from "./Avatar";

interface ProfileMenuDropdownProps {
  firstName: string;
  lastName: string;
  isLoading: boolean;
}
export const ProfileMenuDropdown = ({
  firstName,
  lastName,
  isLoading,
}: ProfileMenuDropdownProps) => {
  const {
    ref,
    dropDownButtonRef,
    handleClickOnDropDownButton,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible();

  const { handleLogout } = useHandleLogout();

  const PROFILE_LINKS = [
    { name: "Profile", href: "/profile", id: 1 },
    // {
    //   name: "My time report",
    //   href: "/",
    //   id: 2,
    // },
    // {
    //   name: "Notifications",
    //   href: "/",
    //   id: 3,
    // },
    // { name: 'Security', href: '/security', id: 3 },
  ];

  return (
    <div className="min-w-[154px] relative">
      <button
        arial-label="profile"
        className="text-left"
        ref={dropDownButtonRef}
        onClick={handleClickOnDropDownButton}
      >
        <div className="flex items-center gap-3">
          <div className="w-fit h-fit rounded-full border-[6px] border-black/10">
            <Avatar className="w-[34px] min-w-[34px] aspect-square rounded centered bg-black !text-primary font-500 text-sm">
              {isLoading ? <Loader /> : firstName[0]}
            </Avatar>
          </div>

          <p className="text-sm font-medium">{firstName}</p>
        </div>
      </button>

      <div ref={ref} className="absolute top-[65px] z-[30] -mt-[10px] right-0">
        <div
          className={clsx(
            "rounded-lg border border-gray-100  bg-white px-4 pt-[16px] pb-4 text-black shadow-lg min-w-[200px]",
            isComponentVisible ? "block opacity-100" : "hidden opacity-0",
          )}
        >
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-[34px] min-w-[34px] aspect-square rounded centered bg-black !text-primary font-500 text-sm">
              {isLoading ? <Loader /> : firstName[0]}
            </Avatar>
            <div>
              <p className="text-[18px]">
                {firstName} {lastName}
              </p>
              <p className="text-xs">Reboot Monkey</p>
            </div>
          </div>
          {PROFILE_LINKS.map((link, index) => {
            return (
              <Link
                onClick={() => setIsComponentVisible(false)}
                href={link.href}
                key={link.id}
                className={clsx(
                  "text-sm block py-[7px] hover:text-yellow-600 transition-colors",
                  index > 0 && "mt-1",
                )}
              >
                {link.name}
              </Link>
            );
          })}
          <hr className="border-t border-gray-100 mt-2" />
          <button
            className="text-sm text-red-state mt-3"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};
