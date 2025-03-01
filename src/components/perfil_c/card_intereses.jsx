import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function CardIntereses({ interests, renderTagsWithColors }) {
  return (
    <Card className="mb-8 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Intereses</CardTitle>
      </CardHeader>
      <Separator className="bg-gray-300 dark:bg-gray-800" />
      <CardContent className="pt-6">
        <div className="flex flex-wrap gap-2">{interests && renderTagsWithColors(interests)}</div>
      </CardContent>
    </Card>
  )
}

export default CardIntereses

