import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Read JSON files
  const jobsData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data/jobs.json"), "utf-8"),
  );
  const articlesData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data/articles.json"), "utf-8"),
  );
  const caseStudiesData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data/caseStudies.json"), "utf-8"),
  );

  // Seed Jobs
  console.log("Seeding jobs...");
  for (const job of jobsData) {
    await prisma.job.upsert({
      where: { slug: job.slug },
      update: {},
      create: {
        title: job.title,
        slug: job.slug,
        company: job.company,
        location: job.location,
        type: job.type,
        modeOfWork: job.modeOfWork,
        salary: job.salary,
        category: job.category,
        openings: job.openings,
        posted: job.posted,
        description: job.description,
        tags: job.tags,
        isUrgent: job.isUrgent || false,
        applicationLink: job.applicationLink || null,
      },
    });
  }
  console.log(`✓ Seeded ${jobsData.length} jobs`);

  // Seed Articles
  console.log("Seeding articles...");
  for (const article of articlesData) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        title: article.title,
        slug: article.slug,
        author: article.author,
        category: article.category,
        coverImage: article.coverImage,
        readTime: article.readTime,
        tags: article.tags,
        excerpt: article.excerpt,
        featured: article.featured || false,
        content: article.content,
      },
    });
  }
  console.log(`✓ Seeded ${articlesData.length} articles`);

  // Seed Case Studies
  console.log("Seeding case studies...");
  for (const caseStudy of caseStudiesData) {
    await prisma.caseStudy.upsert({
      where: { slug: caseStudy.slug },
      update: {},
      create: {
        title: caseStudy.title,
        slug: caseStudy.slug,
        client: caseStudy.client,
        industry: caseStudy.industry,
        description: caseStudy.description,
        challenge: caseStudy.challenge,
        solution: caseStudy.solution,
        results: caseStudy.results,
        coverImage: caseStudy.coverImage,
        tags: caseStudy.tags,
        featured: caseStudy.featured || false,
        publishedAt: caseStudy.publishedAt
          ? new Date(caseStudy.publishedAt)
          : new Date(),
      },
    });
  }
  console.log(`✓ Seeded ${caseStudiesData.length} case studies`);

  console.log("Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
