import RSA_OAEP from './algorithms/RSA_OAEP'

export interface Encrypted {
    encrypted: string
}
export type Decrypted = {
    decrypted: string
}

export interface CryptoKeyPair {
    privateKey: CryptoKey
    publicKey: CryptoKey
}
export interface JsonKeyPair {
    privateKey: JsonWebKey
    publicKey: JsonWebKey
}

export interface Encrypter {
    getJwkKeyPair: () => Promise<JsonKeyPair>
    encrypt: (publicKey: string, data: string) => Promise<Encrypted>
    decrypt: (privateKey: string, data: string) => Promise<Decrypted>
}

export interface AlgoLib extends Encrypter {
    generateKeyPair: () => Promise<CryptoKeyPair>
}

type AlgoConstructor = new () => AlgoLib

export type Algorithms = 'RSA-OAEP' //| 'ECDH' | 'ECDSA' // Todo

const AlgoMap: Record<Algorithms, AlgoConstructor> = {
    'RSA-OAEP': RSA_OAEP,
    // 'ECDH': '', // Todo
    // 'ECDSA': '', // Todo
}

export default function encrypter(algorithm: Algorithms): Encrypter {
    const mapped = AlgoMap[algorithm]
    return {
        getJwkKeyPair: () => getJwkKeyPair(mapped),
        encrypt: (publicKey: string, data: string) =>
            encrypt(publicKey, data, mapped),
        decrypt: (privateKey: string, data: string) =>
            decrypt(privateKey, data, mapped),
    }
}

async function getJwkKeyPair(algorithm: AlgoConstructor): Promise<JsonKeyPair> {
    return new algorithm().getJwkKeyPair()
}

async function encrypt(
    publicKey: string,
    data: string,
    algorithm: AlgoConstructor
): Promise<Encrypted> {
    return new algorithm().encrypt(publicKey, data)
}

async function decrypt(
    privateKey: string,
    encryptedData: string,
    algorithm: AlgoConstructor
): Promise<Decrypted> {
    return new algorithm().decrypt(privateKey, encryptedData)
}
