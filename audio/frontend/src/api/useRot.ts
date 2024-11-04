const ENDPOINT = `${process.env.REACT_APP_API_URL}/api/rot`;

// This function is a custom hook that sends the rotation of the user node to the backend.
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