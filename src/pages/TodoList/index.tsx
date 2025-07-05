import React, { useEffect } from 'react';
import { ContextProvider } from './components/ContextPrivider';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
export default function TodoList() {
    return (
        <>
            <ContextProvider>
                <AddTask />
                <TaskList />
            </ContextProvider>
        </>
    )
}
