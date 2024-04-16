
import { connectDB } from "@/libs/mongodb"
import User from "@/models/user"

async function loadUsers() {
  await connectDB()
  const users = await User.find()
  return users
}


export default async function Home() {
  const users = await loadUsers()
  console.log(users)
  return (
    <div>
      <h1>Users</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  )
}