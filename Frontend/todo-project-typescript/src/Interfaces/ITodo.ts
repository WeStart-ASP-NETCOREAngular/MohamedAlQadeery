export default interface ITodo {
  id?: number; // optional because in create we dont assign id
  task: string;
  description?: string;
  categoryName?: string;
  categoryId?: number;
  isCompleted?: boolean;
  dueDate?: Date;
}
