import 'server-only';

import { env } from '@/env.mjs';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

/**
 * Generate encrypted key pair
 */
export const generateEncryptedKeyPair = async () => {
  const keypair = new Ed25519Keypair();
  const [publicKey, secretKey] = [
    keypair.getPublicKey(),
    keypair.getSecretKey(),
  ];
  const encryptedPrivateKey = await WalletEncryption.encrypt(secretKey);
  return {
    publicKey: publicKey.toSuiAddress(),
    encryptedPrivateKey,
  };
};

/**
 * Decrypt private key
 */
export async function decryptPrivateKey(encryptedPrivateKey: string) {
  return await WalletEncryption.decrypt(encryptedPrivateKey);
}

/**
 * Wallet encryption tool class
 */
class WalletEncryption {
  private static readonly algorithm = 'aes-256-cbc';
  private static readonly encryptionKey = Buffer.from(
    env.WALLET_ENCRYPTION_KEY,
    'utf-8',
  ).subarray(0, 32);
  private static readonly ivLength = 16;

  static async encrypt(source: string): Promise<string> {
    try {
      const iv = randomBytes(WalletEncryption.ivLength);
      const cipher = createCipheriv(
        WalletEncryption.algorithm,
        WalletEncryption.encryptionKey,
        iv,
      );
      const encrypted = Buffer.concat([
        cipher.update(source, 'utf8'),
        cipher.final(),
      ]);
      const result = Buffer.concat([iv, encrypted]);
      return result.toString('base64');
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Failed to encrypt private key');
    }
  }

  static async decrypt(encrypted: string): Promise<string> {
    try {
      if (!encrypted) {
        throw new Error('Missing encrypted private key');
      }

      const encryptedBuffer = Buffer.from(encrypted, 'base64');
      const iv = encryptedBuffer.subarray(0, WalletEncryption.ivLength);
      const encryptedContent = encryptedBuffer.subarray(
        WalletEncryption.ivLength,
      );

      const decipher = createDecipheriv(
        WalletEncryption.algorithm,
        WalletEncryption.encryptionKey,
        iv,
      );
      const decrypted = Buffer.concat([
        decipher.update(encryptedContent),
        decipher.final(),
      ]);

      return decrypted.toString('utf8');
    } catch (error) {
      console.error('Decryption failed:', error);
      if (error instanceof Error) {
        throw new Error(`Private key decryption failed: ${error.message}`);
      }
      throw new Error('Private key decryption failed');
    }
  }
}
