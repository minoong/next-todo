import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { TodoType } from '../../types/todo';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).send('not allowed.');
  }

  try {
    const todosBuffer = fs.readFileSync('data/todos.json');
    const todosString = todosBuffer.toString();
    if (!todosString) {
      res.status(200).json([]);
    }

    const todos: TodoType[] = JSON.parse(todosString);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
};
