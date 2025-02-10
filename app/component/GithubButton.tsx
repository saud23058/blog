import { githubAuth } from '@/actions/user'
import React from 'react'

const GithubButton = () => {
  const githubHandle = async () => {
    await githubAuth()  
  
 }
  return (
    <form
    action={githubHandle}
   >
     <button
       className="bg-black p-2 mt-2 w-60 text-white font-bold rounded-lg hover:bg-gray-700 duration-100"
       type="submit"
     >
       Continue with GitHub
     </button>
   </form>
  )
}

export default GithubButton
