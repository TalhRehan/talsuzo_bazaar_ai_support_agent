//  import { getToken } from 'next-auth/jwt';
// import { NextRequest, NextResponse } from 'next/server'
 
//  export default async function proxy(request:NextRequest) {
// console.log("requesttt",request);
//   const protectedRoutes= [
//     "/cart","/wishlist","/checkout","/allorders","/profile"
// ];
//   const authRoutes= ["/login","/register"];
// const myPath=request.nextUrl.pathname;
// const myToken =await getToken({
//     req:request,
//     secret:process.env.NEXTAUTH_SECRET,
//     secureCookie: process.env.NODE_ENV ==="production"
// })
// const token = myToken?.accessToken
//  if(!token && protectedRoutes.some((path)=> myPath.startsWith(path))){
//     return NextResponse.redirect(new URL("/login",request.url))
//  }

//  if(token && authRoutes.some((path)=> myPath.startsWith(path))){
//     return NextResponse.redirect(new URL("/",request.url))
//  }
//  return NextResponse.next()
// }

// export const config ={
//     matcher: [    "/cart/:path*","/wishlist/:path*","/checkout/:path*","/allorders/:path*","/profile/:path*"
//         ,"/login","/register"
// ]
// }














import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ["/cart", "/wishlist", "/checkout", "/allorders", "/profile"];
const authRoutes = ["/login", "/register"];

export default async function middleware(request: NextRequest) {
  const myPath = request.nextUrl.pathname;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token?.accessToken; // ✅

  if (!isAuthenticated && protectedRoutes.some((path) => myPath.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && authRoutes.some((path) => myPath.startsWith(path))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/wishlist/:path*",
    "/checkout/:path*",
    "/allorders/:path*",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};