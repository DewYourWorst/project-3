import { useState } from "react"

const SignupPage = (props) => {

  const defForm = { fname: "", lname: "", email: "", password: "" }
  const [ formData, setFormData ] = useState(defForm)
  const [ signupResult, setSignupResult ] = useState("")

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleFormSubmit = async(e) => {
    e.preventDefault()
    const query = await fetch("/api/auth/register", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if( !query.ok ) {
      setSignupResult("fail")
    } else {
      const result = await query.json()
      if( result.status === "success" && result.payload ){
        window.location.href = "/"
      }
    }
  }

  return (
    <div className="w-1/2 mx-auto p-8 bg-gray-800 rounded-lg shadow-lg text-white">
      <h1 className="text-3xl font-semibold mb-6 text-center">Register</h1>
  
      <form className="space-y-4">
        <div className="mb-4 flex flex-col">
          <label className="text-gray-400">First Name:</label>
          <input
            type="text"
            name="fname"
            placeholder="John"
            className="w-full py-2 px-3 bg-gray-700 border rounded-lg text-gray-200 focus:outline-none focus:ring focus:border-blue-500"
            value={formData.fname}
            onChange={handleInputChange}
          />
        </div>
  
        <div className="mb-4 flex flex-col">
          <label className="text-gray-400">Last Name:</label>
          <input
            type="text"
            name="lname"
            placeholder="Doe"
            className="w-full py-2 px-3 bg-gray-700 border rounded-lg text-gray-200 focus:outline-none focus:ring focus:border-blue-500"
            value={formData.lname}
            onChange={handleInputChange}
          />
        </div>
  
        <div className="mb-4 flex flex-col">
          <label className="text-gray-400">Email Address:</label>
          <input
            type="text"
            name="email"
            placeholder="john@gmail.com"
            className="w-full py-2 px-3 bg-gray-700 border rounded-lg text-gray-200 focus:outline-none focus:ring focus:border-blue-500"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
  
        <div className="mb-4 flex flex-col">
          <label className="text-gray-400">Password:</label>
          <input
            type="password"
            name="password"
            className="w-full py-2 px-3 bg-gray-700 border rounded-lg text-gray-200 focus:outline-none focus:ring focus:border-blue-500"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
  
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={handleFormSubmit}
          >
            Sign Me Up!
          </button>
        </div>
      </form>
  
      {signupResult === "fail" && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4">
          Signup failed!
        </div>
      )}
    </div>
  );
  
  
  
  
}

export default SignupPage