'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { CreditCard, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { processPayment } from '../lib/processPayment'

export default function PaymentSection() {
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true })

  async function handleSubmit(formData: FormData) {
    setIsProcessing(true)
    const result = await processPayment(formData)
    setIsProcessing(false)
    if (result.success) {
      router.push('/success')
    } else {
      // Manejar el error
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-400 to-gray-100 dark:from-gray-800 dark:to-gray-950 text-gray-900 dark:text-white px-4 py-24">
      <div ref={ref} className="mx-auto max-w-2xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">Pago seguro</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 md:text-xl">
            Introduce los datos de tu tarjeta para completar la compra.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 bg-white dark:bg-gray-950 p-8 rounded-md"
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget as HTMLFormElement)
            handleSubmit(formData)
          }}
        >
          <div>
            <Label htmlFor="card-number" className="block text-sm font-medium text-gray-900 dark:text-gray-400">
              Número de tarjeta
            </Label>
            <div className="mt-1 relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CreditCard className="h-5 w-5 text-gray-700 dark:text-gray-400" />
              </div>
              <Input
                type="text"
                name="card-number"
                id="card-number"
                className="pl-10 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry" className="block text-sm font-medium text-gray-900 dark:text-gray-400">
                Fecha de expiración
              </Label>
              <Input
                type="text"
                name="expiry"
                id="expiry"
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="MM / AA"
                required
              />
            </div>
            <div>
              <Label htmlFor="cvc" className="block text-sm font-medium text-gray-900 dark:text-gray-400">
                CVC
              </Label>
              <Input
                type="text"
                name="cvc"
                id="cvc"
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="123"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-gray-400">
              Nombre en la tarjeta
            </Label>
            <Input
              type="text"
              name="name"
              id="name"
              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Procesando...
                </span>
              ) : (
                <span className="flex items-center">
                  <Lock className="mr-2 h-4 w-4" /> Pagar ahora
                </span>
              )}
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  )
}
