import React, { useState } from 'react';
import { File, Folder, Search, Plus, Tag } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  lastModified: string;
  tags: string[];
}

const DocumentManager: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Informe Anual 2023', type: 'pdf', lastModified: '2024-03-15', tags: ['Finanzas', 'Anual'] },
    { id: '2', name: 'Contratos Empleados', type: 'folder', lastModified: '2024-02-28', tags: ['RRHH'] },
    { id: '3', name: 'Factura Cliente XYZ', type: 'docx', lastModified: '2024-03-10', tags: ['Ventas', 'Facturación'] },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(new Set(documents.flatMap(doc => doc.tags)));

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedTags.length === 0 || selectedTags.every(tag => doc.tags.includes(tag)))
  );

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Gestor de Documentos</h2>
      <div className="flex mb-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Buscar documentos..."
            className="w-full p-2 pl-10 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <button className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          <Plus size={20} />
        </button>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Filtrar por etiquetas:</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-2 py-1 rounded ${
                selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <ul className="space-y-2">
        {filteredDocuments.map(doc => (
          <li key={doc.id} className="flex items-center p-2 hover:bg-gray-100 rounded">
            {doc.type === 'folder' ? (
              <Folder className="text-yellow-500 mr-2" size={20} />
            ) : (
              <File className="text-blue-500 mr-2" size={20} />
            )}
            <span>{doc.name}</span>
            <span className="ml-auto text-sm text-gray-500">{doc.lastModified}</span>
            <div className="ml-2 flex">
              {doc.tags.map(tag => (
                <Tag key={tag} className="text-blue-500 ml-1" size={16} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentManager;