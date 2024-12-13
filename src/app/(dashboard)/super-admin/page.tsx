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
    email: "johndoe@mail.com",
    name: "John Doe",
    role: "Super Admin",
  },
];

export default function SuperAdmin() {
  return (
    <>
      <Header
        head="Data Super Admin"
        body="Menampilkan semua data super admin."
      />
      <Table>
        <TableCaption>Menampilkan semua data super admin.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">NO</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Nama Lengkap</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((data, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.role}</TableCell>
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
