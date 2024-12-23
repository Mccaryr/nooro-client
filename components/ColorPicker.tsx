import React from 'react'

type ColorPickerProps = {
        setValues: (values: any) => void;
        values: {[key: string]: any};
}

const ColorPicker:React.FC<ColorPickerProps> = ({setValues, values}) => {

    const colors = [
        { name: "Red", shade: "red-500" },
        { name: "Orange", shade: "orange-500" },
        { name: "Yellow", shade: "yellow-500" },
        { name: "Green", shade: "green-500" },
        { name: "Blue", shade: "blue-500" },
        { name: "Indigo", shade: "indigo-500" },
        { name: "Violet", shade: "violet-500" },
        { name: "Dark Red", shade: "red-700" },
        { name: "Brown", shade: "amber-700" },
    ];

    return (
        <div className="flex gap-2 justify-evenly">
            {colors.map(({ name, shade }) => (
                <button
                    key={shade}
                    type="button"
                    aria-label={`Pick ${name}`}
                    onClick={() => setValues({ ...values, color: shade })}
                    className={`sm:w-10 sm:h-10 w-6 h-6 rounded-3xl bg-${shade} ${values.color === shade ? "ring-2 ring-white" : ""}`}
                />
            ))}
        </div>
    );
}
export default ColorPicker
