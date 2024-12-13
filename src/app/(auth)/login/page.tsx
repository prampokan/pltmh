import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Login() {
  return (
    <div className="w-full max-w-[25rem]">
      <h1 className="text-xl font-semibold tracking-tight">Admin Sign In</h1>
      <p className="mb-5 mt-2 text-muted-foreground">
        Masuk ke Sistem Monitoring PLTMH.
      </p>
      <form>
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="johndoe@mail.com"
          className="mb-4 mt-1"
        />
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="********"
          className="mb-4 mt-1"
        ></Input>
        <Button type="submit" className="w-full" variant="secondary">
          Log in
        </Button>
      </form>
      <p className="text-center text-muted-foreground mt-5">
        Belum punya akun?{" "}
        <Link href="/register" className="text-blue-500 underline">
          Daftar baru
        </Link>
      </p>
    </div>
  );
}
