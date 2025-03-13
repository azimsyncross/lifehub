import crypto from 'crypto';

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function hashPassword(password: string): string {
  return crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  const hash = hashPassword(password);
  return hash === hashedPassword;
} 