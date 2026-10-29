import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";
import { hashPassword } from "@/lib/auth/bcrypt";
import {
  InstructorType,
  PermissionLevel,
  Role,
  UserStatus,
} from "@/generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT ?? 3306),
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD ?? "",
  database: process.env.DATABASE_NAME!,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

const PASSWORDS = {
  admin: "T@iseer#2026_Admin!",
  institution: "Inst@2026#Demo!",
  instructor: "Instr@2026#Demo!",
  student: "Stud@2026#Demo!",
} as const;

async function main() {
  const adminPassword = await hashPassword(PASSWORDS.admin);
  const institutionPassword = await hashPassword(PASSWORDS.institution);
  const instructorPassword = await hashPassword(PASSWORDS.instructor);
  const studentPassword = await hashPassword(PASSWORDS.student);

  const admin = await prisma.user.upsert({
    where: { username: "TAISEER" },
    update: {
      name: "Taiseer Admin",
      email: "taiseer.admin@yut-ahp.local",
      phoneNumber: "+967700000001",
      passwordHash: adminPassword,
      profileImageUrl: null,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      phoneVerified: true,
    },
    create: {
      name: "Taiseer Admin",
      username: "taiseer",
      email: "taiseer.admin@yut-ahp.local",
      phoneNumber: "+967700000001",
      passwordHash: adminPassword,
      profileImageUrl: null,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      phoneVerified: true,
    },
  });

  await prisma.admin.upsert({
    where: { userId: admin.id },
    update: { permissionLevel: PermissionLevel.SUPER_ADMIN },
    create: {
      userId: admin.id,
      permissionLevel: PermissionLevel.SUPER_ADMIN,
    },
  });

  const institution = await prisma.user.upsert({
    where: { username: "institution.demo" },
    update: {
      name: "Demo Institution",
      email: "institution@yut-ahp.local",
      phoneNumber: "+967700000002",
      passwordHash: institutionPassword,
      profileImageUrl: null,
      role: Role.INSTITUTION,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      phoneVerified: true,
    },
    create: {
      name: "Demo Institution",
      username: "institution.demo",
      email: "institution@yut-ahp.local",
      phoneNumber: "+967700000002",
      passwordHash: institutionPassword,
      profileImageUrl: null,
      role: Role.INSTITUTION,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      phoneVerified: true,
    },
  });

  await prisma.institution.upsert({
    where: { userId: institution.id },
    update: {
      commercialRegistryNo: "YUT-DEMO-001",
      contactPersonName: "Institution Demo Manager",
    },
    create: {
      userId: institution.id,
      commercialRegistryNo: "YUT-DEMO-001",
      contactPersonName: "Institution Demo Manager",
    },
  });

  const instructor = await prisma.user.upsert({
    where: { username: "instructor.demo" },
    update: {
      name: "Demo Instructor",
      email: "instructor@yut-ahp.local",
      phoneNumber: "+967700000003",
      passwordHash: instructorPassword,
      profileImageUrl: null,
      role: Role.INSTRUCTOR,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      phoneVerified: true,
    },
    create: {
      name: "Demo Instructor",
      username: "instructor.demo",
      email: "instructor@yut-ahp.local",
      phoneNumber: "+967700000003",
      passwordHash: instructorPassword,
      profileImageUrl: null,
      role: Role.INSTRUCTOR,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      phoneVerified: true,
    },
  });

  await prisma.instructor.upsert({
    where: { userId: instructor.id },
    update: {
      cvUrl: null,
      instructorType: InstructorType.INSTITUTIONAL,
      academicId: "INS-DEMO-001",
      institutionId: institution.id,
    },
    create: {
      userId: instructor.id,
      cvUrl: null,
      instructorType: InstructorType.INSTITUTIONAL,
      academicId: "INS-DEMO-001",
      institutionId: institution.id,
    },
  });

  const student = await prisma.user.upsert({
    where: { username: "student.demo" },
    update: {
      name: "Demo Student",
      email: "student@yut-ahp.local",
      phoneNumber: "+967700000004",
      passwordHash: studentPassword,
      profileImageUrl: null,
      role: Role.STUDENT,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      phoneVerified: true,
    },
    create: {
      name: "Demo Student",
      username: "student.demo",
      email: "student@yut-ahp.local",
      phoneNumber: "+967700000004",
      passwordHash: studentPassword,
      profileImageUrl: null,
      role: Role.STUDENT,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      phoneVerified: true,
    },
  });

  await prisma.student.upsert({
    where: { userId: student.id },
    update: {
      major: "Information Technology",
      academicLevel: "Level 4",
      progressPoints: 0,
      academicId: "STD-DEMO-001",
      institutionId: institution.id,
    },
    create: {
      userId: student.id,
      major: "Information Technology",
      academicLevel: "Level 4",
      progressPoints: 0,
      academicId: "STD-DEMO-001",
      institutionId: institution.id,
    },
  });

  console.log("\nYUT-AHP authentication seed completed.\n");
  console.table([
    {
      role: "ADMIN",
      username: "taiseer",
      password: PASSWORDS.admin,
    },
    {
      role: "INSTITUTION",
      username: "institution.demo",
      password: PASSWORDS.institution,
    },
    {
      role: "INSTRUCTOR",
      username: "instructor.demo",
      password: PASSWORDS.instructor,
    },
    {
      role: "STUDENT",
      username: "student.demo",
      password: PASSWORDS.student,
    },
  ]);
}

main()
  .catch((error) => {
    console.error("SEED_ERROR:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
