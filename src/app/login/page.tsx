import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { login, register } from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BadgeInfo, LogIn, UserPlus2 } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Toast from "@/components/toast";
import Footer from "@/components/footer";

export default function LoginPage() {
  

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Toast />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start justify-items-center">
        <Image
          className="dark:invert mx-auto"
          src="/secrets.svg"
          alt="App logo"
          width={280}
          height={38}
          priority
        />
        <div className="container mx-auto p-4 space-y-6 max-w-7xl">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-center">Secret Sharing App</CardTitle>
              <CardDescription className="text-center">
                Share secrets using asymmetric encryption
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Alert className="my-5">
                  <BadgeInfo className="h-4 w-4" />
                  <AlertTitle>Authentication</AlertTitle>
                  <AlertDescription className="text-gray-600">
                    Login with the provided credentials to use the application.
                  </AlertDescription>
                </Alert>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div className="flex gap-4 items-center justify-between py-7">
                    <Button formAction={register} className="w-full bg-transparent outline outline-black outline-2 text-black hover:text-white">
                      <UserPlus2 className="mr-2 h-4 w-4" />
                      Register
                    </Button>
                    <Button formAction={login} className="w-full outline outline-2 outline-black">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
