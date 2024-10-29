import { ModeToggle } from "@/components/global/theme-provider";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-4">
      <p>Hello world</p>

      <ModeToggle />
    </div>
  );
}
