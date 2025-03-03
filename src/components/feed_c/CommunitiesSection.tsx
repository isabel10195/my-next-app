"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const communities = [
  { name: "Apple Developers", members: 50000 },
  { name: "iOS Enthusiasts", members: 30000 },
  { name: "Mac Power Users", members: 25000 },
];

export default function CommunitiesSection() {
  return (
    <Card className="bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">Communities</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {communities.map((community) => (
            <li key={community.name} className="flex items-center justify-between text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-lg">
              <span>{community.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-300">{community.members.toLocaleString()} members</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
