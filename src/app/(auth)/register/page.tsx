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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
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
