import { Todo } from '../types';
import { v4 as uuidv4 } from 'uuid';

export let todos: Todo[] = [
  {
    id: uuidv4(),
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, butter, and vegetables from the market.',
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Complete React assignment',
    description: 'Build the full-stack Todo app using React, Node.js and TypeScript.',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Morning workout',
    description: 'Run 5km and do 30 minutes of strength training.',
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Read TypeScript docs',
    description: 'Go through the official TypeScript handbook to understand interfaces and generics.',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];