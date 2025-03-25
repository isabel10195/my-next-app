# Introducción
La página de FAQs (Preguntas Frecuentes) ofrece a los usuarios respuestas a preguntas comunes relacionadas con la plataforma "The View Island". Está diseñada para proporcionar información clara y accesible sobre el funcionamiento de la plataforma, sus servicios y sus políticas.

# Estructura del Código
El código está compuesto por varios bloques de React y Tailwind CSS, que se encargan de renderizar la página de FAQs de manera eficiente y visualmente atractiva. Aquí se detallan las secciones clave.

# Importaciones
'use client'
import BackButton from "@/components/ui/BackButton"; // Ajusta la ruta según tu estructura de carpetas

# Estructura de los datos
const faqs = [
  {
    question: "What is The View Island?",
    answer: "The View Island is a platform that provides curated articles, editorials, and opinions on various topics including world events, business, and lifestyle."
  },
  {
    question: "How do I subscribe?",
    answer: "You can subscribe by clicking the 'Subscribe for €2.50' button in the header. Follow the on-screen instructions to complete your subscription."
  },
  {
    question: "Can I access the content for free?",
    answer: "Some content is free to read, but exclusive articles and features require a subscription."
  },
  {
    question: "How do I contact support?",
    answer: "For support, please email us at support@viewisland.com or visit the 'Contact Us' page."
  },
  {
    question: "Is my subscription refundable?",
    answer: "Subscriptions are non-refundable. However, you can cancel at any time to prevent future charges."
  }
];


<div className="space-y-6">
  {faqs.map((faq, index) => (
    <div key={index} className="rounded-lg border bg-gray-100 p-4 dark:bg-gray-900 border-gray-300 dark:border-gray-800">
      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</h2>
      <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
    </div>
  ))}
</div>


El array faqs contiene los objetos que representan cada pregunta y su respuesta correspondiente.
El componente FAQsPage mapea sobre el array faqs y renderiza cada pregunta y respuesta dentro de un contenedor estilizado utilizando Tailwind CSS.

# Componentes
- question: Representa la pregunta que se hará al usuario.
- answer: Proporciona la respuesta correspondiente a la pregunta.
- BackButton: Este componente muestra un botón que redirige al usuario a la página principal (/), proporcionando una forma fácil de navegar hacia atrás.

# Estilo y diseño
La página utiliza Tailwind CSS para los estilos, lo que permite un diseño limpio y responsivo.
- min-h-screen: Asegura que la altura mínima de la página sea igual a la altura de la pantalla.
- bg-white dark:bg-gray-950: Establece el fondo de la página en blanco para el modo claro y gris oscuro para el modo oscuro.
- container mx-auto p-6: Define un contenedor centrado con relleno (padding) de 6 unidades en todos los lados.


https://github.com/JoseValeroo/my-next-app/blob/IsaRama5/public/img_doc/faqs_claro.png
https://github.com/JoseValeroo/my-next-app/blob/IsaRama5/public/img_doc/faqs_oscuro.png
