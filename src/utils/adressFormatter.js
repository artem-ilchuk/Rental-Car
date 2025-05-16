export const formattedAddress = (address) => {
  if (!address) return { city: "", country: "" };

  const parts = address.split(",").map((part) => part.trim());

  const city = parts[1] || "";
  const country = parts[2] || "";

  return { city, country };
};
