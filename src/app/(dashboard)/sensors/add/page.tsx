"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import Header from "@/components/header";
import { useToast } from "@/hooks/use-toast";

export default function Add() {
  const [entityType, setEntityType] = useState("");
  const [entityId, setEntityId] = useState("");

  const router = useRouter();
  const { toast } = useToast();

  const addSensor = async (e: any) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "devices"), {
        entityType: entityType,
        entityId: entityId,
        created_at: new Date(),
      });
    } catch (error) {
      console.error(error);
    } finally {
      toast({
        title: "Device baru ditambahkan",
        description: "Device baru telah ditambahkan.",
      });
      router.push("/sensors");
    }
  };
  return (
    <div>
      <Header head="Tambah Sensor Baru" body="Tambah Sensor Baru." />
      <form onSubmit={addSensor} className="w-full md:w-1/2">
        <Label>Entity Type</Label>
        <Input
          type="text"
          placeholder="Entity Type"
          value={entityType}
          onChange={(e) => setEntityType(e.target.value)}
          className="mb-5 mt-2"
          required
        />
        <Label>Entity Id</Label>
        <Input
          type="text"
          placeholder="Entity Id"
          value={entityId}
          onChange={(e) => setEntityId(e.target.value)}
          className="mb-5 mt-2"
          required
        />
        <div className="flex justify-between">
          <Link href="/sensors">
            <Button type="submit" variant="outline">
              Batal
            </Button>
          </Link>
          <Button type="submit" variant="outline">
            Tambah
          </Button>
        </div>
      </form>
    </div>
  );
}
