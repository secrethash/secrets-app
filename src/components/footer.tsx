import Image from 'next/image'

export default function Footer() {
    return (
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
                        width={22}
                        height={22}
                    />
                    Showcase
                </a>
            </div>
            <div className="flex flex-wrap items-center justify-center text-gray-600 pt-5">
                &copy;Copyright {Date().split(' ')[3]} Shashwat Mishra
            </div>
            <div className="flex flex-wrap items-center justify-center text-gray-600">
                All rights reserved.
            </div>
        </footer>
    )
}
