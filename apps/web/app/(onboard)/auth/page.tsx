import { auth } from "@/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AuthForm } from "./form";

export default async function AuthPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.session) {
    redirect("/disover");
  }

  return <AuthForm />;
}
