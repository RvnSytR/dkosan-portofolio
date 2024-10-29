"use client";

import { Session } from "next-auth";
import { CheckRoutes, RedirectHandler } from "@/server/action";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CustomLoader, iconSize } from "./global/icons";
import { ValidateSession } from "@/server/action-user";
import { SignOutHandler } from "@/app/login/sign";

export function Protector({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const path = usePathname();

  useEffect(() => {
    const check = async () => {
      setIsLoad(true);
      await CheckRoutes(path);
      const isValid = session ? await ValidateSession(session) : false;
      if (!isValid) {
        await SignOutHandler();
        RedirectHandler("/login");
      }
      setIsLoad(false);
    };

    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  if (isLoad) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CustomLoader customType="default" size={iconSize.lg * 2} />
      </div>
    );
  } else {
    return (
      <div className="animate-fade animate-duration-1000 animate-once">
        {children}
      </div>
    );
  }
}
