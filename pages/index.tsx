import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import TodoList from '../components/TodoList';
import { getTodosAPI } from '../lib/api/todos/todo';
import { TodoType } from '../types/todo';

interface IProps {
  todos: TodoType[];
}

const app: NextPage<IProps> = ({ todos }) => {
  console.log(process.env.NEXT_PUBLIC_API_URL, 'client');
  return <TodoList todos={todos} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await getTodosAPI();
    return {
      props: {
        todos: data,
      },
    };
  } catch (err) {
    console.error(err);
    return { props: {} };
  }
};

export default app;
