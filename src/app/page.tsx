import { SecretSharingAppComponent } from "@/components/secret-sharing-app";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start justify-items-center">
        <Image
          className="dark:invert mx-auto"
          src="/secrets.svg"
          alt="App logo"
          width={180}
          height={38}
          priority
        />
        <SecretSharingAppComponent />
      </main>
      <footer className="row-start-3 ">
        <div className="flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/secrethash/secrets-app/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="docs icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/secrethash/secrets-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/github.svg"
              alt="GitHub icon"
              width={16}
              height={16}
            />
            Repository
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://secrethash.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={20}
              height={20}
            />
            Showcase
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-center text-gray-600 p-5">&copy; Copyright {Date().split(" ")[3]}, Shashwat Mishra</div>
      </footer>
    </div>
  );
}
