import { type TaskProps } from './d.type';
export const tasksReducer = (state: TaskProps[], action: { type: string, payload: string | TaskProps }) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, {
                id: state.length + 1,
                text: action.payload as string
            }];
        case 'DELETE_TASK':
            return state.filter((task) => task.id !== (action.payload as TaskProps).id);
    }
}