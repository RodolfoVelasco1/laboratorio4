import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as UsuarioService from "../services/usuario.service";

const prisma = new PrismaClient();

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await UsuarioService.getAllUsuarios();
  res.json(usuarios);
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await prisma.usuario.findUnique({ where: { id } });
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(usuario);
};

export const registerUsuario = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await prisma.usuario.create({
      data: { nombre, email, password: hashedPassword },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Error al registrar usuario" });
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  try {
    const updated = await prisma.usuario.update({
      where: { id },
      data: { nombre, email },
    });
    res.json(updated);
  } catch (error) {
    res.status(404).json({ error: "Usuario no encontrado" });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.usuario.delete({ where: { id } });
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(404).json({ error: "Usuario no encontrado" });
  }
};
