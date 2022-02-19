type TaskStatus = 'ready' | 'running' | 'success' | 'exception'
export interface Task {
    id: number,
    name: string,
    status: TaskStatus,
    progress: number,
    filePath: string,
    folder:string,
    errorMsg?:string
}