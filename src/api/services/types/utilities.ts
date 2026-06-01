import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getMyToken() {
  const cookieStore = await cookies()
  
  const encryptToken = 
    cookieStore.get('next-auth.session-token')?.value ??
    cookieStore.get('__Secure-next-auth.session-token')?.value

  if (!encryptToken) return null

  const accessToken = await decode({
    token: encryptToken,
    secret: process.env.NEXTAUTH_SECRET!
  })

  console.log("accessToken", accessToken?.accessToken)
  return accessToken?.accessToken ?? null
}
