import React, { useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import { AiFillDelete,AiOutlineEdit } from 'react-icons/ai'
import './index.css'

function Todoapp() {
    const [inputvalue, setInpuvalue] = useState("")

    const [tasklist , setTasklist] = useState([])

    const [editindex , setEditindex] = useState(null)

    const renderinput = (e) => {
        setInpuvalue(e.target.value)
    }

    const addtasks = () => {
        if (inputvalue !== "") {
            if (editindex === null){
                const task = {
                    id : uuidv4(),
                    task : inputvalue
                }
            const updateTasks = [...tasklist , task]
                setTasklist(updateTasks)
                localStorage.setItem("tasks" , JSON.stringify(updateTasks))
            }else{
                const updateText = [...tasklist]
                updateText[editindex].task = inputvalue
                setTasklist(updateText)
                localStorage.setItem("tasks", JSON.stringify(updateText))
                setEditindex(null)
            }
          
        } 
        setInpuvalue('') 
    }

    const deleteTask = (id) => {
        const updateTask = tasklist.filter(each => each.id!== id)

        setTasklist(updateTask)

        localStorage.setItem("tasks" , JSON.stringify(updateTask))
    }

const editTask = (id) => {
    const indexNu = tasklist.findIndex(each => each.id === id)
    setInpuvalue(tasklist[indexNu].task)
    setEditindex(indexNu)
}

    useEffect( () => {
        const storedData = localStorage.getItem("tasks")
        if (storedData){
            setTasklist(JSON.parse(storedData))
        }
    },[])

 

    return (
        <div className='bg-container'>
            <input type="text" onChange={renderinput} className="input" value={inputvalue} placeholder="Enter a Todo..." />
            <button type='button' onClick={addtasks} className='btn'>{editindex === null ? "Add" : "Update"}</button>
            
            {tasklist.map(each => (
                <ul className='task-container' key={each.id}>
                <li>{each.task}</li>
                <div className='icon-box'>
                <AiOutlineEdit className='icon' onClick={() => editTask(each.id)} />
                <AiFillDelete className='icon' onClick={() => deleteTask(each.id)} />
                </div>
                </ul>
            ))}
        </div>
    )
}

export default Todoapp