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
import { Pen, Trash } from "lucide-react";

const data = [
  {
    id: "1",
    sensor: "Hidrometri",
  },
];

export default function Sensors() {
  return (
    <>
      <Header head="Data Sensor" body="Menampilkan semua data sensor." />
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
          {data.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{data.id}</TableCell>
              <TableCell>{data.sensor}</TableCell>
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
