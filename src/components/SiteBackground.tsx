import React from 'react';
import HexField from '../effects/okazz/HexField';

// Site-wide background: the hex field on a fixed full-viewport layer behind the
// page content (z-10). Pointer tracking is on the window inside HexField, so
// the content sitting on top does not need to forward anything.
export default function SiteBackground() {
  return (
    <div className="site-bg" aria-hidden="true">
      <HexField className="site-bg__canvas" />
    </div>
  );
}
