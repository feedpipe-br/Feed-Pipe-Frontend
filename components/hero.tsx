"use client"

import { Button } from "@heroui/button"
import {Image} from "@heroui/image";
import { ArrowRight, Sparkles } from "lucide-react"

interface HeroProps {
  onOpenAuth: (tab: "login" | "register") => void
}

export function Hero({ onOpenAuth }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary via-background to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Planes personalizados con IA</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Transforma tu alimentación, <span className="text-primary">transforma tu vida</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Descubre el plan de dieta perfecto para ti. Seguimiento inteligente, recetas deliciosas y el apoyo que
              necesitas para alcanzar tus objetivos de salud.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground font-semibold"
                radius="full"
                endContent={<ArrowRight className="w-5 h-5" />}
                onPress={() => onOpenAuth("register")}
              >
                Comenzar Ahora
              </Button>
              <Button
                size="lg"
                variant="bordered"
                className="border-border text-foreground font-semibold"
                radius="full"
              >
                Ver Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-foreground">50K+</p>
                <p className="text-sm text-muted-foreground">Usuarios activos</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground">4.9</p>
                <p className="text-sm text-muted-foreground">Calificación</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground">1M+</p>
                <p className="text-sm text-muted-foreground">Recetas</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/healthy-protein-foods-with-grilled-salmon-fish--ch.jpg"
                alt="Alimentos proteicos saludables: pescado, carne, huevos"
                className="w-full h-auto object-cover"
                loading={"lazy"}
              />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-lg border border-border z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🥩</span>
                </div>
                <div>
                  <p className="font-semibold text-card-foreground">Plan Proteico Listo</p>
                  <p className="text-sm text-muted-foreground">28 comidas personalizadas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
