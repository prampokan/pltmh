"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DisabledInput from "@/components/ui/disabled-input";
import { db, auth } from "@/lib/firebase";
import { updateDoc, doc } from "firebase/firestore";
import Header from "@/components/header";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/service";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Profile() {
  const [user, loading, error] = useAuthState(auth);
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        console.log("No user");
        return;
      }
      try {
        const data = await getCurrentUser(user.uid);
        setUid(user.uid);
        setEmail(data.email);
        setName(data.name);
        setRole(data.role);
      } catch (error) {
        console.error("Error fetching devices: ", error);
      }
    };
    fetchUser();
  }, []);

  const updateUser = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateDoc(doc(db, "users", uid), {
        name: name,
      });
      toast({
        title: "Berhasil edit nama",
        description: "Nama baru sudah tergantikan.",
      });
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header head="Profile Anda" body="Edit atau lihat profile anda." />
      <form className="w-full md:w-1/2" onSubmit={updateUser}>
        <Label>Email</Label>
        <DisabledInput>{email}</DisabledInput>
        <Label>Role</Label>
        <DisabledInput>{role}</DisabledInput>
        <Label>Nama Lengkap</Label>
        <Input
          type="text"
          placeholder="John Doe"
          className="mb-5 mt-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="flex justify-between">
          <Link href="/">
            <Button variant="outline">Batal</Button>
          </Link>
          <Button type="submit" variant="outline" disabled={isLoading}>
            Edit
          </Button>
        </div>
      </form>
    </div>
  );
}
