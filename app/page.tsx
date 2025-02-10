import PostCard from "./component/PostCard"
import Searchbox from "./component/Searchbox"


const Home = () => {
  const post = [
    {
      _id: "1",
      title: "My First Post",
      description: "This is a sample post description.",
      imageUrl: "",
      category: "Technology",
      views: 100,
      author: {
        id: "123",
        name: "John Doe",
      },
      createdAt: "2023-10-01T12:00:00Z",
    },
  ];
  return (
    <>
      <div className="w-full bg-pink-600 min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6;">
        <h1 className="w-max bg-black text-3xl px-3 py-8 text-white font-extrabold">Create your post, Connect with other Developers</h1>
        <p className="mt-3 text-white ">Submit your ideas, Solutions and Get Noticed in Virtual Competition</p>
        <Searchbox/>
      </div>
      <ul className="mt-7 px-6 grid grid-cols-5 ">
        {
          post.map((p) => {
            return <PostCard key={p._id} post={ p} />
          })
        }

      </ul>
    </>
  )
}

export default Home
