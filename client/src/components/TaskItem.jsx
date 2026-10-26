import { useState } from 'react';
import { useDeleteTask, useUpdateTask } from '../hooks/useTasks';

function TaskItem({ task }) {
  const { mutate: update, isPending: isUpdating } = useUpdateTask();
  const { mutate: remove, isPending: isDeleting } = useDeleteTask();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  const handleStatusChange = (e) => {
    update({ id: task.id, status: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    update(
      {
        id: task.id,
        title: title.trim(),
        description: description.trim() || null,
      },
      {
        onSuccess: () => setIsEditing(false),
      },
    );
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form
        onSubmit={handleSave}
        className="bg-white border border-gray-400 p-3 space-y-2"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Назва завдання *"
          className="w-full border border-gray-300 p-1.5 text-sm focus:outline-none focus:border-gray-900"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Опис"
          rows="2"
          className="w-full border border-gray-300 p-1.5 text-xs focus:outline-none focus:border-gray-900 resize-none"
        />

        <div className="flex justify-end gap-2 text-xs pt-1">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isUpdating}
            className="px-2 py-1 text-gray-600 hover:underline"
          >
            Скасувати
          </button>
          <button
            type="submit"
            disabled={isUpdating || !title.trim()}
            className="bg-gray-900 text-white px-3 py-1 hover:bg-gray-800 disabled:opacity-50"
          >
            {isUpdating ? '...' : 'Зберегти'}
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="bg-white border border-gray-200 p-3 flex flex-col justify-between gap-3">
      <div>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className={`text-sm font-medium ${
              task.status === 'done'
                ? 'line-through text-gray-400'
                : 'text-gray-900'
            }`}
          >
            {task.title}
          </h3>
          <span className="text-[11px] px-1.5 py-0.5 border border-gray-300 text-gray-600">
            {task.status}
          </span>
        </div>

        {task.description && (
          <p className="text-xs text-gray-500 whitespace-pre-wrap">
            {task.description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100 text-xs">
        <select
          value={task.status}
          disabled={isUpdating}
          onChange={handleStatusChange}
          className="border border-gray-300 p-1 bg-white cursor-pointer"
        >
          <option value="todo">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-gray-600 hover:text-gray-900"
          >
            Редагувати
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={() => remove(task.id)}
            className="text-red-600 hover:underline disabled:opacity-50"
          >
            {isDeleting ? '...' : 'Видалити'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
