import { ModeToggle } from "@/components/global/theme-provider";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-4">
      <p>Hello world</p>
      <Button>Test</Button>

      <ModeToggle />
    </div>
  );
}
