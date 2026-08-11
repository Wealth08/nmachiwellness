/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Mail } from 'lucide-react';

const BRAND_COLORS = {
  deepGreen: '#1f4d1b',
  midGreen: '#377532',
  brightGreen: '#97BF20',
  paleGreen: '#eef7e8',
  cream: '#f8faf6',
  ink: '#0d1f09',
  muted: '#6b7e65',
};

const LAST_UPDATED = '11 August 2026';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      style={{ marginBottom: 40 }}
    >
      <h2
        style={{
          fontFamily: 'Bricolage Grotesque',
          fontSize: 22,
          fontWeight: 800,
          color: BRAND_COLORS.ink,
          letterSpacing: '-0.02em',
          marginBottom: 12,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontFamily: 'DM Sans',
          fontSize: 15,
          color: BRAND_COLORS.muted,
          lineHeight: 1.8,
          fontWeight: 300,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default function PrivacyPolicy() {
  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "'Bricolage Grotesque', sans-serif", background: BRAND_COLORS.cream, color: BRAND_COLORS.ink }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;1,9..40,300&display=swap"
        rel="stylesheet"
      />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        ::selection { background: rgba(151,191,32,0.28); }
        .glass-card {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(255,255,255,0.9);
          box-shadow: 0 2px 32px rgba(31,77,27,0.05), inset 0 1px 0 rgba(255,255,255,0.9);
        }
        .pp-back-link {
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
          color: ${BRAND_COLORS.midGreen}; text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
          transition: gap 0.2s ease, color 0.2s ease;
        }
        .pp-back-link:hover { gap: 12px; color: ${BRAND_COLORS.deepGreen}; }
        .pp-link {
          color: ${BRAND_COLORS.midGreen}; text-decoration: underline; font-weight: 400;
        }
        a.pp-link:hover { color: ${BRAND_COLORS.deepGreen}; }
      `}</style>

      {/* ══════ NAV ══════ */}
      <nav
        style={{
          padding: '0 44px',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(55,117,50,0.1)',
          background: 'rgba(248,250,246,0.9)',
          backdropFilter: 'blur(24px) saturate(160%)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <img src="/logo.png" alt="NmaChi" style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
        <a href="#/" className="pp-back-link">
          <ArrowLeft size={16} /> Back to home
        </a>
      </nav>

      {/* ══════ HERO ══════ */}
      <section style={{ padding: '72px 6% 40px', textAlign: 'center' }}>
        <span
          className="pill"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            background: BRAND_COLORS.paleGreen,
            color: BRAND_COLORS.midGreen,
            fontFamily: 'DM Sans',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.11em',
            textTransform: 'uppercase',
            padding: '7px 16px',
            borderRadius: 999,
            border: '1px solid rgba(55,117,50,0.18)',
          }}
        >
          Legal
        </span>
        <h1
          style={{
            fontFamily: 'Bricolage Grotesque',
            fontSize: 'clamp(34px,5vw,56px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: BRAND_COLORS.ink,
            marginTop: 20,
            marginBottom: 12,
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ fontFamily: 'DM Sans', fontSize: 14, color: BRAND_COLORS.muted, fontWeight: 300 }}>
          Last updated: {LAST_UPDATED}
        </p>
      </section>

      {/* ══════ CONTENT ══════ */}
      <section style={{ padding: '0 6% 100px' }}>
        <div
          className="glass-card"
          style={{ maxWidth: 760, margin: '0 auto', borderRadius: 28, padding: '48px 44px 8px' }}
        >
          <p
            style={{
              fontFamily: 'DM Sans',
              fontSize: 15,
              color: BRAND_COLORS.muted,
              lineHeight: 1.8,
              fontWeight: 300,
              marginBottom: 40,
            }}
          >
            NmaChi Wellness Ltd ("NmaChi", "we", "us", "our") is committed to protecting your privacy.
            This policy explains what personal data we collect when you use this website or join our
            waitlist, why we collect it, and the choices and rights you have. This policy is written to
            reflect UK GDPR and the Data Protection Act 2018.
          </p>

          <Section title="1. Who we are">
            <p>
              NmaChi Wellness Ltd is a company registered in the United Kingdom. For any privacy-related
              questions, you can reach us at{' '}
              <a href="mailto:hello@nmachiwellness.com" className="pp-link">
                hello@nmachiwellness.com
              </a>
              .
            </p>
          </Section>

          <Section title="2. Information we collect">
            <p style={{ marginBottom: 12 }}>When you join our waitlist, we collect:</p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>Your full name</li>
              <li>Your email address</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              We do not knowingly collect any special category data (such as health information) through
              this form.
            </p>
          </Section>

          <Section title="3. How we use your information">
            <p style={{ marginBottom: 12 }}>We use the information you provide to:</p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>Notify you when NmaChi Wellness Tea becomes available</li>
              <li>Send you occasional product updates, if you've opted in</li>
              <li>Respond to enquiries you send us directly</li>
            </ul>
          </Section>

          <Section title="4. Legal basis for processing">
            <p>
              We process your name and email address on the basis of your consent, given when you
              submit the waitlist form. You may withdraw this consent at any time (see "Your rights"
              below).
            </p>
          </Section>

          <Section title="5. Sharing your information">
            <p>
              We use a third-party form processor, Web3Forms, to handle waitlist submissions and deliver
              them to us securely. We do not sell, rent, or trade your personal data to third parties for
              marketing purposes.
            </p>
          </Section>

          <Section title="6. Data retention">
            <p>
              We keep your waitlist information for as long as needed to contact you about product
              availability, or until you ask us to delete it, whichever comes first.
            </p>
          </Section>

          <Section title="7. Your rights">
            <p style={{ marginBottom: 12 }}>Under UK data protection law, you have the right to:</p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>Access the personal data we hold about you</li>
              <li>Ask us to correct inaccurate data</li>
              <li>Ask us to delete your data</li>
              <li>Withdraw consent and opt out of communications at any time</li>
              <li>Complain to the UK Information Commissioner's Office (ICO) if you have concerns</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              To exercise any of these rights, email us at{' '}
              <a href="mailto:hello@nmachiwellness.com" className="pp-link">
                hello@nmachiwellness.com
              </a>
              .
            </p>
          </Section>

          <Section title="8. Cookies">
            <p>
              This site does not currently use tracking or advertising cookies. If that changes, we will
              update this policy and, where required, ask for your consent.
            </p>
          </Section>

          <Section title="9. Changes to this policy">
            <p>
              We may update this policy from time to time. Any changes will be posted on this page with
              an updated "last updated" date.
            </p>
          </Section>

          <Section title="10. Contact us">
            <p>
              If you have any questions about this policy or how we handle your data, please contact us
              at{' '}
              <a href="mailto:hello@nmachiwellness.com" className="pp-link">
                hello@nmachiwellness.com
              </a>
              .
            </p>
          </Section>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer style={{ background: BRAND_COLORS.ink, padding: '40px 6%' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <p style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'rgba(255,255,255,0.2)', fontWeight: 300 }}>
            © 2026 NmaChi Wellness Ltd. All rights reserved.
          </p>
          <a
            href="mailto:hello@nmachiwellness.com"
            style={{
              fontFamily: 'DM Sans',
              fontSize: 13,
              color: BRAND_COLORS.brightGreen,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Mail size={14} /> hello@nmachiwellness.com
          </a>
        </div>
      </footer>
    </div>
  );
}
