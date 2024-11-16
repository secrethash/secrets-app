import { SecretSharingAppComponent } from "@/components/secret-sharing-app";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start justify-items-center">
        <Image
          className="dark:invert mx-auto"
          src="/frore.svg"
          alt="frore.co logo"
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
            href="https://frore.atlassian.net/wiki/x/JYHxAw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/confluence.svg"
              alt="Confluence icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/froreco/secrets-app"
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
            href="https://frore.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/frore-icon.svg"
              alt="Globe icon"
              width={20}
              height={20}
            />
            Go to frore.co →
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-center text-gray-600 p-5">&copy; Copyright {Date().split(" ")[3]}, frore<span className="text-[#8286ff]">.</span>co</div>
      </footer>
    </div>
  );
}
