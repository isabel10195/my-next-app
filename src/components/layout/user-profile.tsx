import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserProfileProps {
  name: string
  username: string
  avatarUrl: string
}

export function UserProfile({ name, username, avatarUrl }: UserProfileProps) {
  return (
    <div className="flex items-center gap-3 p-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="font-semibold">{name}</h2>
        <p className="text-sm text-muted-foreground">@{username}</p>
      </div>
    </div>
  )
}

