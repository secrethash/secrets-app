'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
    const supabase = await createClient()

    // Todo: instead of typecasting validate the inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        // console.log(error)
        const params = new URLSearchParams({
            error: 'Login failed',
            error_description: encodeURIComponent(error.message),
        })
        redirect('/error?' + params.toString())
    }

    const params = new URLSearchParams({
        success: 'true',
        title: 'Login successful',
        message: 'You have been logged in successfully!',
    })

    revalidatePath('/', 'layout')
    redirect('/?' + params.toString())
}

export async function register(formData: FormData) {
    const supabase = await createClient()

    // ToDo: instead of typecasting validate the inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        // console.log(error)
        const params = new URLSearchParams({
            error: 'Registration failed',
            error_description: encodeURIComponent(error.message),
        })

        redirect('/error?' + params.toString())
    }

    const params = new URLSearchParams({
        success: 'true',
        title: 'Registration successful',
        message:
            'You have been registered successfully! Please check your email for confirmation.',
    })

    revalidatePath('/', 'layout')
    redirect('/?' + params.toString())
}

export async function logout() {
    const supabase = await createClient()

    await supabase.auth.signOut()

    const params = new URLSearchParams({
        success: 'true',
        title: 'Logged out successfully',
        message: 'You have been logged out successfully!',
    })

    revalidatePath('/?' + params.toString(), 'layout')
    redirect('/')
}
