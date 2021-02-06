import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import TodoList from '../components/TodoList';
import { TodoType } from '../types/todo';

const app: NextPage = ({ todos }: any) => {
  return <TodoList todos={todos} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await axios.get<TodoType[]>('http://localhost:3000/api/todos');
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
