import { CustomButton } from "@/components/global/custom-button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="container flex flex-col items-center space-y-8">
        <div className="flex flex-col items-center gap-x-10 md:flex-row">
          <h1 className="text-9xl font-extrabold">404</h1>
          <h1 className="text-center text-4xl font-bold md:text-start lg:text-6xl">
            Oops, looks like
            <br />
            there&apos;s nobody here!
          </h1>
        </div>

        <CustomButton
          customType="nav"
          href="/"
          loadText="Go to Main Page"
          variant="outline"
          size="lg"
          className="h-16 gap-x-6 rounded-full border-4 text-xl font-bold hover:border-primary"
        >
          Go to Main Page
        </CustomButton>
      </div>
    </div>
  );
}
