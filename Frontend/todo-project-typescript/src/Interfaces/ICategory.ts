export default interface ICategory {
  id?: number; // optional because in create we dont assign id
  name: string;
  todosCount?: number;
}
