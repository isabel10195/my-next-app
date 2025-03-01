import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function CardLogros({ achievements }) {
  return (
    <Card className="mb-8 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Logros</CardTitle>
      </CardHeader>
      <Separator className="bg-gray-300 dark:bg-gray-800" />
      <CardContent className="pt-6">
        <ul className="list-disc pl-5 space-y-2">
          {achievements &&
            achievements.map((achievement, index) => (
              <li key={index} className="text-gray-300">
                {achievement}
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  )
}

