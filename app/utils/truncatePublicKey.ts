export const truncatePublicKey = (publicKey: string, chars = 4): string => {
  const start = publicKey.slice(0, chars);
  const end = publicKey.slice(-chars);
  return `${start}...${end}`;
};
