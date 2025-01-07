'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/cards/card"
import { Button } from "@/components/ui/button"

export default function PricingSection() {
  const plans = [
    {
      name: "Monthly",
      price: "9.99",
      features: ["All Lure Originals", "Watch on Lure app", "Share with family"],
    },
    {
      name: "Annual",
      price: "19.99",
      features: ["All Lure Originals", "Watch on Lure app", "Share with family", "Save with yearly plan"],
    },
    {
      name: "Premium",
      price: "29.99",
      features: ["All Lure Originals", "Watch on Lure  app", "Share with family", "4K HDR", "Offline downloads"],
    }
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-4xl font-bold md:text-5xl"
        >
          Choose Your Plan
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="relative overflow-hidden border-gray-800 bg-gray-900/50 backdrop-blur-xl">
                <CardHeader className="space-y-4 text-center">
                  <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                  <p className="text-3xl font-bold text-white">${plan.price}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="text-center text-gray-300">
                      {feature}
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-white text-black hover:bg-gray-100">
                    Try It Free
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

