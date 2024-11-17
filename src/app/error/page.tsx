"use client";

import Footer from "@/components/footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { BadgeAlertIcon, MoveLeft } from "lucide-react";
import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = decodeURIComponent(
    searchParams.get("error") ?? "Oops! Error Occurred!"
  );
  const error_message = decodeURIComponent(
    searchParams.get("error_description") ??
      "There seems to be some errors with this request. Please check again. If you think nothing is wrong, please try after some time."
  );

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start justify-items-center max-w-md">
        <Image
          className="dark:invert mx-auto"
          src="/secrets.svg"
          alt="App logo"
          width={180}
          height={38}
          priority
        />
        <Alert variant="destructive">
          <BadgeAlertIcon className="h-4 w-4" />
          <AlertTitle>{error}</AlertTitle>
          <AlertDescription className="text-gray-600">
            {error_message}
          </AlertDescription>
        </Alert>
        <Button className="w-full" onClick={() => redirect("/")}>
          <MoveLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </main>
      <Footer />
    </div>
  );
}
