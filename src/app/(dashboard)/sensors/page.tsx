"use client";

import { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pen, Trash, Plus } from "lucide-react";
import { getDevices } from "@/service";

export default function Sensors() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await getDevices();
        setDevices(data);
      } catch (error) {
        console.error("Error fetching devices: ", error);
      }
    };
    fetchDevices();
  }, []);

  return (
    <>
      <Header head="Data Sensor" body="Menampilkan semua data sensor." />
      <Link href="/sensors/add">
        <Button className="mb-7" variant="outline">
          <Plus />
          Tambah Sensor
        </Button>
      </Link>
      <Table>
        <TableCaption>Menampilkan semua data sensor.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">NO</TableHead>
            <TableHead>Sensor</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device: any, i) => (
            <TableRow key={device.id}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>{device.entityType}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button size="icon" variant="outline">
                  <Pen />
                </Button>
                <Button size="icon" variant="outline">
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
