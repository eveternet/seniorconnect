import { useEffect, useState } from "react";

export default function Toast({ message, onClose, duration = 2000 }) {
    const [visible, setVisible] = useState(false);
    const [internalMessage, setInternalMessage] = useState("");

    // When message changes, show toast with fade-in
    useEffect(() => {
        if (message) {
            setInternalMessage(message);
            setVisible(false); // Start hidden
            // Next tick, show (fade in)
            setTimeout(() => setVisible(true), 10);
            // Hide after duration
            const hideTimeout = setTimeout(() => setVisible(false), duration);
            return () => clearTimeout(hideTimeout);
        }
    }, [message, duration]);

    // When fade-out ends, call onClose to remove the toast from parent
    const handleTransitionEnd = () => {
        if (!visible) {
            setInternalMessage("");
            onClose();
        }
    };

    if (!internalMessage) return null;

    return (
        <div
            className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-blue-900 px-6 py-3 text-white shadow-lg transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} `}
            style={{ pointerEvents: "auto" }}
            onTransitionEnd={handleTransitionEnd}
        >
            {internalMessage}
            <button
                className="ml-4 text-blue-200 hover:text-white"
                onClick={() => setVisible(false)}
            >
                ✕
            </button>
        </div>
    );
}
