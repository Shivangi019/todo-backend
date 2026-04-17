import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { todos } from '../data/todos';
import { CreateTodoDto, UpdateTodoDto } from '../types';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json(todos);
});


router.get('/:id', (req: Request, res: Response) => {
  const todo = todos.find((t) => t.id === req.params.id);

  if (!todo) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }

  res.json(todo);
});

router.post('/', (req: Request, res: Response) => {
  const body: CreateTodoDto = req.body;

   if (!body.title || body.title.trim() === '') {
    res.status(400).json({ message: 'Title is required' });
    return;
  }

  const newTodo = {
    id: uuidv4(),                       
    title: body.title.trim(),
    description: body.description?.trim() || '',
    completed: body.completed ?? false,  
    createdAt: new Date().toISOString(), 
  };

  todos.push(newTodo); 

  res.status(201).json(newTodo);
});

router.put('/:id', (req: Request, res: Response) => {
  const index = todos.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }

  const body: UpdateTodoDto = req.body;

   todos[index] = {
    ...todos[index],                             
    ...(body.title !== undefined && { title: body.title.trim() }),
    ...(body.description !== undefined && { description: body.description.trim() }),
    ...(body.completed !== undefined && { completed: body.completed }),
  };

  res.json(todos[index]);
});

router.delete('/:id', (req: Request, res: Response) => {
  const index = todos.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }

  const deleted = todos.splice(index, 1); 
  res.json({ message: 'Todo deleted', todo: deleted[0] });
});

export default router;