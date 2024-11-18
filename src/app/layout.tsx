import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Toast from '@/components/toast'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
})

export const metadata: Metadata = {
  title: "Secrets Sharing Application",
  description: "Secrets Sharing application using asymmetric encryption.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                {children}
                <Toast />
            </body>
        </html>
    )
}
