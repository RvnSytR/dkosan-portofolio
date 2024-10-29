import { CustomButton } from "@/components/global/custom-button";
import { ModeToggle } from "@/components/global/theme-provider";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-4">
      <p>{JSON.stringify(session)}</p>

      <p>Hello world</p>

      <ModeToggle />

      <CustomButton customType="logout">Log Out</CustomButton>
    </div>
  );
}
