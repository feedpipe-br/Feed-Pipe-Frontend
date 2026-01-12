"use client"

import { Card, CardBody, Avatar } from "@heroui/react"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "María García",
    role: "Perdió 15kg en 4 meses",
    avatar: "/professional-woman-smiling-headshot.png",
    content:
      "NutriFit cambió mi relación con la comida. Los planes son deliciosos y nunca me siento restringida. ¡Lo recomiendo totalmente!",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    role: "Atleta amateur",
    avatar: "/athletic-man-smiling-headshot.jpg",
    content:
      "Como deportista, necesitaba un plan que se adaptara a mis entrenamientos. NutriFit lo hace perfectamente y ha mejorado mi rendimiento.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    role: "Madre de familia",
    avatar: "/friendly-woman-smiling-headshot.jpg",
    content:
      "Las recetas son fáciles de preparar y a toda mi familia les encantan. La lista de compras automática me ahorra mucho tiempo.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-lg text-muted-foreground">
            Miles de personas ya han transformado su alimentación con NutriFit.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-card border-border" shadow="sm">
              <CardBody className="p-6 space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-card-foreground leading-relaxed">{`"${testimonial.content}"`}</p>
                <div className="flex items-center gap-3 pt-2">
                  <Avatar src={testimonial.avatar} alt={testimonial.name} size="md" className="ring-2 ring-border" />
                  <div>
                    <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
