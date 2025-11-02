import { useState } from 'react';
import { useStore } from './store';

const ResultModal = ({ isOpen, onClose, result, error }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 border border-white/10">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">
                        {error ? 'Error' : 'Pipeline Analysis Results'}
                    </h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>
                
                {error ? (
                    <div className="text-red-400">
                        <p className="mb-2">Failed to analyze pipeline:</p>
                        <p className="text-sm bg-red-900/20 p-3 rounded border border-red-500/20">
                            {error}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-700/50 p-3 rounded">
                                <div className="text-sm text-gray-400">Nodes</div>
                                <div className="text-xl font-bold text-white">{result?.num_nodes}</div>
                            </div>
                            <div className="bg-slate-700/50 p-3 rounded">
                                <div className="text-sm text-gray-400">Edges</div>
                                <div className="text-xl font-bold text-white">{result?.num_edges}</div>
                            </div>
                        </div>
                        
                        <div className={`p-4 rounded-lg border ${
                            result?.is_dag 
                                ? 'bg-green-900/20 border-green-500/20 text-green-400' 
                                : 'bg-red-900/20 border-red-500/20 text-red-400'
                        }`}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">
                                    {result?.is_dag ? '✓' : '✗'}
                                </span>
                                <span className="font-semibold">
                                    {result?.is_dag ? 'Valid DAG' : 'Invalid DAG'}
                                </span>
                            </div>
                            <p className="text-sm">
                                {result?.is_dag 
                                    ? 'Your pipeline forms a valid Directed Acyclic Graph and can be executed safely.'
                                    : 'Your pipeline contains cycles or invalid connections that prevent execution.'
                                }
                            </p>
                        </div>
                    </div>
                )}
                
                <div className="flex justify-end mt-6">
                    <button 
                        onClick={onClose}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export const SubmitButton = () => {
    const nodes = useStore(state => state.nodes);
    const edges = useStore(state => state.edges);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const pipelineData = {
                nodes: nodes,
                edges: edges
            };

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setResult(result);
            setShowModal(true);

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setError(error.message);
            setShowModal(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex justify-end p-3">
                <button 
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-lg font-bold shadow-md hover:from-purple-700 hover:to-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Analyzing...' : 'Submit Pipeline'}
                </button>
            </div>
            
            <ResultModal 
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                result={result}
                error={error}
            />
        </>
    );
}
