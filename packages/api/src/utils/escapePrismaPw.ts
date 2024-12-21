/**
 * Escapes special characters in a string for use with Prisma.
 *
 * This function replaces all characters that are not alphanumeric or one of the reserved characters
 * (`-`, `_`, `.`, `~`) with their percent-encoded equivalents.
 *
 * @param input - The string to be escaped.
 * @returns The escaped string, with special characters percent-encoded.
 */
export const escapeForPrisma = (input: string): string => {
  const reservedCharacters = [
    "-", "_", ".", "~"
  ];

  const regex = new RegExp(
    `[^a-zA-Z0-9${reservedCharacters.map(char => `\\${char}`).join("")}]`,
    "g"
  );

  return input.replace(regex, char => encodeURIComponent(char));
}