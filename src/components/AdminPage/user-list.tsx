export default function UserList() {
    const users = [
      {
        id: 1,
        name: "Sarah Wilson",
        username: "@sarahw",
        avatar: "/placeholder.svg?height=40&width=40",
        tweetCount: 245,
      },
      {
        id: 2,
        name: "Michael Chen",
        username: "@mchen",
        avatar: "/placeholder.svg?height=40&width=40",
        tweetCount: 189,
      },
      {
        id: 3,
        name: "Jessica Brown",
        username: "@jbrown",
        avatar: "/placeholder.svg?height=40&width=40",
        tweetCount: 432,
      },
    ]
  
    return (
      <div className="space-y-2">
        {users.map((user) => (
          <button
            key={user.id}
            className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-zinc-50 transition-colors text-left"
          >
            <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-10 w-10 rounded-full bg-zinc-200" />
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-zinc-500">
                {user.username} · {user.tweetCount} tweets
              </div>
            </div>
          </button>
        ))}
      </div>
    )
  }
  
  