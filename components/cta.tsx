"use client"

import { Button } from "@heroui/react"
import { ArrowRight } from "lucide-react"
import {AuthTabs} from "@/types/auth";

interface CtaProps {
  onOpenAuth: (tab: AuthTabs) => void
}

export function Cta({ onOpenAuth }: CtaProps) {
  return (
    <section className="py-20 lg:py-32 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground text-balance">
            Comienza tu transformación hoy
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto">
            Únete a más de 50,000 personas que ya están comiendo mejor con NutriFit. Tu primer plan es completamente
            gratis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto justify-center">
            <Button
              className="bg-card text-card-foreground font-semibold whitespace-nowrap"
              radius="full"
              size="lg"
              endContent={<ArrowRight className="w-5 h-5" />}
              onPress={() => onOpenAuth("register")}
            >
              Empezar Gratis Ahora
            </Button>
          </div>

          <p className="text-sm text-primary-foreground/60">
            Sin tarjeta de crédito requerida. Cancela cuando quieras.
          </p>
        </div>
      </div>
    </section>
  )
}
