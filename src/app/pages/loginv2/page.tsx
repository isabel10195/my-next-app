'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Facebook, Twitter } from 'lucide-react'

export default function AuthCard() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="relative">
          {/* Background Image Section */}
          <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Hello World
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/80 text-sm mb-6"
            >
              Lorem ipsum dolor sit amet consectetur adipiscing elit.
              Sed et consectetur magna sit amet sodales massa.
            </motion.p>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm transition-colors"
              >
                <Facebook size={16} />
                Facebook
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm transition-colors"
              >
                <Twitter size={16} />
                Twitter
              </motion.button>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {!isFlipped ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900">Login</h2>
                  <div className="space-y-4">
                    <div>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        placeholder="Usuario"
                        className="w-full px-4 py-2 border-b-2 border-gray-200 focus:border-purple-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border-b-2 border-gray-200 focus:border-purple-500 outline-none transition-colors"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                    >
                      Enviar
                    </motion.button>
                  </div>
                  <p className="text-center text-sm text-gray-600">
                    ¿No tienes cuenta?{' '}
                    <button
                      onClick={() => setIsFlipped(true)}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Regístrate
                    </button>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900">Registro</h2>
                  <div className="space-y-4">
                    <div>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        placeholder="Nombre"
                        className="w-full px-4 py-2 border-b-2 border-gray-200 focus:border-purple-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border-b-2 border-gray-200 focus:border-purple-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="password"
                        placeholder="Contraseña"
                        className="w-full px-4 py-2 border-b-2 border-gray-200 focus:border-purple-500 outline-none transition-colors"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                    >
                      Registrarse
                    </motion.button>
                  </div>
                  <p className="text-center text-sm text-gray-600">
                    ¿Ya tienes cuenta?{' '}
                    <button
                      onClick={() => setIsFlipped(false)}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Inicia sesión
                    </button>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/*'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email('Email inválido').required('Email es requerido'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Contraseña es requerida'),
}).required()

type FormData = yup.InferType<typeof schema>

export default function AnimatedLoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    // Simular una petición de inicio de sesión
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
    setIsLoading(false)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-gray-100"
      >
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-lg w-96"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                {...register('password')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </motion.div>
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? (
                <motion.svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </motion.svg>
              ) : 'Iniciar sesión'}
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  )
}

*/