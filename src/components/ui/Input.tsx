import React from 'react';

export const Input = ({ label, unit, value, onChange, type = "number" }: any) => (
  <div className="input-group">
    <label className="input-label">{label}</label>
    <div className="input-wrapper">
      <input 
        type={type} 
        value={value} 
        onChange={e => onChange(Number(e.target.value))} 
        className="input-field" 
        style={{ paddingRight: unit ? '3rem' : '1rem' }}
      />
      {unit && <span className="input-suffix">{unit}</span>}
    </div>
  </div>
);
