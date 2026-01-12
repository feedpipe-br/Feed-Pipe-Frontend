"use client"

import { Card, CardBody, Image } from "@heroui/react"

const steps = [
  {
    number: "1",
    title: "Cuéntanos sobre ti",
    description: "Completa un breve cuestionario sobre tus objetivos, preferencias alimentarias y estilo de vida.",
    image: "/person-filling-health-questionnaire-on-mobile-app.jpg",
  },
  {
    number: "2",
    title: "Recibe tu plan",
    description: "Nuestra IA crea un plan de dieta personalizado con menús semanales y recetas adaptadas a ti.",
    image: "/personalized-meal-plan-calendar-on-tablet-screen.jpg",
  },
  {
    number: "3",
    title: "Sigue y mejora",
    description: "Registra tus comidas, monitorea tu progreso y ajusta tu plan según tus resultados.",
    image: "/fitness-progress-tracking-dashboard-with-charts.jpg",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Cómo funciona</h2>
          <p className="text-lg text-muted-foreground">
            Tres simples pasos para comenzar tu transformación nutricional.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 left-full w-full h-0.5 bg-border -translate-x-1/2 z-0" />
              )}

              <Card className="bg-card border-border relative z-10" shadow="sm">
                <CardBody className="p-0">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <Image
                      src={step.image || "/placeholder.svg"}
                      alt={step.title}
                      className="w-full h-48 object-cover"
                      width={400}
                      height={300}
                    />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center">
                      {step.number}
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-xl font-semibold text-card-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
