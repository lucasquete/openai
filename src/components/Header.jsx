import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Header = ({ setListImages, setIsLoading }) => {

    const [input, setInput] = useState("");
    
    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            const res = await fetch("http://localhost:8800/openai/images", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: input
                })
            });

            const jsonData = await res.json();
            setListImages(jsonData)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className='bg-gradient-to-r from-[#97D9E1] to-[#D9AFD9]'>
        <div className='container mx-auto max-w-5xl px-2 py-6'>
            <p className='block font-bold text-xl font-opensans'>
                Vahallas
                <span className='text-primary'>Art</span>
            </p>
            <div className='mt-14'>
                <h2 className='font-bold text-xl max-w-xs mb-1'>
                    Unleash the power of AI to create stunning images.
                </h2>
                <p className='font-light opacity-80 hidden md:inline-block'>
                    Created with AI-powered image generation technology.
                </p>
                <form className='relative my-8 max-w-md' onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        className='indent-2 py-4 pr-[4.5rem] rounded-sm bg-gray-50 w-full md:max-w-md focus:ring-primary outline-none focus:ring-1'
                        placeholder='Unleash the power of AI to create'
                        value={input}
                        onChange={handleInput}
                    />
                    <button 
                        type="submit" 
                        className="absolute bottom-2.5 right-2.5 bg-primary text-white px-2 py-2 rounded-sm text-sm"
                    >
                       <ArrowLongRightIcon className="h-6"/>
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Header