import { cn } from "@/lib/utils";
import { ChangeEvent, useRef } from "react";
import { GetFileChange } from "@/lib/helper";

import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";

export function InputAvatar({
  avatar,
  setAvatar,
  className,
}: {
  avatar: string;
  setAvatar: React.Dispatch<string>;
  className?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileChangeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setAvatar(await GetFileChange(file));
  };

  return (
    <div className="relative">
      <div className="absolute inset-x-3.5 bottom-0 z-10 size-fit rounded-full border-[1px] bg-white/95 p-1.5">
        <Pencil size={15} className="text-green-950" />
      </div>

      <Avatar
        onClick={() => fileInputRef.current?.click()}
        className={cn("hover:cursor-pointer", className)}
      >
        <AvatarImage
          src={avatar}
          className="object-cover object-center transition hover:scale-125"
        />
        <AvatarFallback className="object-cover object-center transition hover:scale-125">
          D&apos;Kosan
        </AvatarFallback>
      </Avatar>

      <Input
        type="file"
        id="file"
        name="file"
        accept="image/*"
        onChange={fileChangeHandler}
        className="hidden"
        ref={fileInputRef}
      />
    </div>
  );
}
