"use client";

import Header from "@/components/header";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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
    powerResult: "",
    operationalHours: "",
    averagePerHour: "",
    operator: "",
    guard: "",
    information: "",
  });

  useEffect(() => {
    if (id) {
      getReportById(id);
    }
  }, [id]);

  const getReportById = async (id: string) => {
    try {
      const docRef = doc(db, "monthlyReport", id);
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
      const docRef = doc(db, "monthlyReport", id);
      await updateDoc(docRef, formData);
      toast({
        title: "Data Berhasil Diperbarui",
        description: "Selamat datang ke Sistem Monitoring PLTMH",
      });
      router.push("/monthly-report");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <>
      <Header head="Edit Laporan Bulanan" body="Edit Laporan Bulanan." />
      <form className="w-full md:w-1/2" onSubmit={handleSubmit}>
        <Label>Power Result</Label>
        <Input
          type="text"
          name="powerResult"
          placeholder="Power Result"
          className="mb-5 mt-2"
          value={formData.powerResult}
          onChange={handleChange}
          required
        />

        <Label>Operational Hours</Label>
        <Input
          type="text"
          name="operationalHours"
          placeholder="Operational Hours"
          className="mb-5 mt-2"
          value={formData.operationalHours}
          onChange={handleChange}
          required
        />

        <Label>Average Per Hour</Label>
        <Input
          type="text"
          name="averagePerHour"
          placeholder="Average Per Hour"
          className="mb-5 mt-2"
          value={formData.averagePerHour}
          onChange={handleChange}
          required
        />

        <Label>Operator</Label>
        <Input
          type="text"
          name="operator"
          placeholder="Operator"
          className="mb-5 mt-2"
          value={formData.operator}
          onChange={handleChange}
          required
        />

        <Label>Guard</Label>
        <Input
          type="text"
          name="guard"
          placeholder="Guard"
          className="mb-5 mt-2"
          value={formData.guard}
          onChange={handleChange}
          required
        />

        <Label>Information</Label>
        <Input
          type="text"
          name="information"
          placeholder="Information"
          className="mb-5 mt-2"
          value={formData.information}
          onChange={handleChange}
          required
        />

        <div className="flex justify-between">
          <Link href="/monthly-report">
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
