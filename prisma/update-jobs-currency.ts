import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateJobsCurrency() {
  try {
    // First, try to add the currency column if it doesn't exist
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Job" 
      ADD COLUMN IF NOT EXISTS "currency" TEXT NOT NULL DEFAULT 'USD'
    `);

    console.log("✅ Currency column added to Job table");

    // Update any existing jobs that might have null currency
    const result = await prisma.$executeRawUnsafe(`
      UPDATE "Job" 
      SET "currency" = 'USD' 
      WHERE "currency" IS NULL OR "currency" = ''
    `);

    console.log("✅ Updated existing jobs with default currency (USD)");
    console.log(`   Rows affected: ${result}`);

    // Verify the update
    const jobs = await prisma.job.findMany({
      select: {
        id: true,
        title: true,
        currency: true,
      },
    });

    console.log("\n📋 Current jobs with currency:");
    jobs.forEach((job) => {
      console.log(`   - ${job.title}: ${job.currency}`);
    });
  } catch (error) {
    console.error("Error updating jobs currency:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateJobsCurrency();
