import { Buffer } from "buffer";

export function isTokenExpired(token: string | null) {
  if (!token) {
    return true; // Token expired.
  }

  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const payload = JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));

  if (payload.exp) {
    const expirationDate = new Date(payload.exp * 1000);
    const currentDate = new Date();
    return expirationDate <= currentDate;
  }

  return false; // Token not expired.
}
