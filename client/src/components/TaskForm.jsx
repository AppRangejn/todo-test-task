import { useState } from 'react';
import { useCreateTask } from '../hooks/useTasks';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [error, setError] = useState('');

  const { mutate: create, isPending } = useCreateTask();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Введіть назву завдання');
      return;
    }

    create(
      { title: title.trim(), description: description.trim() || null, status },
      {
        onSuccess: () => {
          setTitle('');
          setDescription('');
          setStatus('todo');
          setError('');
        },
        onError: (err) => {
          setError(
            err.response?.data?.message || 'Не вдалося створити завдання',
          );
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 p-4 space-y-3"
    >
      <h2 className="text-sm font-bold">Створити завдання</h2>

      {error && (
        <div className="p-2 bg-red-50 border border-red-200 text-red-600 text-xs">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Назва завдання *"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError('');
        }}
        className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:border-gray-900"
      />

      <textarea
        placeholder="Опис завдання (необов'язково)"
        rows="2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:border-gray-900 resize-none"
      />

      <div className="flex justify-between items-center pt-1">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 p-1.5 text-xs bg-white"
        >
          <option value="todo">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          type="submit"
          disabled={isPending}
          className="bg-gray-900 text-white text-xs px-3 py-1.5 hover:bg-gray-800 disabled:opacity-50"
        >
          {isPending ? 'Створення...' : 'Додати завдання'}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
