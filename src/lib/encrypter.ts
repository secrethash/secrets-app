type Encrypted = {
    encrypted: string
}
type Decrypted = {
    decrypted: string
}

export type Encrypt = (
    publicKey: JsonWebKey,
    data: string
) => Promise<Encrypted>

export type decrypt = (
    publicKey: JsonWebKey,
    data: string
) => Promise<Decrypted>

export const encrypter = {
    getJwkKeyPair,
    encrypt,
    decrypt,
}

async function generateKeyPair(): Promise<CryptoKeyPair> {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: 'RSA-OAEP',
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: 'SHA-256',
        },
        true,
        ['encrypt', 'decrypt']
    )
    return { privateKey: keyPair.privateKey, publicKey: keyPair.publicKey }
}

async function getJwkKeyPair() {
    return generateKeyPair()
        .then((keyPair) => {
            return Promise.all([
                window.crypto.subtle.exportKey('jwk', keyPair.publicKey),
                window.crypto.subtle.exportKey('jwk', keyPair.privateKey),
            ])
        })
        .then((jwkKeys) => {
            return { publicKey: jwkKeys[0], privateKey: jwkKeys[1] }
        })
}

async function encrypt(publicKey: string, data: string): Promise<Encrypted> {
    const publicKeyObj = JSON.parse(publicKey)
    const importedPublicKey = await window.crypto.subtle.importKey(
        'jwk',
        publicKeyObj,
        {
            name: 'RSA-OAEP',
            hash: 'SHA-256',
        },
        true,
        ['encrypt']
    )

    const encoder = new TextEncoder()
    const encodedMessage = encoder.encode(data)

    const encryptedBuffer = await window.crypto.subtle.encrypt(
        {
            name: 'RSA-OAEP',
        },
        importedPublicKey,
        encodedMessage
    )

    const encryptedArray = Array.from(new Uint8Array(encryptedBuffer))
    const encryptedBase64 = btoa(
        String.fromCharCode.apply(null, encryptedArray)
    )
    return { encrypted: encryptedBase64 }
}

async function decrypt(
    privateKey: string,
    encryptedData: string
): Promise<Decrypted> {
    const privateKeyObj = JSON.parse(privateKey)
    const importedPrivateKey = await window.crypto.subtle.importKey(
        'jwk',
        privateKeyObj,
        {
            name: 'RSA-OAEP',
            hash: 'SHA-256',
        },
        true,
        ['decrypt']
    )

    const encryptedArray = Uint8Array.from(atob(encryptedData), (c) =>
        c.charCodeAt(0)
    )

    const decryptedBuffer = await window.crypto.subtle.decrypt(
        {
            name: 'RSA-OAEP',
        },
        importedPrivateKey,
        encryptedArray
    )

    const decoder = new TextDecoder()
    const decryptedText = decoder.decode(decryptedBuffer)
    return { decrypted: decryptedText }
}
