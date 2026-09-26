export const calculateTile = (roomL: number, roomW: number, tileL: number, tileW: number, wastePercent: number) => {
  const area = roomL * roomW;
  const tileArea = tileL * tileW;
  const tilesRequired = tileArea > 0 ? area / tileArea : 0;
  return { area, tilesRequired: Math.ceil(tilesRequired * (1 + wastePercent / 100)) };
};
