import { auth } from "@/auth"


const Home = async() => {

  const session = await auth()
  console.log(session);
  
  return (
    <div>
      Welcome to the new project
    </div>
  )
}

export default Home
