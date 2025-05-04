-- Add new columns first
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "dynamicId" varchar NOT NULL UNIQUE;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "earlyAccess" boolean NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "referralCode" varchar NOT NULL UNIQUE;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "referringUserId" varchar;

-- Remove old columns (only after ensuring data migration if needed)
ALTER TABLE "User" DROP COLUMN IF EXISTS "email";
ALTER TABLE "User" DROP COLUMN IF EXISTS "password"; 