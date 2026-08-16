#!/usr/bin/env node
/**
 * Writes the Supabase database password into backend/.env.production,
 * percent-encoding any characters that are reserved inside a connection URL.
 *
 * Solves two problems that otherwise surface as a confusing
 * "password authentication failed":
 *   1. '#' in an unquoted .env value starts a comment and truncates it.
 *   2. '@', '#', '/', ':' and friends are URL delimiters and must be encoded.
 *
 * When run in a terminal the password is hidden as you type, and it is never
 * printed or logged. It also accepts input on stdin, so it works in scripts.
 *
 * Usage:  pnpm db:set-password
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", ".env.production");

/** Reads a line from stdin, masking echo when attached to a terminal. */
function readSecret(prompt) {
  return new Promise((resolve, reject) => {
    const { stdin, stdout } = process;
    const isTTY = Boolean(stdin.isTTY);
    stdout.write(prompt);

    let value = "";
    if (!isTTY) {
      // Piped input: read the first line as-is.
      stdin.setEncoding("utf8");
      stdin.on("data", (chunk) => {
        value += chunk;
        const nl = value.indexOf("\n");
        if (nl !== -1) {
          stdin.pause();
          stdout.write("\n");
          resolve(value.slice(0, nl));
        }
      });
      stdin.on("end", () => resolve(value));
      stdin.on("error", reject);
      return;
    }

    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    const onData = (char) => {
      switch (char) {
        case "\r":
        case "\n":
        case "\u0004": // Ctrl-D
          stdin.setRawMode(false);
          stdin.pause();
          stdin.removeListener("data", onData);
          stdout.write("\n");
          resolve(value);
          break;
        case "\u0003": // Ctrl-C
          stdin.setRawMode(false);
          stdin.pause();
          stdout.write("\n");
          process.exit(130);
          break;
        case "\u007f": // Backspace
        case "\b":
          value = value.slice(0, -1);
          break;
        default:
          // Ignore remaining control characters.
          if (char >= " ") value += char;
      }
    };

    stdin.on("data", onData);
  });
}

const main = async () => {
  if (!existsSync(envPath)) {
    console.error(`Not found: ${envPath}`);
    process.exit(1);
  }

  const password = (await readSecret("Supabase database password: ")).trim();
  if (!password) {
    console.error("No password entered — nothing changed.");
    process.exit(1);
  }

  const encoded = encodeURIComponent(password);
  const contents = readFileSync(envPath, "utf8");

  // Replace the placeholder, or an existing password, in both URLs.
  const updated = contents.replace(/(postgresql:\/\/postgres:)([^@]*)(@db\.)/g, `$1${encoded}$3`);

  if (updated === contents) {
    console.error("Could not find the connection URLs to update. Check the file format.");
    process.exit(1);
  }

  writeFileSync(envPath, updated);

  const specials = [...new Set([...password].filter((c) => encodeURIComponent(c) !== c))];
  console.log("✓ Wrote password into backend/.env.production");
  if (specials.length > 0) {
    console.log(`✓ Percent-encoded ${specials.length} special character type(s)`);
  }
  console.log("\nNext:  pnpm --filter backend prisma:status:prod");
};

main();
