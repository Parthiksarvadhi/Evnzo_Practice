import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Create a Seed User (from existing User schema)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);

  const user = await prisma.user.upsert({
    where: { email: 'admin@evnzo.com' },
    update: {},
    create: {
      email: 'admin@evnzo.com',
      name: 'Evnzo Admin',
      passwordHash: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log(`✅ Seed User created/verified: ${user.email} (ID: ${user.id})`);

  // 2. Create a Seed Event
  // Using a specific UUID or just letting it generate one, but upsert based on name is safer for seeds
  const eventName = 'The Grand Tech Summit 2026';
  const existingEvent = await prisma.event.findFirst({
    where: { name: eventName }
  });

  let event;
  if (existingEvent) {
    event = existingEvent;
    console.log(`✅ Seed Event already exists: ${event.name} (UUID: ${event.id})`);
  } else {
    event = await prisma.event.create({
      data: {
        name: eventName,
        description: 'An exclusive summit featuring the latest in AI, Web3, and Tech Innovations.',
      },
    });
    console.log(`✅ Seed Event created: ${event.name} (UUID: ${event.id})`);
  }

  console.log('----------------------------------------------------');
  console.log('🎉 Seeding finished perfectly!');
  console.log('--- TEST DATA YOU CAN USE ---');
  console.log(`User Email: ${user.email}`);
  console.log(`User Password: password123`);
  console.log(`Event ID (UUID): ${event.id}`);
  console.log('----------------------------------------------------');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
