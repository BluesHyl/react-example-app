export type TaskProps = {
    id: number;
    text: string;
}  
export type DispatchProps = (action: { type: string, payload: string | TaskProps }) => void;