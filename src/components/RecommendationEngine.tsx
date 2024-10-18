import React, { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  description: string;
}

const RecommendationEngine: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    // Simular la obtención de recomendaciones de un API
    const fetchRecommendations = async () => {
      // En un escenario real, esto sería una llamada a un API
      const mockRecommendations: Recommendation[] = [
        {
          id: '1',
          title: 'Implementar un sistema de etiquetado',
          description: 'Utilizar etiquetas para categorizar documentos mejorará la organización y búsqueda.',
        },
        {
          id: '2',
          title: 'Actualizar la política de retención de documentos',
          description: 'Revisar y actualizar las políticas para cumplir con las regulaciones actuales.',
        },
        {
          id: '3',
          title: 'Capacitación en seguridad de la información',
          description: 'Organizar sesiones de formación para mejorar la seguridad en el manejo de documentos.',
        },
      ];
      setRecommendations(mockRecommendations);
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Recomendaciones</h2>
      <ul className="space-y-4">
        {recommendations.map((rec) => (
          <li key={rec.id} className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Lightbulb className="text-yellow-500 mr-2" size={24} />
              <h3 className="text-lg font-semibold">{rec.title}</h3>
            </div>
            <p className="text-gray-600">{rec.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationEngine;