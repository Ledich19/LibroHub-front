// /app/api/auth/login/route.ts
import { getClient } from "@/lib/apollo-server";
import { NextRequest, NextResponse } from "next/server";
import { LoginDocument, LoginMutation, MutationLoginArgs } from "../../../../../generated/graphql";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const { data } = await getClient().mutate<LoginMutation, MutationLoginArgs>({
    mutation: LoginDocument,
    variables: {
      email,
      password,
    },
  });
  console.log("---LOGIN", data);

  if (!data?.login?.token) {
    return new NextResponse("Неверный логин", { status: 401 });
  }

  const res = new NextResponse(null, { status: 200 });
  res.cookies.set({
    name: "session", // имя cookie
    value: data.login.token, // значение JWT
    httpOnly: true, // запретить доступ из JS
    secure: true, // включить только на HTTPS
    sameSite: "lax", // политика same-site
    path: "/", // доступна на всем сайте
  });

  return res;
}
