import { useEffect } from 'react';

const Bibtex = ({ setBibtexData, output, isLoading }) => {
    const close = () => {
        setBibtexData((prev) => {
            return {
                ...prev,
                isOpen: false,
            };
        });
    };
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    return (
        <div className="absolute top-0 w-screen h-screen text-left bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-x-hidden overflow-y-hidden">
            <div
                className="absolute top-10 right-10 text-white text-2xl cursor-pointer"
                onClick={close}
            >
                X
            </div>
            <div className="bg-white p-4 rounded-lg">
                {isLoading ? (
                    <div>Loading...</div>
                ) : output !== 'Error' ? (
                    output.output.split('\n').map((line) => {
                        return <div>{line}</div>;
                    })
                ) : (
                    <div>Server Error</div>
                )}
            </div>
        </div>
    );
};

export default Bibtex;
