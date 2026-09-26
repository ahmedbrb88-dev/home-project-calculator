import { useState, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { priceEngine } from '../pricing/engine';
import type { PriceData } from '../pricing/types';

export const usePrice = (materialId: string, unit: string, materialFamily?: string, productForm?: string) => {
  const { country, currency } = useSettings();
  const [indicativePrice, setIndicativePrice] = useState<PriceData | null>(null);

  useEffect(() => {
    // Determine a region if we wanted to (currently undefined or a default)
    // Could come from SettingsContext if we add Region there later.
    const region = undefined; 
    
    const req: any = {
      materialId,
      country,
      region,
      currency,
      unit
    };
    if (materialFamily) req.materialFamily = materialFamily;
    if (productForm) req.productForm = productForm;

    const price = priceEngine.getIndicativePrice(req);
    
    setIndicativePrice(price);
  }, [materialId, country, currency, unit, materialFamily, productForm]);

  return { indicativePrice };
};
