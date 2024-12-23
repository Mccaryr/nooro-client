import React, {useEffect} from 'react'
import {TaskType} from "@/app/types";
import {deleteTask, fetchTasks, updateTask} from "@/app/api/tasks/task";

type TaskProps = {
    task: TaskType
    setTaskForm: React.Dispatch<React.SetStateAction<string>>;
    setFocusedTask: React.Dispatch<React.SetStateAction<TaskType | undefined | null>>;
    setTasks: React.Dispatch<React.SetStateAction<TaskType[] | undefined>>;
}
const Task: React.FC<TaskProps> = ({task, setTaskForm, setFocusedTask, setTasks}) => {
    const [checked, setChecked] = React.useState<boolean | undefined>(false);
    const [deleteConfirmation, setDeleteConfirmation] = React.useState<boolean>(false);

    useEffect(() => {
        setChecked(task.completed)
    }, [task]);

    const clickHandler = (type: string) => {
        if(type === "update") {
            setFocusedTask(task)
            setTaskForm("update")
        } else {
            deleteTask(task.id).then(() => {
                fetchTasks().then((response: any) => {
                    setTasks(response)
                })
            })
        }
    }
    return (
        <div
            className="flex sm:w-1/2 w-3/4 justify-center items-center p-6 rounded bg-gray-700 mt-5"
        >
            {deleteConfirmation ? (
                <div className="w-full h-[100px] flex flex-col relative">
                    <p className="text-center">Are you sure?</p>
                    <div className="flex gap-4 items-stretch w-full">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded absolute bottom-0 left-0"
                            onClick={() => {
                            clickHandler("delete")
                            setDeleteConfirmation(false);
                        }}>Delete</button>
                        <button
                            className="bg-blue-500 px-4 py-2 rounded absolute bottom-0 right-0"
                            onClick={() => setDeleteConfirmation(false)}>No</button>
                    </div>
                </div>


            ) : (
                <div className="flex items-center justify-between w-full">
                    <label htmlFor="complete">
                        <input
                            className="w-6 h-6 border-2 border-blue-500 rounded-full checked:ring-4 checked:ring-blue-500 focus:ring-2 focus:ring-blue-500"
                            type="checkbox"
                            id="complete"
                            name="complete"
                            value="yes"
                            checked={checked}
                            onChange={(e) => {
                                let updatedTask = {...task, completed: !task.completed}
                                updateTask(updatedTask).then((response: unknown) => {
                                    fetchTasks().then((response: any) => {
                                        setTasks(response)
                                    })
                                })
                            }}
                        />
                    </label>
                    <p className="cursor-pointer" onClick={() => clickHandler("update")}>{task.title}</p>
                    <button type="button" onClick={() => setDeleteConfirmation(true)}><i
                        className="fa-solid fa-trash"></i></button>
                </div>
            )
            }
        </div>
    )
}
export default Task
