import Link from "next/link";

// Zentrale Brand-Logo Komponente für einheitliches Branding
// size: "sm" (Footer), "md" (Navbar/Dashboard/Rechtsseiten), "lg" (Login/Set-Password)
export function BrandLogo({ size = "md", href = "/" }) {
  const sizes = {
    sm: { img: "h-20 w-20 -my-5 -ml-5", text: "text-3xl -ml-5 pl-1 pr-1" },
    md: { img: "h-28 w-28 -my-9 -ml-8", text: "text-4xl -ml-7 pl-1 pr-1" },
    lg: { img: "h-72 w-72 mx-auto -mb-18", text: "block -mt-8 text-6xl md:text-7xl pl-2" },
  };

  const s = sizes[size];

  if (size === "lg") {
    return (
      <Link href={href} className="inline-block">
        <img src="/logo.png" alt="Seelensprache Logo" className={s.img} />
        <span
          className={`${s.text} text-gradient-warm`}
          style={{ fontFamily: "var(--font-dancing-script)" }}
        >
          Seelensprache
        </span>
      </Link>
    );
  }

  return (
    <Link href={href} className="flex items-center gap-0">
      <img src="/logo.png" alt="Seelensprache Logo" className={s.img} />
      <span
        className={`${s.text} text-gradient-warm`}
        style={{ fontFamily: "var(--font-dancing-script)" }}
      >
        Seelensprache
      </span>
    </Link>
  );
}
