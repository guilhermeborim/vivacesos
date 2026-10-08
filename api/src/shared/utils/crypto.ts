import crypto from "crypto";

const algorithm = "aes-256-cbc";
const ivLength = 16;

function getSecretKey(): Buffer {
  const value = process.env.CRYPTO_SECRET_KEY;
  if (!value) {
    throw new Error("CRYPTO_SECRET_KEY não foi configurada.");
  }

  const key = /^[a-f0-9]{64}$/i.test(value)
    ? Buffer.from(value, "hex")
    : Buffer.from(value, "utf8");

  if (key.length !== 32) {
    throw new Error(
      "CRYPTO_SECRET_KEY deve conter 32 bytes em UTF-8 ou 64 caracteres hexadecimais.",
    );
  }

  return key;
}

export function encrypt(text: string) {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, getSecretKey(), iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
}

export function decrypt(encryptedText: string) {
  const [ivHex, encrypted] = encryptedText.split(":");

  const decipher = crypto.createDecipheriv(
    algorithm,
    getSecretKey(),
    Buffer.from(ivHex, "hex"),
  );

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

export function hash(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}
