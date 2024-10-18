import React, { useState } from 'react';
import { CheckSquare, PlusCircle } from 'lucide-react';

interface Action {
  id: string;
  description: string;
  completed: boolean;
}

const ActionPlanner: React.FC = () => {
  const [actions, setActions] = useState<Action[]>([
    { id: '1', description: 'Revisar y actualizar la política de privacidad', completed: false },
    { id: '2', description: 'Implementar sistema de respaldo automático', completed: true },
    { id: '3', description: 'Organizar sesión de formación sobre nuevas herramientas', completed: false },
  ]);

  const [newAction, setNewAction] = useState('');

  const handleAddAction = () => {
    if (newAction.trim()) {
      setActions([...actions, { id: Date.now().toString(), description: newAction, completed: false }]);
      setNewAction('');
    }
  };

  const toggleAction = (id: string) => {
    setActions(actions.map(action =>
      action.id === id ? { ...action, completed: !action.completed } : action
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Planificador de Acciones</h2>
      <div className="mb-4 flex">
        <input
          type="text"
          value={newAction}
          onChange={(e) => setNewAction(e.target.value)}
          placeholder="Nueva acción..."
          className="flex-grow p-2 border rounded-l"
        />
        <button
          onClick={handleAddAction}
          className="bg-green-500 text-white p-2 rounded-r hover:bg-green-600"
        >
          <PlusCircle size={24} />
        </button>
      </div>
      <ul className="space-y-2">
        {actions.map(action => (
          <li key={action.id} className="flex items-center p-2 bg-gray-50 rounded">
            <button
              onClick={() => toggleAction(action.id)}
              className={`mr-2 p-1 rounded ${action.completed ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
              <CheckSquare size={20} />
            </button>
            <span className={action.completed ? 'line-through text-gray-500' : ''}>
              {action.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionPlanner;