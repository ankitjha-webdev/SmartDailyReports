import React, { useState } from "react";
import Markdown from 'markdown-to-jsx'

export function Report() {
    const [output, setOutput] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasError, setHasError] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (!text.trim()) {
                setHasError(true);
                setError('Oops! Looks like you forgot to fill the text field.')
                return;
            }
            setError('');
            setLoading(true);
            //  http://localhost:5000/api/v1/generate-report
            // https://api.ankitkumarjha.dev/api/v1/generate-report
            const response = await fetch(' http://localhost:5000/api/v1/generate-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });
            const data = await response.json();
            const markdownText = data.data.text;
            setOutput(markdownText);
            setLoading(false);
            setText('');
        } catch (error: any) {
            setHasError(false);
            setError("Oops! Something went wrong. Please try again.");
            setLoading(false);
            setText('');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md extension-feature">
            <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold text-gray-800">Smart Daily Reports</h2>
                <p className="text-gray-600">Ready to elevate your daily insights? Share your task below and let our smart extension do the rest.</p>
                <a href="https://github.com/ankitjha-webdev/SmartDailyReports?tab=readme-ov-file#smart-daily-reports" target="_blank" rel="noreferrer" title="Click to know more"><span className="text-red-400 hover:text-blue-600">Still under Development</span></a>
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <textarea value={text} onChange={(e) => {
                        setError('');
                        return setText(e.target.value);
                    }} className={`block w-full h-24 p-2 mt-1 border-2 border-gray-300 rounded-md form-textarea`} placeholder="Share your polished or incomplete sentense"></textarea>
                    {error && <span className="text-red-600">{error}</span>}
                    <div className="flex items-center justify-center">
                        <button type="submit" className={`flex justify-center items-center w-full shadow px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-800 transition ease-in-out duration-150 ${loading ? 'cursor-not-allowed opacity-50' : ''}`} disabled={loading}>
                            {loading ? (
                                <>
                                    <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <span>Generate</span>
                            )}
                        </button>
                    </div>
                </form>
                {output && <div id="outputSection" className="p-4 mt-4 text-justify text-gray-800 bg-gray-200 rounded-md">
                    <span className="mb-4 text-red-600">Please ensure you read the content thoroughly before proceeding.</span>
                    <div className="overflow-auto">
                        {output}
                    </div>
                </div>}
            </div>
        </div>
    );
}
