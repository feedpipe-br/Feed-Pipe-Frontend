"use client"

import { Card, CardBody } from "@heroui/react"
import { Target, Utensils, LineChart, Apple, Clock, Users } from "lucide-react"

const features = [
  {
    icon: Target,
    title: "Planes Personalizados",
    description:
      "Algoritmos de IA que crean dietas adaptadas a tus objetivos, preferencias y restricciones alimentarias.",
  },
  {
    icon: Utensils,
    title: "Recetas Deliciosas",
    description: "Miles de recetas saludables con instrucciones paso a paso y valores nutricionales detallados.",
  },
  {
    icon: LineChart,
    title: "Seguimiento Inteligente",
    description: "Monitorea tu progreso con gráficos detallados de calorías, macros y micronutrientes.",
  },
  {
    icon: Apple,
    title: "Base de Datos Completa",
    description: "Más de 1 millón de alimentos con información nutricional actualizada y verificada.",
  },
  {
    icon: Clock,
    title: "Planificación Semanal",
    description: "Organiza tus comidas de la semana con listas de compras automáticas.",
  },
  {
    icon: Users,
    title: "Comunidad Activa",
    description: "Conecta con otros usuarios, comparte recetas y obtén motivación diaria.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Todo lo que necesitas para una alimentación saludable
          </h2>
          <p className="text-lg text-muted-foreground">
            Herramientas poderosas diseñadas para hacer que comer bien sea fácil y sostenible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card border-border hover:shadow-lg transition-shadow" shadow="sm">
              <CardBody className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
