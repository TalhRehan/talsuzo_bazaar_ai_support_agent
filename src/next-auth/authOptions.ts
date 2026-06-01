
// import { NextAuthOptions } from "next-auth";
// import { decode } from "next-auth/jwt";
// import Credentials from "next-auth/providers/credentials";
// import {jwtDecode, JwtPayload} from "jwt-decode"
// export const authOptions: NextAuthOptions = {
//   providers: [
//     Credentials({
//       name: "login button",
//       credentials: {
//         email: { label: "email", type: "email" },
//         password: { label: "password", type: "password" },
//       },
//       async authorize(credentials,req) {
//         try {
//           const res = await fetch(
//             `https://ecommerce.routemisr.com/api/v1/auth/signin`,
//             {
//               method: "POST",
//               body: JSON.stringify({
//                 email: credentials?.email,
//                 password: credentials?.password,
//               }),
//               headers: { "content-type": "application/json" },
//             }
//           );
//           const result = await res.json();
// console.log("result of login",result);

//           if (!res.ok) {
//             throw new Error(result.message||"invalid login" );
//           }
// const jwt:{id:string} = jwtDecode(result.token)
// console.log("jwt decodeee",jwt);

//           return {
//             id: jwt.id,
//             name: result.user.name,
//             email: result.user.email,
//             accessToken: result.token
//           };
//         } catch (err) {
//           console.log("errorf api",err);
//           throw new Error((err as Error).message)
//           ||"invalid login";


//         }
//       },
//     }),
//   ],

// callbacks: {

//   jwt(param){
//   if (param.user){
//       console.log("jwt parammm",param);
//     param.token.routeToken =param.user.accessToken;
//     param.token.id =param.user.id
//   }
//     return param.token
//   }

//  ,session({token,session}){
//   session.id = token.id
//   console.log("session paramsss");

//   return session
//  }
// }



// ,pages: {
//   signIn: "/login",   error: "/login",
// }
// };











import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {

  providers: [
    Credentials({
      name: "login button",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {

        try {
          const res = await fetch(
            `https://ecommerce.routemisr.com/api/v1/auth/signin`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: { "content-type": "application/json" },
            }
          );

          const result = await res.json();
          console.log("result of login:", result);

          if (!res.ok) {
            throw new Error(result.message || "invalid login");
          }

          const jwt: { id: string } = jwtDecode(result.token);
          console.log("token:", result.token);

          return {
            id: jwt.id,
            name: result.user.name,
            email: result.user.email,
            accessToken: result.token,
          };
        } catch (err) {
          throw new Error((err as Error).message || "invalid login");
        }
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },

    session({ token, session }) {
      console.log("heeeere session")
      session.user.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      return session;
    }
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};