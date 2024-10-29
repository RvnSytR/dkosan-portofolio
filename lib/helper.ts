export const Delay = (seconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const GetRandomString = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result as string;
};

export const GetRandomColor = (withHash?: boolean) => {
  const letters = "0123456789ABCDEF";
  let color = withHash ? "#" : "";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color as string;
};

export const Capitalize = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const NumberWithDots = (num: number) => {
  return num.toLocaleString("de-DE");
};

export const DotsToNumber = (numWithDots: string) => {
  return parseFloat(numWithDots.replace(/\./g, ""));
};
