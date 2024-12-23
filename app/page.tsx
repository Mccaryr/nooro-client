"use client"
import React, {useEffect, useState} from 'react'
import Header from "@/components/Header";
import Button from "@/components/Button";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import {TaskType} from "@/app/types";

const Home = () => {
    const [taskForm, setTaskForm] = useState<string>("");
    const [focusedTask, setFocusedTask] = useState<TaskType | undefined | null>(null);

    return (
        <>
            <Header />
            {taskForm ?
                (
                    <TaskForm setTaskForm={setTaskForm} type={taskForm} focusedTask={focusedTask} setFocusedTask={setFocusedTask} />
                )
                :
                (
                    <>
                        <div className="mt-[-20px]">
                            <Button text={"Create Task"} action={() => setTaskForm("create")}  />
                        </div>
                        <TaskList setTaskForm={setTaskForm} setFocusedTask={setFocusedTask} />
                    </>
                )}
        </>
    )
}
export default Home
