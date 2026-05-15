/* OnboardingPhone — dark iMpatient-branded phone bezel.
   Reuses IOSStatusBar (dark mode) for the system row at the top.
   Custom because the iMpatient brand is navy-first; we don't want the
   light bezel feel of the default IOSDevice. The bezel is a thin dark
   frame around our content; status bar & home indicator sit on top.
*/

function OnboardingPhone({ children, width = 380, height = 820, label }) {
  return (
    <div style={{
      width, height, position: 'relative',
      borderRadius: 48,
      background: '#000',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.55), 0 0 0 2px rgba(122, 184, 255, 0.08), inset 0 0 0 8px #000',
      overflow: 'hidden',
      fontFamily: '-apple-system, system-ui, sans-serif',
    }}>
      {/* dynamic island */}
      <div style={{
        position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
        width: 120, height: 35, borderRadius: 22, background: '#000', zIndex: 50,
      }} />
      {/* status bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <IOSStatusBar dark={true} />
      </div>
      {/* content */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: 42,
        overflow: 'hidden',
      }}>
        {children}
      </div>
      {/* home indicator */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 60,
        height: 28, display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
        paddingBottom: 8, pointerEvents: 'none',
      }}>
        <div style={{
          width: 134, height: 5, borderRadius: 100,
          background: 'rgba(255, 255, 255, 0.7)',
        }} />
      </div>
    </div>
  );
}

/* OnboardingDesktop — split-screen brand-forward layout for desktop.
   Used to show how key onboarding moments adapt to a wider canvas. */
function OnboardingDesktop({ children, width = 1360, height = 800 }) {
  return (
    <div style={{
      width, height,
      borderRadius: 12,
      background: '#060920',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(122, 184, 255, 0.08)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* fake desktop chrome — minimal */}
      <div style={{
        height: 36,
        background: 'rgba(10, 18, 48, 0.6)',
        borderBottom: '1px solid rgba(122, 184, 255, 0.1)',
        display: 'flex', alignItems: 'center',
        padding: '0 16px',
        gap: 6,
        position: 'relative', zIndex: 5,
      }}>
        <div style={{ width: 11, height: 11, borderRadius: 50, background: '#ff5f57' }} />
        <div style={{ width: 11, height: 11, borderRadius: 50, background: '#febc2e' }} />
        <div style={{ width: 11, height: 11, borderRadius: 50, background: '#28c840' }} />
        <div style={{
          margin: '0 auto',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.05em',
          color: 'rgba(168, 212, 255, 0.5)',
        }}>
          impatient.app
        </div>
      </div>
      <div style={{ height: 'calc(100% - 36px)' }}>
        {children}
      </div>
    </div>
  );
}

Object.assign(window, { OnboardingPhone, OnboardingDesktop });
