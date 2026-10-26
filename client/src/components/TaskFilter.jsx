function TaskFilter({ activeStatus, onSelectStatus }) {
  const filters = [
    { label: 'Всі', value: '' },
    { label: 'To Do', value: 'todo' },
    { label: 'In Progress', value: 'in progress' },
    { label: 'Done', value: 'done' },
  ];

  return (
    <div className="flex gap-2">
      {filters.map((filter) => {
        const isActive = activeStatus === filter.value;
        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onSelectStatus(filter.value)}
            className={`px-2.5 py-1 text-xs border rounded ${
              isActive
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

export default TaskFilter;
