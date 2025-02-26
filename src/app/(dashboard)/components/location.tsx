export default function Location() {
  return (
    <div className="w-full border rounded-lg col-span-1">
      <div className="border-b p-4">
        <h1 className="font-bold">Lokasi PLTMH</h1>
        <p className="text-sm text-muted-foreground">Location.</p>
      </div>
      <div className="flex items-center justify-center h-64 overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2222.069226466859!2d109.54908842854691!3d-7.420440233615552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMjUnMTMuNyJTIDEwOcKwMzMnMDEuOSJF!5e0!3m2!1sen!2sid!4v1740579377897!5m2!1sen!2sid"
          width="100%"
          height="100%"
          style={{
            border: "0",
            borderBottomLeftRadius: "7px",
            borderBottomRightRadius: "7px",
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
