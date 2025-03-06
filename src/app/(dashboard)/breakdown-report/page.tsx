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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

export default function BreakdownReport() {
  const [breakdownReport, setBreakdownReport] = useState([]);

  const { toast } = useToast();

  useEffect(() => {
    getBreakdownReport();
  }, []);

  console.log(breakdownReport);

  const getBreakdownReport = async () => {
    try {
      const q = query(
        collection(db, "breakdownReport")
        // orderBy("timestamp", "desc")
      );
      const snapshot = await getDocs(q);
      const data: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBreakdownReport(data);
    } catch (error) {
      console.error("Error getting devices: ", error);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(breakdownReport);
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
      await deleteDoc(doc(db, "breakdownReport", id));
      toast({
        title: "Report Deleted",
        description: "Report Deleted Successfully",
      });
      getBreakdownReport();
    } catch (error) {
      console.error("error :", error);
    }
  };

  return (
    <>
      <Header head="Laporan Gangguan" body="Menampilkan Laporan Gangguan." />
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
        <Link href="/breakdown-report/add">
          <Button variant="outline">
            <FilePlus2 />
            Buat Laporan Manual
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tanggal</TableHead>
            <TableHead>Jam Padam</TableHead>
            <TableHead>Jam Masuk</TableHead>
            <TableHead>Lama Padam</TableHead>
            <TableHead>Beban Saat Padam</TableHead>
            <TableHead>Energi Tidak Tersalurkan</TableHead>
            <TableHead>Penyebab Tidak Operasi</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {breakdownReport &&
            breakdownReport.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {formatDate(item.timestamp)}
                </TableCell>
                <TableCell>{item.jamPadam}</TableCell>
                <TableCell>{item.jamMasuk}</TableCell>
                <TableCell>{item.lamaPadam}</TableCell>
                <TableCell>{item.bebanSaatPadam}</TableCell>
                <TableCell>{item.energiTidakTersalurkan}</TableCell>
                <TableCell>{item.penyebabTidakOperasi}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Link href={`/breakdown-report/edit/${item.id}`}>
                    <Button variant="outline">
                      <Pen />
                      Edit
                    </Button>
                  </Link>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Trash2 />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteReport(item.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
