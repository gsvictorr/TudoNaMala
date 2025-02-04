import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth-token")?.value;

  if (authToken) {

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      await jwtVerify(authToken, secret);

      return NextResponse.next();

    } catch (error) {
      console.error('Erro ao verificar o token:', error);
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.set("auth-token", "", { maxAge: 0 })
      return response;
    }
  } else {

    return NextResponse.redirect(new URL("/", request.url));

  }
}

export const config = {
  matcher: [
    '/teste',
    '/totestando'
  ],
};