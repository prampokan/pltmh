"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from "@/components/header";
import { useState, useEffect } from "react";

export default function HidrometriHistory() {
  return (
    <>
      <Header
        head="Hidrometri History"
        body="Menampilkan semua data history hidrometri."
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Waktu</TableHead>
            <TableHead>Water Level</TableHead>
            <TableHead>Velocity of Flow</TableHead>
            <TableHead>Debit</TableHead>
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
