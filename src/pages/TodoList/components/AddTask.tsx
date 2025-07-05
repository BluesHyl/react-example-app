import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { useTasksDispatch } from './ContextPrivider';
export default function AddTask() {
    const [task, setTask] = useState('');
    const dispatch = useTasksDispatch();
    return (
        <div>
            <Input value={task} onChange={(e) => setTask(e.target.value)} status={task ? '' : 'error'} type="text" placeholder="Add a new task" />
            <Button className="mt-[10px]" onClick={() => {
                if (!task) return;
                setTask('');
                dispatch?.({ type: 'ADD_TASK', payload: task })
            }}>Add</Button>
        </div>
    )
}