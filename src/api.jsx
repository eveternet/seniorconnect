// api.jsx (or wherever you define your API_BASE_URL constant)

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function handleScroll(scrollID) {
    const element = document.getElementById(scrollID);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
}

export function truncate(str, n) {
    return str.length > n ? str.slice(0, n) + "..." : str;
}

export * from "./apis/interest";
export * from "./apis/auth";
