'use client'

export default function FAQsPage() {
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto p-6">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">FAQs</h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-lg border bg-white p-4 dark:bg-gray-900 dark:border-gray-800">
              <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</h2>
              <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
