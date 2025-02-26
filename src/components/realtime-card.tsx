export default function RealtimeCard({ title, description, value, unit }: any) {
  return (
    <div className="w-full border rounded-lg cursor-pointer hover:bg-muted transition-all duration-300">
      <div className="border-b p-4">
        <h1 className="font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet.
        </p>
      </div>
      <div className="p-4 flex items-center justify-center h-44">
        <h1 className="font-bold text-xl">
          {value} <span className="text-sm font-light">{unit}</span>
        </h1>
      </div>
    </div>
  );
}
