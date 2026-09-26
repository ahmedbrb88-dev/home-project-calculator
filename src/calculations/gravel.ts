export const calculateGravel = (length: number, width: number, depth: number, wastePercent: number) => {
  const volume = length * width * depth;
  const weight = volume * 1.6; // approx 1.6 tons per m3
  return { volume: volume * (1 + wastePercent / 100), weight: weight * (1 + wastePercent / 100) };
};
