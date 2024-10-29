export function Delay(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export function GetRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result as string;
}

export function GetRandomColor(withHash?: boolean) {
  const letters = "0123456789ABCDEF";
  let color = withHash ? "#" : "";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color as string;
}

export function Capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function NumberWithDots(num: number) {
  return num.toLocaleString("de-DE");
}

export function DotsToNumber(numWithDots: string) {
  return parseFloat(numWithDots.replace(/\./g, ""));
}

// ? idk how the hell is this function even work lmao
// ? Somehow manages to convert image/file input into URLs. Does it work? Yes, How? Great question.
export async function GetFileChange(file: File | undefined): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Error reading file"));
      reader.readAsDataURL(file);
    } else reject(new Error("Invalid file(s) provided"));
  });
}
