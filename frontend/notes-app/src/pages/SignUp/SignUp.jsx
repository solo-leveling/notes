import React, {useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Inputs/PasswordInput'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'

const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!name) {
            setError("Enter the username")
            return;
        }

        if (!validateEmail(email)) {
            setError("Enter a valid email address");
            return;
        }

        if (!password) {
            setError("Enter the password")
            return;
        }

        setError("")

        //SignUp API call
        try {
                const response = await axiosInstance.post("/register", {
                    username: name, 
                    email: email,
                    password: password
                });

            if (response.data && response.data.error) {
                setError(response.data.message)
                return
            }
            
            navigate("/login")

            // if (response.data && response.data.accessToken) {
            //     localStorage.setItem("token", response.data.accessToken);
            //     navigate("/login")
            // }

        } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    setError(error.response.data.message)
                } else {
                    console.error("Signup failed:", error);
                    setError("Something went wrong. Please try again.");
                }
        }
    }

    return (
        <>
            <Navbar />
            <div className='flex items-center justify-center mt-28'>
            <div className='w-96 border rounded bg-white px-7 py-10 shadow-xl'>
                <form onSubmit={handleSignUp}>
                        <h4 className='flex items-center justify-center text-2xl mb-7'>Register</h4>
                        <input type="text" placeholder='Username' className='input-box'
                    value={name} onChange={(e)=>setName(e.target.value)}/>
                        <input type="text" placeholder='Email' className='input-box'
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                        {error && <p className='text-red-500 text-xs pb-1'>{ error }</p>}
                        <button type='submit' className='btn-primary'>Register</button>
                        <p className='text-sm text-center mt-4'>Already have a account?{" "}
                    <Link to="/login" className='font-medium text-primary underline'>
                        Login        
                    </Link></p>
                </form>
            </div>
            </div>
        </>
    )
}

export default SignUp