import React, { useState } from 'react';
import { Upload, CheckCircle, FileText, AlertCircle } from 'lucide-react';
import { createWorker } from 'tesseract.js';

const DigitalizationAssistant: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [ocrResults, setOcrResults] = useState<Array<{ name: string; text: string; error?: string }>>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const imageFiles = Array.from(event.target.files).filter(file => file.type.startsWith('image/'));
      setFiles(imageFiles);
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    const results: Array<{ name: string; text: string; error?: string }> = [];

    for (const file of files) {
      const worker = await createWorker('spa');
      try {
        const { data: { text } } = await worker.recognize(file);
        results.push({ name: file.name, text });
      } catch (error) {
        console.error(`Error processing ${file.name}:`, error);
        results.push({ name: file.name, text: '', error: 'Error al procesar el archivo' });
      } finally {
        await worker.terminate();
      }
    }

    setOcrResults(results);
    setUploading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Asistente de Digitalización y OCR</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selecciona las imágenes a digitalizar y procesar con OCR
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      {files.length > 0 && (
        <ul className="mb-4 space-y-2">
          {files.map((file, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" size={16} />
              {file.name}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handleUpload}
        disabled={files.length === 0 || uploading}
        className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center mb-4`}
      >
        {uploading ? (
          <>
            <Upload className="animate-spin mr-2" size={20} />
            Procesando...
          </>
        ) : (
          <>
            <Upload className="mr-2" size={20} />
            Digitalizar y Procesar OCR
          </>
        )}
      </button>
      {ocrResults.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Resultados del OCR:</h3>
          <ul className="space-y-2">
            {ocrResults.map((result, index) => (
              <li key={index} className="bg-gray-50 p-2 rounded flex items-start">
                {result.error ? (
                  <AlertCircle className="text-red-500 mr-2 mt-1" size={16} />
                ) : (
                  <FileText className="text-blue-500 mr-2 mt-1" size={16} />
                )}
                <div>
                  <span className="font-semibold">{result.name}: </span>
                  {result.error ? (
                    <span className="text-red-500">{result.error}</span>
                  ) : (
                    <span className="text-sm">{result.text}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DigitalizationAssistant;