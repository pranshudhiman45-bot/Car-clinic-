import { PrismaClient, DayOfWeek } from "@prisma/client";

const prisma = new PrismaClient();

const businessHours: { dayOfWeek: DayOfWeek; openTime: string; closeTime: string }[] = [
  { dayOfWeek: "MONDAY", openTime: "09:00", closeTime: "19:00" },
  { dayOfWeek: "TUESDAY", openTime: "09:00", closeTime: "19:00" },
  { dayOfWeek: "WEDNESDAY", openTime: "09:00", closeTime: "19:00" },
  { dayOfWeek: "THURSDAY", openTime: "09:00", closeTime: "19:00" },
  { dayOfWeek: "FRIDAY", openTime: "09:00", closeTime: "19:00" },
  { dayOfWeek: "SATURDAY", openTime: "09:00", closeTime: "19:00" },
  { dayOfWeek: "SUNDAY", openTime: "10:00", closeTime: "17:00" },
];

async function main() {
  for (const hours of businessHours) {
    await prisma.businessHours.upsert({
      where: { dayOfWeek: hours.dayOfWeek },
      update: {},
      create: hours,
    });
  }

  const carWash = await prisma.category.upsert({
    where: { slug: "car-wash" },
    update: {},
    create: { name: "Car Wash", slug: "car-wash" },
  });

  const detailing = await prisma.category.upsert({
    where: { slug: "detailing" },
    update: {},
    create: { name: "Detailing", slug: "detailing" },
  });

  await prisma.service.upsert({
    where: { slug: "basic-wash" },
    update: {},
    create: {
      categoryId: carWash.id,
      name: "Basic Wash",
      slug: "basic-wash",
      basePrice: 15,
      durationMinutes: 30,
      requiredWorkers: 1,
    },
  });

  await prisma.service.upsert({
    where: { slug: "full-interior-detailing" },
    update: {},
    create: {
      categoryId: detailing.id,
      name: "Full Interior Detailing",
      slug: "full-interior-detailing",
      basePrice: 80,
      durationMinutes: 120,
      requiredWorkers: 2,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
