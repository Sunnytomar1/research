import { useEffect, useState } from 'react';
import { APIInstance } from '../../../config/APIInstance';

const Bibtex = ({
    setBibtexData,
    output,
    isLoading,
    bibtexResult,
    ieeeResult,
    arxivResult,
    springerResult,
}) => {
    const [springerBibtex, setSpringerBibtex] = useState([]);
    const [ieeeBibtex, setIeeeBibtex] = useState([]);
    const [arxivBibtex, setArxivBibtex] = useState([]);
    const close = () => {
        setBibtexData((prev) => {
            return {
                ...prev,
                isOpen: false,
            };
        });
        setArxivBibtex([]);
        setIeeeBibtex([]);
        setSpringerBibtex([]);
    };

    const generateSpringerBibtex = async (id) => {
        try {
            const { data } = await APIInstance.post('/arxiv_bibtex', {
                id,
            });
            setSpringerBibtex((prev) => {
                return [...prev, data];
            });
        } catch (err) {
            console.log(err);
            setBibtexData((prev) => {
                return {
                    ...prev,
                    output: 'Error',
                    isLoading: false,
                };
            });
        }
    };
    const generateIeeeBibtex = async (id) => {
        try {
            const { data } = await APIInstance.post('/arxiv_bibtex', {
                id,
            });
            setIeeeBibtex((prev) => {
                return [...prev, data];
            });
        } catch (err) {
            console.log(err);
            setBibtexData((prev) => {
                return {
                    ...prev,
                    output: 'Error',
                    isLoading: false,
                };
            });
        }
    };
    const generateArxivBibtex = async (id) => {
        try {
            const { data } = await APIInstance.post('/arxiv_bibtex', {
                id,
            });
            setArxivBibtex((prev) => {
                return [...prev, data];
            });
        } catch (err) {
            console.log(err);
            setBibtexData((prev) => {
                return {
                    ...prev,
                    output: 'Error',
                    isLoading: false,
                };
            });
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        // window.scrollTo(0, 0);
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    useEffect(() => {
        if (bibtexResult.springer.isSelected) {
            springerResult.forEach((result) => {
                generateSpringerBibtex(result.id.substring(4));
            });
        }
    }, [bibtexResult.springer.isSelected]);

    useEffect(() => {
        if (bibtexResult.ieee.isSelected) {
            ieeeResult.forEach((result) => {
                generateIeeeBibtex(result.id);
            });
        }
    }, [bibtexResult.ieee.isSelected]);
    useEffect(() => {
        if (bibtexResult.arxiv.isSelected) {
            arxivResult.forEach((result) => {
                generateArxivBibtex(result.id);
            });
        }
    }, [bibtexResult.arxiv.isSelected]);

    return (
        <div className="fixed top-0 w-screen h-screen text-left bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-x-hidden overflow-y-hidden">
            <div
                className="absolute top-10 right-10 text-white text-2xl cursor-pointer"
                onClick={close}
            >
                X
            </div>
            <div className="bg-white p-4 rounded-lg h-[90vh] overflow-x-scroll">
                {isLoading ? (
                    <>
                        <div>Loading...</div>
                    </>
                ) : output !== 'Error' ? (
                    <>
                        {bibtexResult.springer.isSelected && (
                            <>
                                <div className="text-2xl">Springer</div>
                                {springerBibtex.length === 0 ? (
                                    <div>Loading...</div>
                                ) : (
                                    <div>
                                        {springerBibtex.map((bibtex, index) => {
                                            if (index > 9) return null;
                                            return (
                                                <div
                                                    className="border-2 border-black p-2 my-2"
                                                    key={index}
                                                >
                                                    {bibtex.output
                                                        .split('\n')
                                                        .map((line, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                >
                                                                    {line}
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        )}
                        {bibtexResult.ieee.isSelected && (
                            <>
                                <div className="text-2xl">IEEE</div>
                                {ieeeBibtex.length === 0 ? (
                                    <div>Loading...</div>
                                ) : (
                                    <div>
                                        {ieeeBibtex.map((bibtex, index) => {
                                            if (index > 9) return null;
                                            return (
                                                <div
                                                    className="border-2 border-black p-2 my-2"
                                                    key={index}
                                                >
                                                    {bibtex.output
                                                        .split('\n')
                                                        .map((line, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                >
                                                                    {line}
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        )}
                        {bibtexResult.arxiv.isSelected && (
                            <>
                                <div className="text-2xl">ArXiv</div>
                                {arxivBibtex.length === 0 ? (
                                    <div>Loading...</div>
                                ) : (
                                    <div>
                                        {arxivBibtex.map((bibtex, index) => {
                                            if (index > 9) return null;
                                            return (
                                                <div
                                                    className="border-2 border-black p-2 my-2"
                                                    key={index}
                                                >
                                                    {bibtex.output
                                                        .split('\n')
                                                        .map((line, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                >
                                                                    {line}
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <div>Server Error</div>
                )}
            </div>
        </div>
    );
};

export default Bibtex;
