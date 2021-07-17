import { async } from "regenerator-runtime";

export const AJAX = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message} (${res.status})`);
        };

        return data;

    } catch (err) {
        throw err;
    };
};