"use client";

import Header from "@/components/header";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Edit() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    jamPadam: "",
    jamMasuk: "",
    lamaPadam: "",
    bebanSaatPadam: "",
    energiTidakTersalurkan: "",
    penyebabTidakOperasi: "",
    timestamp: serverTimestamp(),
  });

  useEffect(() => {
    if (id) {
      getReportById(id);
    }
  }, [id]);

  const getReportById = async (id: string) => {
    try {
      const docRef = doc(db, "breakdownReport", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFormData(docSnap.data() as typeof formData);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "breakdownReport", id);
      await updateDoc(docRef, formData);
      toast({
        title: "Data Berhasil Diperbarui",
        description: "Selamat datang ke Sistem Monitoring PLTMH",
      });
      router.push("/breakdown-report");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <>
      <Header head="Edit Laporan Bulanan" body="Edit Laporan Bulanan." />
      <form className="w-full md:w-1/2" onSubmit={handleSubmit}>
        <Label>Jam Padam</Label>
        <Input
          type="text"
          name="jamPadam"
          placeholder="Jam Padam"
          className="mb-5 mt-2"
          value={formData.jamPadam}
          onChange={handleChange}
          required
        />

        <Label>Jam Masuk</Label>
        <Input
          type="text"
          name="jamMasuk"
          placeholder="Jam Masuk"
          className="mb-5 mt-2"
          value={formData.jamMasuk}
          onChange={handleChange}
          required
        />

        <Label>Lama Waktu Padam</Label>
        <Input
          type="text"
          name="lamaPadam"
          placeholder="Lama Waktu Padam"
          className="mb-5 mt-2"
          value={formData.lamaPadam}
          onChange={handleChange}
          required
        />

        <Label>Beban Saat Padam</Label>
        <Input
          type="text"
          name="bebanSaatPadam"
          placeholder="Beban Saat Padam"
          className="mb-5 mt-2"
          value={formData.bebanSaatPadam}
          onChange={handleChange}
          required
        />

        <Label>Energi Tidak Tersalurkan</Label>
        <Input
          type="text"
          name="energiTidakTersalurkan"
          placeholder="Energi Tidak Tersalurkan"
          className="mb-5 mt-2"
          value={formData.energiTidakTersalurkan}
          onChange={handleChange}
          required
        />

        <Label>Penyebab tidak operasi</Label>
        <Input
          type="text"
          name="penyebabTidakOperasi"
          placeholder="Penyebab tidak operasi"
          className="mb-5 mt-2"
          value={formData.penyebabTidakOperasi}
          onChange={handleChange}
          required
        />

        <div className="flex justify-between">
          <Link href="/breakdown-report">
            <Button type="button" variant="outline">
              Batal
            </Button>
          </Link>
          <Button type="submit" variant="default">
            Simpan
          </Button>
        </div>
      </form>
    </>
  );
}
