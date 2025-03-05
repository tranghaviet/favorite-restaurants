import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  try {
    // Read restaurants data from JSON file
    const jsonPath = path.join(__dirname, "./restaurants.json");
    const restaurantsData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    console.log(`Found ${restaurantsData.length} restaurants in the JSON file`);

    // Clear existing data
    await prisma.restaurant.deleteMany({});
    console.log('Cleared existing restaurant data');

    // Insert restaurant data
    const restaurants = await prisma.restaurant.createMany({
      data: restaurantsData,
    });

    console.log(`Seeded ${restaurants.count} restaurants to the database`);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
