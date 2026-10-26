import { useState } from 'react';
import TaskFilter from '../components/TaskFilter';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { useTasks } from '../hooks/useTasks';

function TasksPage() {
  const [filterStatus, setFilterStatus] = useState('');
  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useTasks(filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Мої завдання</h1>
          <p>Керування персональними завданнями та їх статусами</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 border border-slate-200">
          Всього: {tasks.length}
        </span>
      </div>

      <TaskForm />

      <TaskFilter
        activeStatus={filterStatus}
        onSelectStatus={setFilterStatus}
      />

      {isLoading && (
        <div className="text-center">Завантаження списку завдань...</div>
      )}

      {isError && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700">
          {error?.response?.data?.message ||
            'Не вдалося завантажити завдання. Спробуйте пізніше.'}
        </div>
      )}

      {!isLoading && !isError && tasks.length === 0 && (
        <div className="text-center py-12">Завдань не знайдено</div>
      )}

      <div className="grid  md:grid-cols-2 gap-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TasksPage;
