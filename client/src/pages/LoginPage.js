import { useState } from "react"

const LoginPage = () => {
  const defForm = { email: "", password: "" };
  const [formData, setFormData] = useState(defForm);
  const [loginResult, setLoginResult] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const query = await fetch("/api/auth/login", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await query.json();

    if (result && result.payload) {
      window.location.href = "/";
    } else {
      setLoginResult("fail");
    }
  };

  return (
    <div className="w-1/2 mx-auto p-8 bg-gray-800 rounded-lg shadow-lg text-white">
      <h1 className="text-3xl font-semibold mb-6 text-center">Login</h1>

      <form className="space-y-4">
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
            Log Me In!
          </button>
        </div>
      </form>

      {loginResult === "fail" && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4">
          Login failed!
        </div>
      )}
    </div>
  );
};

export default LoginPage;
