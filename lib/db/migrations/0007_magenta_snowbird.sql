CREATE TABLE IF NOT EXISTS "Wallet" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"publicKey" text NOT NULL,
	"encryptedPrivateKey" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"chain" varchar DEFAULT 'sui' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
