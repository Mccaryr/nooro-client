import React from 'react'

const Header = () => {
    return (
        <div className="flex bg-black h-[20vh] w-full justify-center items-center">
            <header className="flex items-center justify-between gap-4">
                <span><i className="fa-solid fa-rocket text-blue-400 text-4xl"></i></span>
                <h1 className="text-blue-400 text-4xl font-extrabold">Todo</h1>
                <h1 className="text-purple-700 text-4xl font-extrabold">App</h1>
            </header>
        </div>
    )
}
export default Header
