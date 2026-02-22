import Link from "next/link";

// Zentrale Brand-Logo Komponente für einheitliches Branding
// size: "sm" (Footer), "md" (Navbar/Dashboard/Rechtsseiten), "lg" (Login/Set-Password)
export function BrandLogo({ size = "md", href = "/" }) {
  const sizes = {
    sm: { img: "h-16 w-16 -my-4 -ml-4 sm:h-20 sm:w-20 sm:-my-5 sm:-ml-5", text: "text-2xl sm:text-3xl -ml-3 sm:-ml-5 pl-1 pr-1" },
    md: { img: "h-20 w-20 -my-6 -ml-5 sm:h-24 sm:w-24 sm:-my-7 sm:-ml-7 md:h-28 md:w-28 md:-my-9 md:-ml-8", text: "text-3xl sm:text-3xl md:text-4xl -ml-4 sm:-ml-6 md:-ml-7 pl-1 pr-1" },
    lg: { img: "h-48 w-48 sm:h-60 sm:w-60 md:h-72 md:w-72 mx-auto mt-4 -mb-12 sm:-mb-16 md:-mb-18", text: "block -mt-4 sm:-mt-6 md:-mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl pl-2" },
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
