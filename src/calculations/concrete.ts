export const calculateConcrete = (length: number, width: number, depth: number, wastePercent: number) => {
  const baseVolume = length * width * depth;
  const withWaste = baseVolume * (1 + wastePercent / 100);
  return { baseVolume, withWaste };
};
