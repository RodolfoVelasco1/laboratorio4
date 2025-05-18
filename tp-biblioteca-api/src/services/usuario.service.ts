import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const getAllUsuarios = () => prisma.usuario.findMany();

export const getUsuarioById = (id: string) =>
  prisma.usuario.findUnique({ where: { id } });

export const createUsuario = async (nombre: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.usuario.create({
    data: { nombre, email, password: hashedPassword },
  });
};

export const updateUsuario = (id: string, nombre: string, email: string) =>
  prisma.usuario.update({
    where: { id },
    data: { nombre, email },
  });

export const deleteUsuario = (id: string) =>
  prisma.usuario.delete({ where: { id } });
