import { useEffect } from 'react';

const description = document.querySelector('meta[name="description"]');
const defaultDescription = description?.getAttribute('content') ?? '';

// Sets the tab title and the description search engines show for the current page
export default function usePageMeta(title, text = defaultDescription) {
    useEffect(() => {
        document.title = title;
        description?.setAttribute('content', text);
    }, [title, text]);
}
