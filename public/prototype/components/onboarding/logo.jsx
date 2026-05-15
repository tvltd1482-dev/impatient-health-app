/* Logo component — renders the approved iMpatient logo.
   The SVGs live in assets/ and are loaded as <img>; each instance gets
   its own document so linearGradient ids don't collide.

   Variants:
     - mark       · the heart-stethoscope glyph alone (square-ish)
     - lockup     · mark + wordmark (wide)
     - wordmark   · the "iMpatient™" wordmark alone (wide)
     - mark-white · the mark recolored white for use on dark surfaces
                    where the navy mark would disappear (overlays the
                    real mark with a CSS filter to invert + brighten)
*/

function Logo({ variant = 'mark', height, width, style, className = '', alt = 'iMpatient' }) {
  const src = {
    mark:        'assets/logo-mark.svg',
    lockup:      'assets/logo-lockup.svg',
    wordmark:    'assets/logo-wordmark.svg',
    'mark-white':'assets/logo-mark.svg',
    'lockup-white': 'assets/logo-lockup.svg',
  }[variant] || 'assets/logo-mark.svg';

  const isWhite = variant.endsWith('-white');
  // CSS filter to turn the navy/blue brandmark into a luminous white-ish
  // mark for use on dark surfaces. Tuned to keep slight cool blue cast.
  const whiteFilter = isWhite
    ? { filter: 'brightness(0) invert(1) drop-shadow(0 0 12px rgba(168, 212, 255, 0.5))' }
    : null;

  return (
    <img
      src={src}
      alt={alt}
      height={height}
      width={width}
      draggable={false}
      style={{
        height: height ?? 'auto',
        width: width ?? 'auto',
        display: 'inline-block',
        ...whiteFilter,
        ...style,
      }}
      className={className}
    />
  );
}

Object.assign(window, { Logo });
