/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import styled from 'styled-components';
import palette from '../styles/palette';
import { TodoType } from '../types/todo';
import TrashCanIcon from '../public/statics/svg/trash-can.svg';
import CheckMarkIcon from '../public/statics/svg/check-mark.svg';
import { checkTodoAPI, deleteTodoAPI } from '../lib/api/todos/todo';

const Container = styled.div`
  width: 100%;

  .todo-list-header {
    padding: 0.75rem;
    position: relative;
    border-bottom: 1px solid ${palette.gray};

    .todo-list-last-todo {
      font-size: 0.875rem;
      margin: 0 0 0.5rem;
      span {
        margin-left: 0.5rem;
      }
    }

    .todo-list-header-colors {
      display: flex;
      .todo-list-header-color-num {
        display: flex;
        margin-right: 0.5rem;
        p {
          font-size: 0.875rem;
          line-height: 1rem;
          margin: 0;
          margin-left: 0.375rem;
        }
        .todo-list-header-round-color {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
      }
    }
  }
  .bg-blue {
    background-color: ${palette.blue};
  }
  .bg-green {
    background-color: ${palette.green};
  }
  .bg-navy {
    background-color: ${palette.navy};
  }
  .bg-orange {
    background-color: ${palette.orange};
  }
  .bg-red {
    background-color: ${palette.red};
  }
  .bg-yellow {
    background-color: ${palette.yellow};
  }

  .todo-list {
    .todo-tiem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 3.25rem;
      border-bottom: 1px solid ${palette.gray};

      transition: all 0.3s;

      :hover {
        background-color: #dfdfdf;
      }

      .todo-left-side {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        .todo-color-block {
          width: 0.75rem;
          height: 100%;
        }
        .checked-todo-text {
          color: ${palette.gray};
          text-decoration: line-through;
        }
        .todo-text {
          margin-left: 0.75rem;
          font-style: 1rem;
        }
      }
      .todo-right-side {
        display: flex;
        margin-right: 0.75rem;
        svg {
          &:first-child {
            margin-right: 1rem;
          }
        }

        .todo-trash-can {
          width: 1rem;
          path {
            fill: ${palette.deep_red};
          }
        }

        .todo-check-mark {
          fill: ${palette.deep_green};
        }

        .todo-button {
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 50%;
          border: 1px soild ${palette.gray};
          background-color: transparent;
          outline: none;
        }
      }
    }
  }
`;

interface IProps {
  todos: TodoType[];
}

const TodoList: React.FC<IProps> = ({ todos }) => {
  type ObjectIndexType = {
    [key: string]: number;
  };

  const [localTodos, setLocalTodos] = useState(todos);
  const router = useRouter();

  const getTodoColorNums = useCallback(() => {
    const result = todos.reduce((acc: ObjectIndexType, value: TodoType) => {
      acc[value.color] = acc[value.color] || 0;
      acc[value.color] = acc[value.color] + 1;
      return acc;
    }, {});

    return result;
  }, [todos]);

  const todoColorNums = useMemo(getTodoColorNums, [todos]);

  const checkTodo = async (id: number) => {
    try {
      await checkTodoAPI(id);
      // router.reload();
      // router.push('/');

      const newTodos = localTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });

      setLocalTodos(newTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoAPI(id);
      const newTodos = localTodos.filter((todo) => todo.id !== id);
      setLocalTodos(newTodos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="todo-list-header">
        <p className="todo-list-last-todo">
          남은 TODO<span>{localTodos.length}</span>
        </p>
        <div className="todo-list-header-colors">
          {Object.keys(todoColorNums).map((color, index) => (
            <div className="todo-list-header-color-num" key={index}>
              <div className={`todo-list-header-round-color bg-${color}`} />
              <p>{todoColorNums[color]}개</p>
            </div>
          ))}
        </div>
      </div>
      <div className="todo-list">
        {localTodos.map((todo) => (
          <li className="todo-tiem" key={todo.id}>
            <div className="todo-left-side">
              <div className={`todo-color-block bg-${todo.color}`} />
              <p className={`todo-text ${todo.checked ? 'checked-todo-text' : ''}`}>{todo.text}</p>
            </div>
            <div className="todo-right-side">
              {todo.checked && (
                <>
                  <TrashCanIcon className="todo-trash-can" onClick={() => deleteTodo(todo.id)} />
                  <CheckMarkIcon className="todo-check-mark" onClick={() => checkTodo(todo.id)} />
                </>
              )}
              {!todo.checked && <button type="button" className="todo-button" onClick={() => checkTodo(todo.id)} />}
            </div>
          </li>
        ))}
      </div>
    </Container>
  );
};

export default TodoList;
