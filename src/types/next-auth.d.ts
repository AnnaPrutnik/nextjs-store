import { IUser } from './IUser';

interface AuthUser {
  user: Partial<IUser>;
}

declare module 'next-auth/jwt' {
  export interface JWT extends AuthUser {}
}

declare module 'next-auth' {
  export interface Session {
    user: Partial<IUser>;
  }
  export interface User extends IUser {}
}

// declare module 'next-autht' {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     user: {
//       /** The user's postal address. */
//       address: string;
//     };
//   }
// }
