import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(request: NextRequest) {
  try {
    // Obter o token JWT dos cookies
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Token não encontrado' }, { status: 401 });
    }

    // Verificar o token JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // Retornar os dados do usuário
    return NextResponse.json({ user: payload });
    
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error);
    return NextResponse.json({ error: 'Token inválido ou expirado' }, { status: 401 });
  }
}