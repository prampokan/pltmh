"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      document.cookie = `token=${token}; path=/; secure; samesite=strict`;
      toast({
        title: "Login Berhasil",
        description: "Selamat datang ke Sistem Monitoring PLTMH",
      });

      window.location.href = "/";
    } catch (error: any) {
      const errorCode = error.code;

      if (errorCode === "auth/invalid-credential") {
        setError("Username atau password salah!");
      } else {
        setError("Terjadi kesalahan, silakan coba lagi.");
        console.error(errorCode, error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[25rem]">
      <h1 className="text-xl font-semibold tracking-tight">Admin Sign In</h1>
      <p className="mb-5 mt-2 text-muted-foreground">
        Masuk ke Sistem Monitoring PLTMH.
      </p>
      <form onSubmit={handleLogin}>
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="johndoe@mail.com"
          className="mb-4 mt-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="********"
          className="mb-4 mt-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></Input>
        <p className="text-red-500 font-medium text-sm mb-5">{error}</p>
        <Button
          type="submit"
          className="w-full"
          variant="secondary"
          disabled={loading}
        >
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
