import Image from "next/image";

export default function Footer() {
    return (
        <footer className="row-start-3 ">
        <div className="flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://blog.frore.co/posts/sharing-secrets-with-confidence"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="blog icon"
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
        <div className="flex flex-wrap items-center justify-center text-gray-600 pt-5">&copy;Copyright {Date().split(" ")[3]} frore<span className="text-[#8286ff]">.</span>co</div>
        <div className="flex flex-wrap items-center justify-center text-gray-600">All rights reserved.</div>
      </footer>
    )
}