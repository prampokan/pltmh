"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from "@/components/header";
import { useState, useEffect } from "react";

export default function PowermeterHistory() {
  return (
    <>
      <Header
        head="Power Meter History"
        body="Menampilkan semua data history power meter."
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Waktu</TableHead>
            <TableHead>Active Power</TableHead>
            <TableHead>Speed Turbin</TableHead>
            <TableHead>Voltage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>asd</TableCell>
            <TableCell>asd</TableCell>
            <TableCell>asd</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
