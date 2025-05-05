'use server';
import { customAlphabet } from 'nanoid';
import { user } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import db from '../db/client';

const generateReferralCode = async (): Promise<string> => {
  const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 8); // 8-character alphanumeric

  const MAX_ATTEMPTS = 10;
  let attempts = 0;

  while (attempts < MAX_ATTEMPTS) {
    const referralCode = nanoid();
    const existingCode = await db
      .select()
      .from(user)
      .where(eq(user.referralCode, referralCode));
    if (!existingCode[0]) {
      return referralCode;
    }

    attempts++;
  }

  // Failsafe: throw an error if a unique code couldn't be generated
  throw new Error(
    'Unable to generate a unique referral code after 10 attempts',
  );
};

export { generateReferralCode };
