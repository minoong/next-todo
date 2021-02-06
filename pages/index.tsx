import { NextPage } from 'next';
import styled from 'styled-components';
import TodoList from '../components/TodoList';
import { TodoType } from '../types/todo';

const todos: TodoType[] = [
  { id: 1, text: 'sadjfalsdk', color: 'red', checked: false },
  { id: 2, text: 'sadjfalsdk', color: 'orange', checked: false },
  { id: 3, text: 'sadjfalsdk', color: 'yellow', checked: true },
  { id: 4, text: 'sadjfalsdk', color: 'green', checked: false },
  { id: 5, text: 'sadjfalsdk', color: 'blue', checked: false },
  { id: 6, text: 'sadjfalsdk', color: 'navy', checked: false },
];

const index: NextPage = () => {
  return <TodoList todos={todos} />;
};
export default index;
