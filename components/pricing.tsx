"use client"

import { Card, CardBody, CardHeader, Button, Chip } from "@heroui/react"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Básico",
    price: "Gratis",
    period: "",
    description: "Perfecto para comenzar tu viaje de nutrición",
    features: ["Plan básico de alimentación", "Seguimiento de calorías", "100 recetas", "Soporte por email"],
    cta: "Empezar Gratis",
    popular: false,
  },
  {
    name: "Pro",
    price: "€9.99",
    period: "/mes",
    description: "Para quienes buscan resultados serios",
    features: [
      "Planes personalizados con IA",
      "Seguimiento completo de macros",
      "Recetas ilimitadas",
      "Lista de compras automática",
      "Soporte prioritario",
      "Sin anuncios",
    ],
    cta: "Comenzar Prueba",
    popular: true,
  },
  {
    name: "Familiar",
    price: "€19.99",
    period: "/mes",
    description: "Ideal para toda la familia",
    features: [
      "Todo lo del plan Pro",
      "Hasta 5 perfiles",
      "Planificación familiar",
      "Recetas para niños",
      "Consultas con nutricionista",
      "API access",
    ],
    cta: "Comenzar Prueba",
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Planes para cada objetivo
          </h2>
          <p className="text-lg text-muted-foreground">
            Elige el plan que mejor se adapte a tus necesidades. Cancela cuando quieras.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`border-border ${
                plan.popular ? "bg-primary text-primary-foreground border-primary" : "bg-card"
              }`}
              shadow={plan.popular ? "lg" : "sm"}
            >
              <CardHeader className="flex flex-col items-start gap-2 pb-0 pt-6 px-6">
                {plan.popular && (
                  <Chip size="sm" className="bg-accent text-accent-foreground">
                    Más Popular
                  </Chip>
                )}
                <h3
                  className={`text-xl font-semibold ${
                    plan.popular ? "text-primary-foreground" : "text-card-foreground"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-bold ${
                      plan.popular ? "text-primary-foreground" : "text-card-foreground"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span className={plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-sm ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
              </CardHeader>
              <CardBody className="px-6 pt-6 pb-6 space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check
                        className={`w-5 h-5 flex-shrink-0 ${plan.popular ? "text-primary-foreground" : "text-primary"}`}
                      />
                      <span
                        className={`text-sm ${plan.popular ? "text-primary-foreground/90" : "text-muted-foreground"}`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  fullWidth
                  className={
                    plan.popular
                      ? "bg-card text-card-foreground font-semibold"
                      : "bg-primary text-primary-foreground font-semibold"
                  }
                  radius="full"
                >
                  {plan.cta}
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
