import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email, name, password, secondPassword } = await request.json();

    if(password != secondPassword){
      return NextResponse.json(
        { error: 'As senhas não conferem.' },
        { status: 400 }
      );
    }


    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Usuário já existe' },
        { status: 400 }
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'Usuário criado', user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao criar usuário' },
      { status: 500 }
    );
  }
}