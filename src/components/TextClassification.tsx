import React, { useState } from 'react';
import { Tag, Send } from 'lucide-react';

const TextClassification: React.FC = () => {
  const [text, setText] = useState('');
  const [classification, setClassification] = useState<string | null>(null);

  const handleClassify = async () => {
    // Simular proceso de clasificación
    setClassification(null);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const categories = ['Finanzas', 'RRHH', 'Ventas', 'Legal', 'Tecnología'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    setClassification(randomCategory);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Clasificación de Textos</h2>
      <div className="mb-4">
        <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
          Ingrese el texto a clasificar:
        </label>
        <textarea
          id="text-input"
          rows={5}
          className="w-full p-2 border rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ingrese el texto aquí..."
        />
      </div>
      <button
        onClick={handleClassify}
        disabled={!text.trim()}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center mb-4"
      >
        <Send className="mr-2" size={20} />
        Clasificar Texto
      </button>
      {classification && (
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Tag className="text-blue-500 mr-2" size={20} />
            Clasificación:
          </h3>
          <p className="text-blue-700">{classification}</p>
        </div>
      )}
    </div>
  );
};

export default TextClassification;