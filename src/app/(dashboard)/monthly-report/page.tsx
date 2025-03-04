"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { FilePlus2, Pen, Sheet, Trash2 } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { db } from "@/lib/firebase";
import {
  getDocs,
  orderBy,
  query,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { formatDate } from "@/service/helper";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function MonthlyReport() {
  const [monthlyReport, setMonthlyReport] = useState([]);

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    getMonthlyReport();
  }, []);

  console.log(monthlyReport);

  const getMonthlyReport = async () => {
    try {
      const q = query(
        collection(db, "monthlyReport"),
        orderBy("timestamp", "desc")
      );
      const snapshot = await getDocs(q);
      const data: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMonthlyReport(data);
    } catch (error) {
      console.error("Error getting devices: ", error);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(monthlyReport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Bulanan");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "Laporan_Bulanan.xlsx");
  };

  const deleteReport = async (id: string) => {
    try {
      await deleteDoc(doc(db, "monthlyReport", id));
      toast({
        title: "Report Deleted",
        description: "Report Deleted Successfully",
      });
      getMonthlyReport();
    } catch (error) {
      console.error("error :", error);
    }
  };

  return (
    <>
      <Header head="Laporan Bulanan" body="Menampilkan Laporan Bulanan." />
      <div className="flex justify-between mb-5">
        <div className="flex gap-x-2">
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Pilih Bulan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24">Januari 2025</SelectItem>
              <SelectItem value="720">Februari 2025</SelectItem>
              <SelectItem value="8760">Maret 2025</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportToExcel}>
            <Sheet />
            Download Laporan
          </Button>
        </div>
        <Button variant="outline">
          <FilePlus2 />
          Buat Laporan Manual
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tanggal</TableHead>
            <TableHead>Hasil</TableHead>
            <TableHead>Jam Operasional</TableHead>
            <TableHead>Rata - rata per jam</TableHead>
            <TableHead>Operator</TableHead>
            <TableHead>Penjaga</TableHead>
            <TableHead>Keterangan</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {monthlyReport &&
            monthlyReport.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {formatDate(item.timestamp)}
                </TableCell>
                <TableCell>{item.powerResult}</TableCell>
                <TableCell>{item.operationalHours}</TableCell>
                <TableCell>{item.averagePerHour}</TableCell>
                <TableCell>{item.operator}</TableCell>
                <TableCell>{item.guard}</TableCell>
                <TableCell>{item.information}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Link href={`/monthly-report/edit/${item.id}`}>
                    <Button variant="outline">
                      <Pen />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    onClick={() => deleteReport(item.id)}
                    variant="outline"
                    size="icon"
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
