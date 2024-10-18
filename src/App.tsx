import React, { useState } from 'react';
import { FileText, Upload, List, HelpCircle, Tag } from 'lucide-react';
import DocumentManager from './components/DocumentManager';
import DigitalizationAssistant from './components/DigitalizationAssistant';
import RecommendationEngine from './components/RecommendationEngine';
import ActionPlanner from './components/ActionPlanner';
import TextClassification from './components/TextClassification';

function App() {
  const [activeTab, setActiveTab] = useState('documents');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Asistente de Gestión Documental</h1>
      </header>
      <nav className="bg-blue-500 text-white">
        <ul className="flex">
          <li>
            <button
              className={`p-3 hover:bg-blue-700 ${activeTab === 'documents' ? 'bg-blue-700' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              <FileText className="inline-block mr-2" /> Documentos
            </button>
          </li>
          <li>
            <button
              className={`p-3 hover:bg-blue-700 ${activeTab === 'digitalization' ? 'bg-blue-700' : ''}`}
              onClick={() => setActiveTab('digitalization')}
            >
              <Upload className="inline-block mr-2" /> Digitalización y OCR
            </button>
          </li>
          <li>
            <button
              className={`p-3 hover:bg-blue-700 ${activeTab === 'classification' ? 'bg-blue-700' : ''}`}
              onClick={() => setActiveTab('classification')}
            >
              <Tag className="inline-block mr-2" /> Clasificación
            </button>
          </li>
          <li>
            <button
              className={`p-3 hover:bg-blue-700 ${activeTab === 'recommendations' ? 'bg-blue-700' : ''}`}
              onClick={() => setActiveTab('recommendations')}
            >
              <List className="inline-block mr-2" /> Recomendaciones
            </button>
          </li>
          <li>
            <button
              className={`p-3 hover:bg-blue-700 ${activeTab === 'actions' ? 'bg-blue-700' : ''}`}
              onClick={() => setActiveTab('actions')}
            >
              <HelpCircle className="inline-block mr-2" /> Acciones
            </button>
          </li>
        </ul>
      </nav>
      <main className="flex-grow p-4">
        {activeTab === 'documents' && <DocumentManager />}
        {activeTab === 'digitalization' && <DigitalizationAssistant />}
        {activeTab === 'classification' && <TextClassification />}
        {activeTab === 'recommendations' && <RecommendationEngine />}
        {activeTab === 'actions' && <ActionPlanner />}
      </main>
      <footer className="bg-gray-200 p-4 text-center text-sm text-gray-600">
        © 2024 Asistente de Gestión Documental. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default App;