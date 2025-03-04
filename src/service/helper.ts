export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("id-ID").format(value);
};

export const formatDate = (value: any) => {
  const date = new Date(value.seconds * 1000 + value.nanoseconds / 1e6);

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()]; // Get month name
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
