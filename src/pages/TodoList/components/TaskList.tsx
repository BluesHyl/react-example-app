import React from 'react';
import { List, Button } from 'antd';
import { useTasks, useTasksDispatch } from './ContextPrivider';
import { type DispatchProps } from '../d.type';
export default function TaskList() {
    const tasks = useTasks();
    const dispatch = useTasksDispatch() as DispatchProps;
    return (
        <div>
            <List
                dataSource={tasks || []}
                renderItem={(item) => (
                    <List.Item>
                        {item.text}
                        <Button className="ml-[20px]" danger size="small" onClick={() => dispatch({ type: 'DELETE_TASK', payload: item })}>Delete</Button>
                    </List.Item>
            )}
            />
        </div>
    )
}