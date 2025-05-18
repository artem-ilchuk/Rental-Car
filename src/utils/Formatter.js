export const formattedAddress = (address) => {
  if (!address) return { city: "", country: "" };

  const parts = address.split(",").map((part) => part.trim());

  const city = parts[1] || "";
  const country = parts[2] || "";

  return { city, country };
};

export const formattedMileage = (mileage) => {
  if (!mileage) return "";

  return mileage.toLocaleString("en-US").replace(/,/g, " ");
};

export const formattedId = (id) => {
  return typeof id === "string" ? id.slice(0, 4) : "";
};
