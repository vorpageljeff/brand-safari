import { useState } from "react";

export default function BrandSafariLogo({ className = "" }) {
  const [logoSrc, setLogoSrc] = useState("/brand-safari-logo.png");

  return (
    <div className={`brand-logo ${className}`.trim()} aria-label="Brand Safari">
      <img
        src={logoSrc}
        alt="Brand Safari"
        onError={() => setLogoSrc("/brand-safari-logo.svg")}
      />
    </div>
  );
}
