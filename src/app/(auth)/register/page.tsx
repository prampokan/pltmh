"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { db, auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const frameworks = [
  {
    value: "superadmin",
    label: "Super Admin",
  },
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "teknisi",
    label: "Teknisi",
  },
];

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!value) {
      setError("Isi role terlebih dahulu!");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok!");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User Registered: ", user);

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: name,
        role: value,
      });

      toast({
        title: "Berhasil Registrasi",
        description: "Akun baru telah ditambahkan.",
      });

      router.push("/login");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === "auth/email-already-in-use") {
        setError("Email sudah terdaftar! Silakan gunakan email lain.");
      } else if (errorCode === "auth/weak-password") {
        setError("Password harus lebih dari 6 karakter!");
      } else {
        setError(errorMessage);
        console.log(errorCode, errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[25rem]">
      <h1 className="text-xl font-semibold tracking-tight">Admin Register</h1>
      <p className="mb-5 mt-2 text-muted-foreground">
        Daftar Akun Sistem Monitoring PLTMH.
      </p>
      <form onSubmit={handleRegister}>
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="johndoe@mail.com"
          className="mb-4 mt-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Label>Nama Lengkap</Label>
        <Input
          type="text"
          placeholder="John Doe"
          className="mb-4 mt-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Label>Pilih Role</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between mb-5 mt-1"
            >
              {value
                ? frameworks.find((framework) => framework.value === value)
                    ?.label
                : "Pilih Role..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Cari Role..." className="h-9" />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {framework.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === framework.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="********"
          className="mb-4 mt-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></Input>
        <Label>Konfirmasi Password</Label>
        <Input
          type="password"
          placeholder="********"
          className="mb-4 mt-1"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        ></Input>
        <p className="text-red-500 font-medium text-sm mb-5">{error}</p>
        <Button
          type="submit"
          className="w-full"
          variant="secondary"
          disabled={loading}
        >
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
