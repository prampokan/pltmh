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
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Pen, Sheet } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const DATA = [
  {
    kwhTotal: 3700000000,
    hasil: 3300,
    jamOperasional: 24,
    avgPerHour: 150,
    operator: "usman",
    penjaga: "nadri",
    keterangan: "normal",
  },
  {
    kwhTotal: 3700000000,
    hasil: 3300,
    jamOperasional: 24,
    avgPerHour: 150,
    operator: "usman",
    penjaga: "nadri",
    keterangan: "normal",
  },
  {
    kwhTotal: 3700000000,
    hasil: 3300,
    jamOperasional: 24,
    avgPerHour: 150,
    operator: "usman",
    penjaga: "nadri",
    keterangan: "normal",
  },
  {
    kwhTotal: 3700000000,
    hasil: 3300,
    jamOperasional: 24,
    avgPerHour: 150,
    operator: "usman",
    penjaga: "nadri",
    keterangan: "normal",
  },
  {
    kwhTotal: 3700000000,
    hasil: 3300,
    jamOperasional: 24,
    avgPerHour: 150,
    operator: "usman",
    penjaga: "nadri",
    keterangan: "normal",
  },
];

export default function MonthlyReport() {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(DATA);
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

  return (
    <>
      <Header head="Laporan Bulanan" body="Menampilkan Laporan Bulanan." />
      <div className="flex gap-x-2 mb-5">
        <Button variant="outline" onClick={exportToExcel}>
          <Sheet />
          Unduh Laporan
        </Button>
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
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Tanggal</TableHead>
            <TableHead>kWh Total</TableHead>
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
          {DATA.map((item, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>{item.kwhTotal}</TableCell>
              <TableCell>{item.hasil}</TableCell>
              <TableCell>{item.jamOperasional}</TableCell>
              <TableCell>{item.avgPerHour}</TableCell>
              <TableCell>{item.operator}</TableCell>
              <TableCell>{item.penjaga}</TableCell>
              <TableCell>{item.keterangan}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline">
                  <Pen />
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
