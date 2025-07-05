import React, { useReducer, createContext, useContext } from 'react';
import { tasksReducer } from '../todoReducer';
import { type TaskProps } from '../d.type';
interface Dispatch {
    (action: { type: string, payload: string }): void;
}

const TasksContext = createContext<TaskProps[] | null>(null);
const TasksDispatchContext = createContext<Dispatch | null>(null);

export const useTasks = () => {
    return useContext(TasksContext);
}
export const useTasksDispatch = () => {
    return useContext(TasksDispatchContext);
}

const initialTasks = [{
    id: 1,
    text: 'Buy groceries'
}, {
    id: 2,
    text: 'Finish homework'
}, {
    id: 3,
    text: 'Call mom'
}];

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, dispatch] = useReducer(tasksReducer as (state: TaskProps[], action: { type: string, payload: string }) => TaskProps[], initialTasks as TaskProps[]);
    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    )
}