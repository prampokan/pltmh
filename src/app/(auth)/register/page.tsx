import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Register() {
  return (
    <div className="w-full max-w-[25rem]">
      <h1 className="text-xl font-semibold tracking-tight">Admin Register</h1>
      <p className="mb-5 mt-2 text-muted-foreground">
        Daftar Akun Sistem Monitoring PLTMH.
      </p>
      <form>
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="johndoe@mail.com"
          className="mb-4 mt-1"
        />
        <Label>Nama Lengkap</Label>
        <Input type="text" placeholder="John Doe" className="mb-4 mt-1" />
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="********"
          className="mb-4 mt-1"
        ></Input>
        <Label>Konfirmasi Password</Label>
        <Input
          type="password"
          placeholder="********"
          className="mb-4 mt-1"
        ></Input>
        <Button type="submit" className="w-full" variant="secondary">
          Daftar
        </Button>
      </form>
      <p className="text-center text-muted-foreground mt-5">
        Sudah punya akun?{" "}
        <Link href="/login" className="text-blue-500 underline">
          Masuk
        </Link>
      </p>
    </div>
  );
}
