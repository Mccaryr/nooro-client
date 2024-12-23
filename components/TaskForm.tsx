"use client"
import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import Button from "@/components/Button";
import ColorPicker from "@/components/ColorPicker";
import {TaskType} from "@/app/types";
import {createTask, updateTask} from "@/app/api/tasks/task";

type FormValues = {
    title: string;
    color: string;
};

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    color: Yup.string().required('Color is required'),
});

type TaskFormProps = {
    setTaskForm: React.Dispatch<React.SetStateAction<string>>;
    type: string;
    focusedTask: TaskType | undefined | null;
    setFocusedTask: React.Dispatch<React.SetStateAction<TaskType | undefined | null>>;
}

const TaskForm:React.FC<TaskFormProps> = ({setTaskForm, type, focusedTask, setFocusedTask}) => {
    const [errorMsg, setErrorMsg] = React.useState<string>();

    const handleSubmit = (values: any) => {
        if(type === "create") {
            createTask(values).then((response: unknown) => {
                setFocusedTask(null)
                setTaskForm('');
            })
        } else {
            let updatedTask = {
                id: focusedTask?.id,
                title: values.title,
                color: values.color,
                completed: focusedTask?.completed
            };
            updateTask(updatedTask).then((response: unknown) => {
                setFocusedTask(null)
                setTaskForm('');
            })
        }
    }

    return (
        <div className="flex justify-center items-center mt-8">
            <div className="flex flex-col justify-between sm:w-1/2 w-[80vw] gap-2">
                <div className="flex justify-start">
                    <button onClick={() => {
                        setFocusedTask(null);
                        setTaskForm('')
                    }}><i className="fa-solid fa-arrow-left"></i></button>
                </div>
                <Formik
                    initialValues={{
                        title: focusedTask?.title || '',
                        color: focusedTask?.color || '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({isValid, isSubmitting, setValues, values}) => (
                        <Form className="space-y-8 w-full">
                            <div>
                                <label htmlFor="username" className="block text-blue-500">Title</label>
                                <Field
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Ex: Brush your teeth"
                                    className="border-1 rounded p-2 w-full bg-gray-700 border-gray-500 text-white"
                                />
                                <ErrorMessage
                                    name="title"
                                    component="div"
                                    className="text-red-600 text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="color" className="block text-blue-500">Color</label>
                                <ColorPicker setValues={setValues} values={values} />
                                <ErrorMessage
                                    name="color"
                                    component="div"
                                    className="text-red-600 text-sm"
                                />
                            </div>
                                <Button text={type === "create" ? "Add Task" : "Save"} type={"submit"} disabled={!isValid || isSubmitting} />
                                {errorMsg && (
                                    <div className="text-red-600 text-sm">
                                        {errorMsg}
                                    </div>
                                )}

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
export default TaskForm
