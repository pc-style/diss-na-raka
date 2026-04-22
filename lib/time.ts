const GMT_PLUS_2_OFFSET_MS = 2 * 60 * 60 * 1000;

function shiftToGmtPlus2(iso: string) {
  return new Date(new Date(iso).getTime() + GMT_PLUS_2_OFFSET_MS);
}

export function formatDateTimeGmtPlus2(iso: string) {
  const shifted = shiftToGmtPlus2(iso);
  const year = shifted.getUTCFullYear();
  const month = String(shifted.getUTCMonth() + 1).padStart(2, "0");
  const day = String(shifted.getUTCDate()).padStart(2, "0");
  const hours = String(shifted.getUTCHours()).padStart(2, "0");
  const minutes = String(shifted.getUTCMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes} GMT+2`;
}

export function formatDateOnlyGmtPlus2(iso: string) {
  return formatDateTimeGmtPlus2(iso).slice(0, 10);
}

export function formatMilestoneDateGmtPlus2(iso: string) {
  return shiftToGmtPlus2(iso).toLocaleString("pl-PL", {
    timeZone: "UTC",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
