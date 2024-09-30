const ENDPOINT = `${process.env.REACT_APP_API_URL}/api/rot`;


export default function usePostRot() {
    const postRot = async (rotation: number) => {
        const res = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rotation }),
        });
    };

    return { postRot };
}