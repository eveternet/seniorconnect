// Toast.jsx
export default function Toast({ message, onClose }) {
    if (!message) return null;
    return (
        <div className="animate-fade-in fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-blue-900 px-6 py-3 text-white shadow-lg">
            {message}
            <button
                className="ml-4 text-blue-200 hover:text-white"
                onClick={onClose}
            >
                ✕
            </button>
        </div>
    );
}
