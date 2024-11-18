'use client'

import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Separator } from '@/components/ui/separator'

export default function NotFound() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start justify-items-center max-w-md mb-9">
                <Image
                    className="dark:invert mx-auto"
                    src="/secrets.svg"
                    alt="App logo"
                    width={180}
                    height={38}
                    priority
                />
                <Separator className="my-0 text-black dark:text-white" />
                <h1 className="mx-auto text-9xl font-bold text-center font-mono">
                    404
                </h1>
                <span className="text-gray-500 mx-auto">Four. oh. Four.</span>
                <span className="mx-auto">Page Not Found</span>
                <Button className="w-full" onClick={() => redirect('/')}>
                    <MoveLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Button>
            </main>
            <Footer />
        </div>
    )
}
