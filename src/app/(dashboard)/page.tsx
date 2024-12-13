import Header from "@/components/header";
import { Chart } from "../components/chart";

export default function Home() {
  return (
    <main>
      <Header
        head="Sistem Monitoring PLTMH"
        body="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium
        dolores ullam porro adipisci iure odit expedita amet asperiores."
      />
      <div className="grid grid-cols-5 gap-4">
        <div className="border rounded-md col-span-3 row-span-2"></div>
        <div className="h-60 border rounded-md"></div>
        <div className="h-60 border rounded-md"></div>
        <div className="h-60 border rounded-md col-span-2"></div>
        <div className="h-96 border rounded-md col-span-5">
          <Chart />
        </div>
      </div>
    </main>
  );
}
