import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const todos = Data.todo.getList();
      res.status(200).json(todos);
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.send(error);
    }
  }

  if (req.method === 'POST') {
    const { text, color } = req.body;

    if (!text || !color) {
      res.statusCode = 400;
      return res.send('필수 입력값 없음.');
    }

    const todos = Data.todo.getList();
    const todoId: number = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    const newTodo = {
      id: todoId,
      text,
      color,
      checked: false,
    };

    Data.todo.write([...todos, newTodo]);
    res.statusCode = 200;
    return res.end();
  }

  res.statusCode = 405;
  return res.end();
};
