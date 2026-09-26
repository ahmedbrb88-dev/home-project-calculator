import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useSettings } from '../contexts/SettingsContext';

const PageWrap = ({ title, children }: any) => (
  <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px', margin: '0 auto', minHeight: '70vh' }}>
    <Breadcrumbs items={[{ label: title }]} />
    <h1 style={{ marginBottom: '2.5rem', fontSize: '2.5rem' }}>{title}</h1>
    <div style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-navy)' }}>
      {children}
    </div>
  </div>
);

export const About = () => {
  const { t } = useSettings();
  return (
    <PageWrap title={t('static.about.title')}>
      <p style={{ marginBottom: '1.5rem' }}>{t('static.about.p1')}</p>
      <p style={{ marginBottom: '1.5rem' }}>{t('static.about.p2')}</p>
      
      <h3 style={{ marginTop: '3rem', marginBottom: '1rem', fontSize: '1.5rem' }}>{t('static.about.features')}</h3>
      <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
        <li>{t('static.about.f1')}</li>
        <li>{t('static.about.f2')}</li>
        <li>{t('static.about.f3')}</li>
        <li>{t('static.about.f4')}</li>
        <li>{t('static.about.f5')}</li>
      </ul>
      
      <p>{t('static.about.disclaimer')}</p>
    </PageWrap>
  );
};

export const Privacy = () => {
  const { t } = useSettings();
  return (
    <PageWrap title={t('static.privacy.title')}>
      <p style={{ marginBottom: '1.5rem' }}>{t('static.privacy.updated')}</p>
      <p style={{ marginBottom: '1.5rem' }}>{t('static.privacy.p1')}</p>
      
      <h3 style={{ marginTop: '3rem', marginBottom: '1rem', fontSize: '1.25rem' }}>{t('static.privacy.dataTitle')}</h3>
      <p style={{ marginBottom: '1.5rem' }}>{t('static.privacy.dataDesc')}</p>
      
      <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.25rem' }}>{t('static.privacy.localTitle')}</h3>
      <p style={{ marginBottom: '1.5rem' }}>{t('static.privacy.localDesc')}</p>
      
      <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.25rem' }}>{t('static.privacy.analyticsTitle')}</h3>
      <p style={{ marginBottom: '1.5rem' }}>{t('static.privacy.analyticsDesc')}</p>
    </PageWrap>
  );
};

export const Terms = () => {
  const { t } = useSettings();
  return (
    <PageWrap title={t('static.terms.title')}>
      <p style={{ marginBottom: '1.5rem' }}>{t('static.terms.p1')}</p>
      
      <h3 style={{ marginTop: '3rem', marginBottom: '1rem', fontSize: '1.25rem' }}>{t('static.terms.useTitle')}</h3>
      <p style={{ marginBottom: '1.5rem' }}>{t('static.terms.useDesc')}</p>
      
      <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.25rem' }}>{t('static.terms.accTitle')}</h3>
      <p style={{ marginBottom: '1.5rem' }}>{t('static.terms.accDesc')}</p>
      
      <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.25rem' }}>{t('static.terms.userTitle')}</h3>
      <p style={{ marginBottom: '1.5rem' }}>{t('static.terms.userDesc')}</p>
    </PageWrap>
  );
};

export const Disclaimer = () => {
  const { t } = useSettings();
  return (
    <PageWrap title={t('static.disclaimer.title')}>
      <p style={{ marginBottom: '1.5rem', fontWeight: 600 }}>{t('static.disclaimer.p1')}</p>
      
      <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
        <li style={{ marginBottom: '0.5rem' }}><strong>{t('static.disclaimer.li1s')}</strong> {t('static.disclaimer.li1')}</li>
        <li style={{ marginBottom: '0.5rem' }}><strong>{t('static.disclaimer.li2s')}</strong> {t('static.disclaimer.li2')}</li>
        <li style={{ marginBottom: '0.5rem' }}><strong>{t('static.disclaimer.li3s')}</strong> {t('static.disclaimer.li3')}</li>
        <li style={{ marginBottom: '0.5rem' }}><strong>{t('static.disclaimer.li4s')}</strong> {t('static.disclaimer.li4')}</li>
      </ul>
    </PageWrap>
  );
};

export const Contact = () => {
  const { t } = useSettings();
  return (
    <PageWrap title={t('static.contact.title')}>
      <p style={{ marginBottom: '1.5rem' }}>{t('static.contact.p1')}</p>
      <div style={{ background: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', textAlign: 'center', margin: '3rem 0' }}>
        <p style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>{t('static.contact.reachUs')}</p>
        <a href="mailto:hello@homeprojectcalculator.com" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>hello@homeprojectcalculator.com</a>
      </div>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{t('static.contact.note')}</p>
    </PageWrap>
  );
};

export const HowItWorks = () => {
  const { t } = useSettings();
  return (
    <PageWrap title={t('static.hiw.title')}>
      <p style={{ marginBottom: '3rem', fontSize: '1.25rem' }}>{t('static.hiw.p1')}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {[1, 2, 3, 4].map((step) => (
          <div key={step}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ background: 'var(--color-primary)', color: 'white', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.875rem' }}>{step}</span>
              {t(`static.hiw.steps.${step}.t`).replace(/^\d+\.\s*/, '')}
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', paddingLeft: '2.5rem' }}>
              {t(`static.hiw.steps.${step}.d`)}
            </p>
          </div>
        ))}
      </div>
    </PageWrap>
  );
};
