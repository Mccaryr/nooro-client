import React, {useEffect} from 'react'
import Task from "@/components/Task";
import {TaskType} from "@/app/types";
import {fetchTasks} from "@/app/api/tasks/task";

type TaskListProps = {
    setTaskForm: React.Dispatch<React.SetStateAction<string>>;
    setFocusedTask: React.Dispatch<React.SetStateAction<TaskType | undefined | null>>;
}



const TaskList:React.FC<TaskListProps> = ({setTaskForm, setFocusedTask}) => {
    const [tasks, setTasks] = React.useState<TaskType[]>()

    useEffect(() => {
        fetchTasks().then((response: any) => {
            setTasks(response)
        })
    }, [])

    return (
        <div className="flex flex-col">
        <div className="mt-[4rem] flex justify-center">
            <div className="flex justify-between items-center border-b border-gray-700 sm:w-1/2 w-3/4">
                <p className="text-blue-400 text-sm">Todo ({tasks?.length})</p>
                <p className="text-purple-700 text-sm">Completed ({tasks?.filter((task) => task.completed).length} of {tasks?.length})</p>
            </div>
        </div>
        {(!tasks || tasks.length === 0) && (
            <div className="flex flex-col text-center mt-8 leading-10">
                <i className="fa-solid fa-clipboard-list text-[5rem]"></i>
                <p className="font-bold">You dont have any tasks registered yet.</p>
                <p>Create tasks and organize your to-do items</p>
            </div>
        )}


            {tasks && tasks.length > 0 && (
            tasks.map((task: TaskType) => (
                <div className="flex w-full justify-center gap-4" key={task.id}>
                    <Task task={task} setTaskForm={setTaskForm} setFocusedTask={setFocusedTask} setTasks={setTasks} />
                </div>
            ))
        )}
        </div>
    )
}
export default TaskList
