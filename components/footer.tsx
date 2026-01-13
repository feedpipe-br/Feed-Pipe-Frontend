"use client"

import { Link, Divider } from "@heroui/react"
import { Leaf } from "lucide-react"
import settings from "@/settings";

const footerLinks = {
  producto: [
    { label: "Características", href: "#features" },
    { label: "FAQ", href: "#" },
  ],
  empresa: [
    { label: "Sobre Nosotros", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Carreras", href: "#" },
    { label: "Contacto", href: "#" },
  ],
  legal: [
    { label: "Privacidad", href: "#" },
    { label: "Términos", href: "#" },
    { label: "Cookies", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-primary" />
              <span className="font-bold text-xl text-card-foreground">{settings.projectName}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tu compañero inteligente para una alimentación saludable y sostenible.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Producto</h4>
            <ul className="space-y-2">
              {footerLinks.producto.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Divider className="bg-border" />

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2026 {settings.projectName}. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Twitter
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Instagram
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
