import { authOptions } from "@/lib/nextAuth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
// export const config = {
//   runtime: "edge", // Ensure compatibility with Next.js API routes
// };
export { handler as GET, handler as POST };
