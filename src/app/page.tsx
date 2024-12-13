import Header from "@/components/header";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="grid grid-cols-5 gap-4">
        <div className="border rounded-md col-span-3 row-span-2"></div>
        <div className="h-60 border rounded-md"></div>
        <div className="h-60 border rounded-md"></div>
        <div className="h-60 border rounded-md col-span-2"></div>
        <div className="h-96 border rounded-md col-span-5"></div>
      </div>
    </main>
  );
}