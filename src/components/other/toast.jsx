import { useEffect, useState } from "react";

export default function Toast({ message, onClose, duration = 2000 }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const hideTimeout = setTimeout(() => setVisible(false), duration);
            return () => clearTimeout(hideTimeout);
        } else {
            setVisible(false);
        }
    }, [message, duration]);

    // When fade-out ends, call onClose to remove the toast from parent
    const handleAnimationEnd = () => {
        if (!visible && message) {
            onClose();
        }
    };

    if (!message && !visible) return null;

    return (
        <div
            className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-blue-900 px-6 py-3 text-white shadow-lg transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} `}
            style={{ pointerEvents: "auto" }}
            onTransitionEnd={handleAnimationEnd}
        >
            {message}
            <button
                className="ml-4 text-blue-200 hover:text-white"
                onClick={() => setVisible(false)}
            >
                ✕
            </button>
        </div>
    );
}
