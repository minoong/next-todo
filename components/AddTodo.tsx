import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../styles/palette';
import BrushIcon from '../public/statics/svg/paintbrush.svg';
import { TodoType } from '../types/todo';
import { addTodoAPI } from '../lib/api/todos/todo';
import { useRouter } from 'next/dist/client/router';

const Container = styled.div`
  padding: 1rem;
  .add-todo-header-title {
    font-size: 1.31rem;
  }

  .add-todo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .add-todo-submit-button {
      cursor: pointer;
      padding: 0.25rem 0.5rem;
      border: 1px solid black;
      border-radius: 0.31rem;
      background-color: white;
      outline: none;
      font-size: 0.875rem;
      transition: all 0.3s;

      :hover {
        background-color: #ffadad;
      }
    }
  }

  .add-todo-colors-wrapper {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;

    .add-todo-color-list {
      display: flex;
      button {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 1rem;
        border: 0;
        outline: 0;
        border-radius: 50%;
        &:last-child {
          margin: 0;
        }
        transition: border 0.5s;
      }

      .add-todo-selected-color {
        border: 2px solid black !important;
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

  textarea {
    width: 100%;
    border-radius: 0.31rem;
    height: 18.75rem;
    border-color: ${palette.gray};
    margin-top: 0.75rem;
    resize: none;
    outline: none;
    padding: 0.75rem;
    font-size: 1rem;
  }
`;

const AddTodo: React.FC = () => {
  const [text, setText] = useState('');
  const [selectedColor, setSelectedColor] = useState<TodoType['color']>();
  const router = useRouter();

  const addTodo = async () => {
    try {
      if (!text || !selectedColor) {
        alert('색상과 할 일을 입력해주세요.');
        return;
      }
      await addTodoAPI({ text, color: selectedColor });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container>
      <div className="add-todo-header">
        <h1 className="add-todo-header-title">Add Todo</h1>
        <button type="button" className="add-todo-submit-button" onClick={addTodo}>
          add
        </button>
      </div>
      <div className="add-todo-colors-wrapper">
        <div className="add-todo-color-list">
          {['red', 'orange', 'yellow', 'green', 'blue', 'navy'].map((color, index) => (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              key={index}
              type="button"
              className={`bg-${color} add-todo-color-button
            ${color === selectedColor ? 'add-todo-selected-color' : ''}`}
              onClick={() => setSelectedColor(color as TodoType['color'])}
            />
          ))}
        </div>
        <BrushIcon />
      </div>
      <textarea value={text} placeholder="할 일을 입력해주세요." onChange={(e) => setText(e.currentTarget.value)} />
    </Container>
  );
};

export default AddTodo;
