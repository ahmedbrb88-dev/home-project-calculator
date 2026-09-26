import React from 'react';
import { useProject } from '../ProjectContext';
import { useSettings } from '../../../contexts/SettingsContext';
import { CheckCircle2, ShoppingCart, Clock, Calculator, CreditCard, List } from 'lucide-react';

export const StepSummary = () => {
  const { state, projectDef } = useProject();
  const { t, currency } = useSettings();

  if (!state || !projectDef) return null;

  const costKeys = Object.keys(state.results).filter(k => k.toLowerCase().includes('cost'));
  const hasMissingCosts = costKeys.some(k => state.results[k] === null || state.results[k] === undefined || state.results[k] === '');
  const totalCost = costKeys.reduce((sum, k) => sum + (Number(state.results[k]) || 0), 0);

  // Parse materials dynamically based on keys (e.g. tileCost, paintCost, concreteCost, gravelCost)
  const materials = ['tile', 'paint', 'concrete', 'gravel'].filter(mat => costKeys.includes(`${mat}Cost`));

  let duration = '1-2 Days';
  if (totalCost > 500) duration = '3-5 Days';
  if (totalCost > 2000) duration = '1-2 Weeks';

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ display: 'inline-flex', padding: '1rem', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', marginBottom: '1.5rem' }}>
          <CheckCircle2 size={48} />
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t('projects.summary.title', 'Project Complete')}</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)' }}>
          {t('projects.summary.desc', 'Here is the summary and estimated cost for your project:')} <strong>{state.name || t(projectDef.titleKey)}</strong>
        </p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        
        {/* Cost Section */}
        <div className="card" style={{ padding: '2rem', background: 'var(--color-navy)', color: 'white', gridColumn: '1 / -1' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white' }}>
            <CreditCard size={24} color="var(--color-primary-light)" />
            {t('projects.summary.totalCost', 'Total Estimated Cost')}
          </h2>
          {hasMissingCosts ? (
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>
                {t('calc.unavailable', 'Unavailable')}
              </div>
              <p style={{ marginTop: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                {t('projects.summary.missingCosts', 'Some material costs could not be estimated for your region. Please enter manual prices in the previous steps.')}
              </p>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                {currency} {totalCost.toFixed(2)}
              </div>
              <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                {t('projects.summary.costDisclaimer', '* This is an indicative estimated material cost. Actual prices may vary by supplier, location, product quality, taxes, and availability. Labor costs are not included.')}
              </p>
            </div>
          )}
        </div>

        {/* Project Overview */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Clock size={24} color="var(--color-primary)" />
            {t('projects.summary.overview', '1. Project Overview')}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>{t('projects.summary.type', 'Project Type')}</span>
              <span style={{ fontWeight: 600 }}>{t(projectDef.titleKey)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>{t('projects.summary.duration', 'Estimated Duration')}</span>
              <span style={{ fontWeight: 600 }}>{duration}</span>
            </div>
            {state.inputs.length && state.inputs.width && (
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>{t('projects.summary.dimensions', 'Base Dimensions')}</span>
                <span style={{ fontWeight: 600 }}>{state.inputs.length} × {state.inputs.width}</span>
              </div>
            )}
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CreditCard size={24} color="var(--color-primary)" />
            {t('projects.summary.costBreakdown', '2. Cost Breakdown')}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {materials.map(mat => {
              const cost = state.results[`${mat}Cost`];
              const source = state.results[`${mat}PriceSource`]; // 'real', 'demo', 'none'
              const manual = state.manualPrices[`${mat}Price`];
              const displaySource = manual ? 'Manual' : (source === 'demo' ? 'Demo' : (source === 'real' ? 'Real indicative' : 'Unavailable'));
              const color = manual ? 'var(--color-navy)' : (source === 'demo' ? '#f59e0b' : (source === 'real' ? '#10b981' : '#ef4444'));

              return (
                <div key={mat} style={{ display: 'flex', flexDirection: 'column', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)', textTransform: 'capitalize' }}>{t(`materials.${mat}.name`, mat)}</span>
                    <span style={{ fontWeight: 600 }}>{cost !== null && cost !== undefined ? `${currency} ${cost.toFixed(2)}` : t('calc.unavailable', 'Unavailable')}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color, fontWeight: 600, marginTop: '0.25rem' }}>
                    {displaySource}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shopping List */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShoppingCart size={24} color="var(--color-primary)" />
            {t('projects.summary.shoppingList', '3. Shopping List')}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {materials.map(mat => {
              let qty = 0;
              let unit = '';
              let format = state.results[`${mat}PurchaseFormat`];
              if (mat === 'tile') {
                qty = format === 'box' ? state.results.tileBoxes : state.results.tilePurchasedArea;
                unit = format === 'box' ? 'boxes' : (state.results.tilePriceUnit || 'm²');
              } else if (mat === 'paint') {
                qty = format === 'container' ? state.results.paintContainers : state.results.paintPurchasedVolume;
                unit = format === 'container' ? 'containers' : (state.results.paintPriceUnit || 'L');
              } else if (mat === 'concrete') {
                qty = format === 'bag' ? state.results.concreteBagsRequired : state.results.concreteVolumeToPurchase;
                unit = format === 'bag' ? 'bags' : (state.results.concretePriceUnit || 'm³');
              } else if (mat === 'gravel') {
                qty = format === 'bag' ? state.results.gravelBagsRequired : state.results.gravelWeight;
                unit = format === 'bag' ? 'bags' : (state.results.gravelPriceUnit || 'tonnes');
              }

              if (!qty) return null;

              return (
                <li key={mat} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ color: 'var(--color-text-secondary)', textTransform: 'capitalize' }}>{t(`materials.${mat}.name`, mat)}</span>
                  <span style={{ fontWeight: 600 }}>{qty.toFixed(2)} {unit}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Quantities Summary */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <List size={24} color="var(--color-primary)" />
            {t('projects.summary.quantities', '4. Quantities Summary')}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {materials.map(mat => {
              let req = 0, reqUnit = '', pur = 0, purUnit = '', format = state.results[`${mat}PurchaseFormat`];
              if (mat === 'tile') {
                req = state.results.tilesRequired; reqUnit = 'tiles';
                pur = state.results.tilePurchasedArea; purUnit = 'm²';
              } else if (mat === 'paint') {
                req = state.results.paintLiters; reqUnit = 'L (required)';
                pur = state.results.paintPurchasedVolume; purUnit = 'L (purchased)';
              } else if (mat === 'concrete') {
                req = state.results.concreteVolume; reqUnit = 'm³ (required)';
                pur = format === 'bag' ? state.results.concretePurchasedWeight : state.results.concreteVolumeToPurchase; purUnit = format === 'bag' ? 'kg (purchased)' : 'm³ (purchased)';
              } else if (mat === 'gravel') {
                req = state.results.gravelVolume; reqUnit = 'm³ (required)';
                pur = format === 'bag' ? state.results.gravelPurchasedWeight : state.results.gravelWeight; purUnit = format === 'bag' ? 'kg (purchased)' : 'tonnes (purchased)';
              }
              
              if (!req) return null;

              return (
                <div key={mat} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
                  <div style={{ fontWeight: 600, textTransform: 'capitalize', color: 'var(--color-navy)' }}>{t(`materials.${mat}.name`, mat)}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Required:</span>
                    <span>{req.toFixed(2)} {reqUnit}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Purchase Format:</span>
                    <span style={{ textTransform: 'capitalize' }}>{format}</span>
                  </div>
                  {pur ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>Purchased:</span>
                      <span>{pur.toFixed(2)} {purUnit}</span>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
