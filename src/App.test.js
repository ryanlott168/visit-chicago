import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { API } from 'aws-amplify';

jest.mock('aws-amplify', () => ({
  Amplify: { configure: jest.fn() },
  API: { graphql: jest.fn() },
  graphqlOperation: jest.fn((query, variables) => ({ query, variables })),
}));

jest.mock('@aws-amplify/ui-react', () => ({
  withAuthenticator: (Component) => (props) => <Component {...props} />,
  Button: (props) => <button {...props}>{props.children}</button>,
  Heading: (props) => <h1 {...props}>{props.children}</h1>,
  Text: (props) => <span {...props}>{props.children}</span>,
  TextField: (props) => <input {...props} />,
  View: (props) => <div {...props}>{props.children}</div>,
}));

jest.mock('./aws-exports', () => ({}), { virtual: true });

const mockUser = { username: 'test-user' };

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Todo component', () => {
  test('fetches and displays existing todos', async () => {
    API.graphql.mockResolvedValueOnce({
      data: { listTodos: { items: [{ id: '1', name: 'first', description: 'desc' }] } },
    });

    render(<App signOut={jest.fn()} user={mockUser} />);

    expect(await screen.findByText('first')).toBeInTheDocument();
    expect(screen.getByText('desc')).toBeInTheDocument();
    expect(API.graphql).toHaveBeenCalledTimes(1);
  });

  test('creates a new todo', async () => {
    API.graphql.mockResolvedValueOnce({ data: { listTodos: { items: [] } } });

    render(<App signOut={jest.fn()} user={mockUser} />);

    userEvent.type(screen.getByPlaceholderText(/name/i), 'new todo');
    userEvent.type(screen.getByPlaceholderText(/description/i), 'new desc');

    API.graphql.mockResolvedValueOnce({
      data: { createTodo: { id: '2', name: 'new todo', description: 'new desc' } },
    });

    userEvent.click(screen.getByText(/create todo/i));

    await waitFor(() => expect(API.graphql).toHaveBeenCalledTimes(2));
    expect(screen.getByText('new todo')).toBeInTheDocument();
    expect(screen.getByText('new desc')).toBeInTheDocument();
  });
});
