import React from 'react';

// Common icon wrapper with consistent styling
const SvgWrap = ({ children }: { children: React.ReactNode }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

export const IconConcrete = () => (
  <SvgWrap>
    <rect x="8" y="14" width="24" height="12" rx="2" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="2" />
    <path d="M12 20 L28 20 M16 14 L16 26 M24 14 L24 26" stroke="var(--color-navy)" strokeWidth="1" strokeDasharray="2 2" />
  </SvgWrap>
);

export const IconPaint = () => (
  <SvgWrap>
    <path d="M14 16 L26 16 L26 30 L14 30 Z" fill="var(--color-primary-light)" stroke="var(--color-navy)" strokeWidth="2" />
    <path d="M10 16 L30 16" stroke="var(--color-navy)" strokeWidth="2" />
    <path d="M16 10 C16 10 20 8 24 10 L24 16 L16 16 Z" stroke="var(--color-navy)" strokeWidth="2" fill="white" />
    <circle cx="20" cy="24" r="2" fill="var(--color-primary)" />
  </SvgWrap>
);

export const IconTile = () => (
  <SvgWrap>
    <rect x="8" y="8" width="10" height="10" fill="white" stroke="var(--color-navy)" strokeWidth="2" />
    <rect x="22" y="8" width="10" height="10" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="2" />
    <rect x="8" y="22" width="10" height="10" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="2" />
    <rect x="22" y="22" width="10" height="10" fill="var(--color-primary-light)" stroke="var(--color-primary)" strokeWidth="2" />
  </SvgWrap>
);

export const IconGravel = () => (
  <SvgWrap>
    <circle cx="12" cy="24" r="4" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="1.5" />
    <circle cx="20" cy="26" r="6" fill="var(--color-primary-light)" stroke="var(--color-navy)" strokeWidth="1.5" />
    <circle cx="28" cy="22" r="5" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="1.5" />
    <circle cx="16" cy="18" r="3" fill="white" stroke="var(--color-navy)" strokeWidth="1.5" />
    <circle cx="24" cy="16" r="4" fill="white" stroke="var(--color-navy)" strokeWidth="1.5" />
  </SvgWrap>
);

export const IconFlooring = () => (
  <SvgWrap>
    <rect x="6" y="8" width="28" height="24" rx="2" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="2" />
    <path d="M6 14 L34 14 M6 20 L34 20 M6 26 L34 26" stroke="var(--color-navy)" strokeWidth="1.5" />
    <path d="M16 8 L16 14 M26 14 L26 20 M12 20 L12 26 M22 26 L22 32" stroke="var(--color-navy)" strokeWidth="1.5" />
  </SvgWrap>
);

export const IconSoil = () => (
  <SvgWrap>
    <path d="M6 24 C 12 24 16 20 20 24 C 24 28 28 24 34 24" stroke="var(--color-primary)" strokeWidth="2" fill="none" />
    <path d="M6 28 L34 28 M8 32 L32 32" stroke="var(--color-navy)" strokeWidth="2" strokeDasharray="4 2" />
    <path d="M20 24 L20 12 M20 12 C 16 12 16 16 16 16 M20 12 C 24 12 24 8 24 8" stroke="var(--color-navy)" strokeWidth="2" fill="none" />
  </SvgWrap>
);

export const IconMulch = () => (
  <SvgWrap>
    <path d="M8 26 C 14 26 14 22 20 24 C 26 26 26 22 32 24" stroke="var(--color-navy)" strokeWidth="2" fill="none" />
    <path d="M10 30 C 16 30 16 26 22 28 C 28 30 28 26 30 28" stroke="var(--color-primary)" strokeWidth="2" fill="none" />
    <circle cx="20" cy="14" r="2" fill="var(--color-primary)" />
    <circle cx="26" cy="18" r="1.5" fill="var(--color-navy)" />
    <circle cx="12" cy="16" r="1.5" fill="var(--color-navy)" />
  </SvgWrap>
);

export const IconPavers = () => (
  <SvgWrap>
    <path d="M6 20 L20 12 L34 20 L20 28 Z" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="2" strokeLinejoin="round" />
    <path d="M6 20 L6 24 L20 32 L34 24 L34 20" stroke="var(--color-navy)" strokeWidth="2" strokeLinejoin="round" fill="none" />
    <path d="M20 28 L20 32" stroke="var(--color-navy)" strokeWidth="2" />
  </SvgWrap>
);

export const IconDrywall = () => (
  <SvgWrap>
    <rect x="8" y="6" width="24" height="28" fill="white" stroke="var(--color-navy)" strokeWidth="2" />
    <circle cx="12" cy="10" r="1" fill="var(--color-navy)" />
    <circle cx="12" cy="20" r="1" fill="var(--color-navy)" />
    <circle cx="12" cy="30" r="1" fill="var(--color-navy)" />
    <circle cx="28" cy="10" r="1" fill="var(--color-navy)" />
    <circle cx="28" cy="20" r="1" fill="var(--color-navy)" />
    <circle cx="28" cy="30" r="1" fill="var(--color-navy)" />
  </SvgWrap>
);

export const IconRoofing = () => (
  <SvgWrap>
    <path d="M4 24 L20 10 L36 24" stroke="var(--color-navy)" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M8 24 L20 14 L32 24" stroke="var(--color-primary)" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M12 24 L20 18 L28 24" stroke="var(--color-navy)" strokeWidth="2" fill="none" strokeLinejoin="round" />
  </SvgWrap>
);

export const IconBrick = () => (
  <SvgWrap>
    <rect x="6" y="10" width="28" height="20" fill="white" stroke="var(--color-navy)" strokeWidth="2" />
    <path d="M6 16 L34 16 M6 24 L34 24" stroke="var(--color-navy)" strokeWidth="1.5" />
    <path d="M14 10 L14 16 M26 10 L26 16 M20 16 L20 24 M10 24 L10 30 M28 24 L28 30" stroke="var(--color-navy)" strokeWidth="1.5" />
  </SvgWrap>
);

export const IconWood = () => (
  <SvgWrap>
    <rect x="10" y="6" width="20" height="28" rx="2" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="2" />
    <path d="M16 6 C 14 12 18 20 14 34 M24 6 C 26 12 22 20 26 34" stroke="var(--color-navy)" strokeWidth="1" opacity="0.5" />
    <circle cx="20" cy="14" r="1.5" fill="var(--color-navy)" />
  </SvgWrap>
);
