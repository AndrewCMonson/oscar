export const escapeForPrisma = (input: string): string => {
  // Reserved characters we want to preserve, if any
  const reservedCharacters = [
    "-", "_", ".", "~"
  ];

  const regex = new RegExp(
    `[^a-zA-Z0-9${reservedCharacters.map(char => `\\${char}`).join("")}]`,
    "g"
  );

  return input.replace(regex, char => encodeURIComponent(char));
}