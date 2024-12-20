import Footer from '@/components/footer'
import { SecretSharingAppComponent } from '@/components/secret-sharing-app'
import Image from 'next/image'

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen md:p-8 pb-20 gap-16 sm:p-0 font-[family-name:var(--font-geist-sans)]">
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
            <Footer />
        </div>
    )
}
