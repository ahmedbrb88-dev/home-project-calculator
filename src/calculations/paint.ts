export const calculatePaint = (length: number, height: number, doors: number, windows: number, coverage: number, coats: number) => {
  const doorArea = 2; // approx m2/sqft equivalent
  const windowArea = 1.5;
  let area = (length * height) - (doors * doorArea) - (windows * windowArea);
  if (area < 0) area = 0;
  
  const paintRequired = coverage > 0 ? (area * coats) / coverage : 0;
  return { paintableArea: area, totalLiters: paintRequired };
};
