import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/auth/sign-in">Sign in</Link>
      </Button>
      <Button size="sm" asChild>
        <Link href="/auth/register">Create account</Link>
      </Button>
    </div>
  );
}

export default AuthButtons;
