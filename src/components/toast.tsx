'use client'

import { useToast } from '@/hooks/use-toast'
import { useSearchParams } from 'next/navigation'
import { Toaster } from './ui/toaster'
import { Suspense, useEffect, useState } from 'react'

export default function Toast() {
    return (
        <Suspense>
            <ToastComponent />
        </Suspense>
    )
}

function ToastComponent() {
    const { toast } = useToast()
    const searchParams = useSearchParams()
    const error = searchParams.get('error')
    const error_message = decodeURIComponent(
        searchParams.get('error_description') ?? ''
    )
    const success = searchParams.get('success')
    const message = searchParams.get('message')
    const title = searchParams.get('title')
    const [triggered] = useState(false)

    useEffect(() => {
        if (error && !triggered) {
            toast({
                title: 'Error Occurred!',
                description: error_message,
                variant: 'destructive',
            })
        }

        if (success && !triggered) {
            toast({
                title: title ?? 'Success!',
                description: message,
                variant: 'default',
            })
        }
    }, [error, success, triggered, toast, error_message, message, title])

    return <Toaster />
}
