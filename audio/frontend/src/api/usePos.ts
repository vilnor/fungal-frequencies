const ENDPOINT = `${process.env.REACT_APP_API_URL}/api/pos`;


export default function usePostPos() {
    const postPos = async (srcList: { src: string, pos: { x: number, y: number } }[]) => {
        const res = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ srcList }),
        });
    };

    return { postPos };
}