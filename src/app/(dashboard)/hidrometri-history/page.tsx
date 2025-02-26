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
import { db } from "@/lib/firebase";
import {
  getDocs,
  orderBy,
  query,
  collection,
  limit,
  startAfter,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";

export default function HidrometriHistory() {
  const [data, setData] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [firstDoc, setFirstDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  const getData = async (next = false, prev = false) => {
    setLoading(true);
    try {
      let q = query(
        collection(db, "hidrometriHistory"),
        orderBy("timestamp", "desc"),
        limit(15)
      );

      if (next && lastDoc) {
        q = query(
          collection(db, "hidrometriHistory"),
          orderBy("timestamp", "desc"),
          startAfter(lastDoc),
          limit(15)
        );
      }

      const snapshot = await getDocs(q);
      const docs: any = snapshot.docs;

      if (docs.length > 0) {
        setFirstDoc(docs[0]);
        setLastDoc(docs[docs.length - 1]);
      }

      const newData = docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
      setData(newData);
    } catch (error) {
      console.error("Error getting devices: ", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Header
        head="Hidrometri History"
        body="Menampilkan semua data history hidrometri."
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Waktu</TableHead>
            <TableHead>Water Level</TableHead>
            <TableHead>Velocity of Flow</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item.timestamp?.toDate().toLocaleString()}
              </TableCell>
              <TableCell>{item.waterLevel / 1000} m</TableCell>
              <TableCell>{item.velocityOfFlow / 1000} m/s</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <div className="flex mt-10 items-center gap-x-4">
          <Button
            variant="outline"
            disabled={page === 1 || loading}
            onClick={() => {
              setPage(page - 1);
              getData(false, true);
            }}
          >
            Previous
          </Button>
          <span className="font-semibold text-sm text-muted-foreground">
            Page {page}
          </span>
          <Button
            variant="outline"
            disabled={data.length < 15 || loading}
            onClick={() => {
              setPage(page + 1);
              getData(true);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
