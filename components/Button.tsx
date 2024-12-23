import React from 'react'

type ButtonProps = {
    text: string
    action?: any
    type?: 'submit' | 'button';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({text, action, type, disabled}) => {
    return (
        <div className="flex justify-center">
            <button
                className="sm:w-[600px] w-[300px] rounded cursor-pointer bg-blue-500 p-2"
                onClick={() => action ? action() : null}
                disabled={disabled}
                type={type || 'button'}
            >
                <span className="font-bold">{text}</span>
                &nbsp;
                {text === "Create Task" || "Add Task" ? <i className="fa-solid fa-plus"></i> : <i className="fa-solid fa-check"></i>}
                    </button>
                    </div>
                    )
                }
export default Button
