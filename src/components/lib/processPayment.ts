'use server'

export async function processPayment(formData: FormData) {
  // Simular un proceso de pago
  await new Promise(resolve => setTimeout(resolve, 1500))

  // En una aplicación real, aquí procesarías el pago con un proveedor de pagos

  return { success: true, message: 'Pago procesado con éxito' }
}

