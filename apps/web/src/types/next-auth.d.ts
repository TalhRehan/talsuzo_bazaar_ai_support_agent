// import NextAuth, { DefaultSession } from "next-auth"




// declare module "next-auth" {


// interface user{
//      id: string,
//             name: string,
//             email: string,
//             accessToken: string
// }



// interface session{


// user:{
//     name:string,
//     email:string,
//     // image?:string| undefined
// }
// ,expires: string,
// id:string

// }

// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   interface JWT {
//    routeToken: string
//     id: string
//   }
// }

// }





import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    accessToken: string;
  }

  interface Session {
    user: {
      name: string;
      email: string;  id: string;
      accessToken: string;
    };
    expires: string;
    id: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    routeToken: string;
    id: string;
    accessToken: string;
  }
}