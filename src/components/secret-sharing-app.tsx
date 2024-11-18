'use client'
import { BadgeInfo, LogOutIcon } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { logout } from '@/app/login/actions'
import { toast } from '@/hooks/use-toast'
import supabase from '@/lib/supabase'
import { encrypter } from '@/lib/encrypter'

export function SecretSharingAppComponent() {
    const [publicKey, setPublicKey] = useState<string>('')
    const [privateKey, setPrivateKey] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [encryptedMessage, setEncryptedMessage] = useState<string>('')
    const [decryptedMessage, setDecryptedMessage] = useState<string>('')
    const [savePublicKey, setSavePublicKey] = useState<boolean>(false)
    const [publicKeyTitle, setPublicKeyTitle] = useState<string>('')
    const [publicKeys, setPublicKeys] = useState<
        Array<{ id: string; title: string; key: string }>
    >([])
    const [selectedPublicKey, setSelectedPublicKey] = useState<string>('')

    useEffect(() => {
        fetchPublicKeys()
    }, [])

    const fetchPublicKeys = async () => {
        const { data, error } = await supabase()
            .from('public_keys')
            .select('id, title, key')

        if (error) {
            console.error('Error fetching public keys:', error)
        } else {
            setPublicKeys(
                data?.map((item) => ({
                    id: item.id,
                    title: item.title,
                    key: item.key,
                })) || []
            )
        }
    }

    const generateKeyPair = async () => {
        const { publicKey, privateKey } = await encrypter.getJwkKeyPair()

        const publicKeyString = JSON.stringify(publicKey, null, 2)
        let saved = true

        if (savePublicKey && publicKeyTitle) {
            saved = await savePublicKeyToSupabase(publicKeyString, publicKeyTitle)
        }

        if (!saved) {
            return
        }
        setPublicKey(publicKeyString)
        setPrivateKey(JSON.stringify(privateKey, null, 2))
    }

    const savePublicKeyToSupabase = async (key: string, title: string) => {
        const { error } = await supabase()
            .from('public_keys')
            .insert({ title, key })

        if (error) {
            const errorMessage =
                error.code == '23505' // Postgresql error code - unique constraint violation
                    ? 'Public key with this title already exists'
                    : error.message
            toast({
                title: 'Error saving public key',
                description: errorMessage,
                variant: 'destructive',
            })
            return false
        }
        fetchPublicKeys()
        return true
    }

    const encryptMessage = async () => {
        try {
            const { encrypted } = await encrypter.encrypt(publicKey, message)
            setEncryptedMessage(encrypted)
        } catch {
            toast({
                title: 'Error encrypting message',
                description:
                    'Error: Invalid public key format or encryption failed',
                variant: 'destructive',
            })

            setEncryptedMessage('')
        }
    }

    const decryptMessage = async () => {
        try {
            const { decrypted } = await encrypter.decrypt(
                privateKey,
                encryptedMessage
            )
            setDecryptedMessage(decrypted)
        } catch {
            toast({
                title: 'Error decrypting message',
                description:
                    'Error: Invalid private key format or decryption failed',
                variant: 'destructive',
            })
            setDecryptedMessage('')
        }
    }

    const handlePublicKeySelect = (keyId: string) => {
        const selectedKey = publicKeys.find((key) => key.id === keyId)
        if (selectedKey) {
            setPublicKey(selectedKey.key)
            setSelectedPublicKey(keyId)
        }
    }

    return (
        <div className="container mx-auto p-4 space-y-6 max-w-7xl">
            <Card className="max-w-md w-full relative">
                <CardHeader>
                    <div className="absolute top-0 right-0">
                        <Button
                            className="text-red-500 hover:bg-red-500 text-white rounded-tl-none rounded-br-none hover:shadow-xl transition duration-300 ease-in-out"
                            onClick={logout}
                        >
                            <LogOutIcon /> Logout
                        </Button>
                    </div>
                    <div>
                        <CardTitle>Secret Sharing App</CardTitle>
                        <CardDescription>
                            Share secrets using asymmetric encryption
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="generate">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="generate">Generate</TabsTrigger>
                            <TabsTrigger value="encrypt">Encrypt</TabsTrigger>
                            <TabsTrigger value="decrypt">Decrypt</TabsTrigger>
                        </TabsList>
                        <TabsContent value="generate" className="space-y-4">
                            <Alert className="my-10">
                                <BadgeInfo className="h-4 w-4" />
                                <AlertTitle>Public/Private Key Pair</AlertTitle>
                                <AlertDescription className="text-gray-600">
                                    Generate (and/or save) a new public/private
                                    key pair used in asymmetric encryption.
                                </AlertDescription>
                            </Alert>
                            <div className="flex items-center space-x-2 pb-2">
                                <Switch
                                    id="save-public-key"
                                    checked={savePublicKey}
                                    onCheckedChange={setSavePublicKey}
                                />
                                <Label htmlFor="save-public-key">
                                    Save Public Key
                                </Label>
                            </div>
                            {savePublicKey && (
                                <div>
                                    <Label htmlFor="public-key-title">
                                        Public Key Title
                                    </Label>
                                    <Input
                                        id="public-key-title"
                                        value={publicKeyTitle}
                                        onChange={(e) =>
                                            setPublicKeyTitle(e.target.value)
                                        }
                                        className="mt-1"
                                        required
                                    />
                                </div>
                            )}
                            <div>
                                <Button
                                    onClick={generateKeyPair}
                                    className="w-full"
                                >
                                    Generate New Key Pair
                                </Button>
                            </div>
                            {publicKey && (
                                <div>
                                    <Label htmlFor="publicKey">
                                        Public Key (share this):
                                    </Label>
                                    <Textarea
                                        id="publicKey"
                                        value={publicKey}
                                        readOnly
                                        className="mt-1 select-all"
                                        rows={8}
                                    />
                                </div>
                            )}
                            {privateKey && (
                                <div>
                                    <Label htmlFor="privateKey">
                                        Private Key (keep this secret):
                                    </Label>
                                    <Textarea
                                        id="privateKey"
                                        value={privateKey}
                                        readOnly
                                        className="mt-1 select-all"
                                        rows={8}
                                    />
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="encrypt" className="space-y-4">
                            <Alert className="my-10">
                                <BadgeInfo className="h-4 w-4" />
                                <AlertTitle>Encrypt with Public Key</AlertTitle>
                                <AlertDescription className="text-gray-600">
                                    Encrypt the secret with a saved or new
                                    public key for asymmetric encryption.
                                </AlertDescription>
                            </Alert>
                            <div>
                                <Label htmlFor="selectPublicKey">
                                    Select Public Key:
                                </Label>
                                <Select
                                    onValueChange={handlePublicKeySelect}
                                    value={selectedPublicKey}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a public key" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {publicKeys.length > 0 ? (
                                            publicKeys.map((key) => (
                                                <SelectItem
                                                    key={key.id}
                                                    value={key.id}
                                                >
                                                    {key.title}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem
                                                disabled={true}
                                                value="null"
                                            >
                                                No public keys available
                                            </SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="encryptPublicKey">
                                    Public Key for Encryption (JWK format):
                                </Label>
                                <Textarea
                                    id="encryptPublicKey"
                                    value={publicKey}
                                    onChange={(e) =>
                                        setPublicKey(e.target.value)
                                    }
                                    className="mt-1"
                                    rows={8}
                                />
                            </div>
                            <div>
                                <Label htmlFor="messageToEncrypt">
                                    Message to Encrypt:
                                </Label>
                                <Textarea
                                    id="messageToEncrypt"
                                    value={message}
                                    rows={4}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Button
                                    onClick={encryptMessage}
                                    disabled={!publicKey || !message}
                                    className="w-full"
                                >
                                    Encrypt Message
                                </Button>
                            </div>
                            {encryptedMessage && (
                                <div>
                                    <Label htmlFor="encryptedMessage">
                                        Encrypted Message:
                                    </Label>
                                    <Textarea
                                        id="encryptedMessage"
                                        value={encryptedMessage}
                                        readOnly
                                        className="mt-1 select-all"
                                        rows={4}
                                    />
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="decrypt" className="space-y-4">
                            <Alert className="my-10">
                                <BadgeInfo className="h-4 w-4" />
                                <AlertTitle>
                                    Decrypt with Private Key
                                </AlertTitle>
                                <AlertDescription className="text-gray-600">
                                    Decrypt the secret with your own private key
                                    and encrypted message.
                                </AlertDescription>
                            </Alert>
                            <div>
                                <Label htmlFor="decryptPrivateKey">
                                    Private Key for Decryption (JWK format):
                                </Label>
                                <Textarea
                                    id="decryptPrivateKey"
                                    value={privateKey}
                                    onChange={(e) =>
                                        setPrivateKey(e.target.value)
                                    }
                                    className="mt-1"
                                    rows={8}
                                />
                            </div>
                            <div>
                                <Label htmlFor="messageToDecrypt">
                                    Encrypted Message to Decrypt:
                                </Label>
                                <Textarea
                                    id="messageToDecrypt"
                                    value={encryptedMessage}
                                    onChange={(e) =>
                                        setEncryptedMessage(e.target.value)
                                    }
                                    className="mt-1"
                                    rows={4}
                                />
                            </div>
                            <div>
                                <Button
                                    onClick={decryptMessage}
                                    disabled={!privateKey || !encryptedMessage}
                                    className="w-full"
                                >
                                    Decrypt Message
                                </Button>
                            </div>
                            {decryptedMessage && (
                                <div>
                                    <Label htmlFor="decryptedMessage">
                                        Decrypted Message:
                                    </Label>
                                    <Textarea
                                        id="decryptedMessage"
                                        value={decryptedMessage}
                                        readOnly
                                        rows={4}
                                        className="mt-1 select-all"
                                    />
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
