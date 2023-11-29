import SearchIcon from '@mui/icons-material/Search';
import { Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { FaFilePdf } from 'react-icons/fa6';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { APIInstance } from '../../../config/APIInstance';
import Bibtex from '../../components/bibtex';
import Filter from '../../components/filter';
import { LoadingSpinner } from '../../components/loader';
import './styles.css';

const Home = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState({
        googleScholar: false,
        arxiv: false,
        ieee: false,
        springer: false,
    });
    const { arxiv, googleScholar, ieee, springer } = isLoading;
    const [search, setSearch] = useState('');
    const [pageNo, setPageNo] = useState(1);
    const [googleResult, setGoogleResult] = useState([]);
    const [ieeeResult, setIEEEResult] = useState([]);
    const [arxivResult, setArxivResult] = useState([]);
    const [springerResult, setSpringerResult] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const [error, setError] = useState({
        googleError: '',
        ieeeError: '',
        arxivError: '',
        springerError: '',
    });
    const { googleError, arxivError, ieeeError, springerError } = error;
    const [result, setResult] = useState({
        isGoogle: true,
        isArxiv: true,
        isIeee: true,
        isSpringer: true,
    });

    const { isGoogle, isArxiv, isIeee, isSpringer } = result;

    const [filter, setFilter] = useState({
        yearFrom: '',
        yearTo: '',
    });

    const [bibtexData, setBibtexData] = useState({
        isLoading: false,
        output: '',
        isOpen: false,
    });

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const googleSearch = async () => {
        setIsLoading((prev) => {
            return {
                ...prev,
                googleScholar: true,
            };
        });
        setGoogleResult([]);
        let googleArray = [];
        try {
            const resGoogle = await APIInstance.post('/google_scholar', {
                search,
                page_no: pageNo,
                from_year: filter.yearFrom === '' ? undefined : filter.yearFrom,
                to_year: filter.yearTo === '' ? undefined : filter.yearTo,
            });
            if (resGoogle.data.error) {
                setError((prev) => {
                    return {
                        ...prev,
                        googleError: resGoogle.data.error,
                    };
                });
                setIsLoading((prev) => {
                    return {
                        ...prev,
                        googleScholar: false,
                    };
                });
                return;
            }
            resGoogle.data.map((result) => {
                googleArray.push({
                    result_id: result.result_id,
                    title: result.title,
                    authors: result.publication_info.summary.split('-')[0],
                    summary: result.snippet,
                    resource: result.resources,
                    link: result.link,
                    date: result.publication_info.summary
                        .split('-')[1]
                        .substr(-6, 6),
                });
            });
            setGoogleResult(googleArray);
        } catch (error) {
            setIsLoading((prev) => {
                return {
                    ...prev,
                    googleScholar: false,
                };
            });
            console.log(error);
        }
    };

    const google_scholar_bibtex = async (result_id) => {
        try {
            const resBibtex = await APIInstance.post('/google_scholar_bibtex', {
                result_id: result_id,
            });
            if (resBibtex.data.error) {
                console.log(resBibtex.data.error);
                return;
            }
            window.open(resBibtex.data, '_blank');
            console.log(resBibtex.data);
        } catch (error) {
            console.log(error);
        }
    };

    const ieeeSearch = async () => {
        setIsLoading((prev) => {
            return {
                ...prev,
                ieee: true,
            };
        });
        try {
            const resIEEE = await APIInstance.post('/ieee', {
                search,
                page_no: pageNo,
            });
            if (resIEEE.data.error) {
                console.log(resIEEE.data.error);
                return;
            }
            let IEEEarray = [];
            resIEEE.data.map((result) => {
                console.log(result.doi);
                IEEEarray.push({
                    id: result.doi,
                    title: result.title,
                    authors: result.authors.authors,
                    summary: result.abstract,
                    pdf: result.pdf_url ? result.pdf_url : undefined,
                    html: result.html_url ? result.html_url : undefined,
                    date: result.publication_date,
                });
            });
            setIEEEResult(IEEEarray);
            setIsLoading((prev) => {
                return {
                    ...prev,
                    ieee: false,
                };
            });
        } catch (error) {
            setIsLoading((prev) => {
                return {
                    ...prev,
                    ieee: false,
                };
            });
            console.log(error);
        }
    };

    const springerSearch = async () => {
        setIsLoading((prev) => {
            return {
                ...prev,
                springer: true,
            };
        });
        try {
            const resSpringer = await APIInstance.post('/springer', {
                search,
                page_no: pageNo,
                from_year: filter.yearFrom === '' ? undefined : filter.yearFrom,
                to_year: filter.yearTo === '' ? undefined : filter.yearTo,
            });
            if (resSpringer.data.error) {
                console.log(resSpringer.data.error);
                return;
            }
            let springerArray = [];

            resSpringer.data.map((result) => {
                let editorNameArray = [];
                let editorName = [];

                result.bookEditors?.map((editor) => {
                    let name = '';
                    editorName = editor.bookEditor.split(',');
                    editorName.reverse();
                    editorName.map((temp) => {
                        name = name + ' ' + temp;
                    });

                    editorNameArray.push(name);
                });
                springerArray.push({
                    id: result.identifier,
                    title: result.publicationName,
                    publicationType: result.publicationType,
                    publisher: result.publisher,
                    summary: result.abstract,
                    resource: result.url.map((links) => {
                        if (links.format === 'html') {
                            return links.value;
                        } else return undefined;
                    }),
                    authors: editorNameArray,
                    date: result.onlineDate,
                    pdf: result.url.map((links) => {
                        if (links.format === 'pdf') return links.value;
                    }),
                });
            });
            setSpringerResult(springerArray);
            setIsLoading((prev) => {
                return {
                    ...prev,
                    springer: false,
                };
            });
        } catch (error) {
            console.log(error);
            setIsLoading((prev) => {
                return {
                    ...prev,
                    springer: false,
                };
            });
        }
    };

    const arxivSearch = async () => {
        setIsLoading((prev) => {
            return {
                ...prev,
                arxiv: true,
            };
        });
        try {
            const resArxiv = await APIInstance.post('/arxiv', {
                search,
                page_no: pageNo,
                from_year: filter.yearFrom === '' ? undefined : filter.yearFrom,
                to_year: filter.yearTo === '' ? undefined : filter.yearTo,
            });
            if (resArxiv.data.error) {
                console.log(resArxiv.data.error);
                return;
            }
            let arxivArray = [];

            resArxiv.data.map((result) => {
                arxivArray.push({
                    id: result.id[0],
                    title: result.title,
                    authors: result.author,
                    summary: result.summary,
                    resource: result.link,
                    date: result.published[0].split('-')[0],
                    pdf: result.link,
                });
            });
            setArxivResult(arxivArray);
            setIsLoading((prev) => {
                return {
                    ...prev,
                    arxiv: false,
                };
            });
        } catch (error) {
            console.log(error);
        }
    };

    const arxivBibtex = async (id) => {
        try {
            const { data } = await APIInstance.post('/arxiv_bibtex', {
                id,
            });
            setBibtexData((prev) => {
                return {
                    ...prev,
                    output: data,
                    isLoading: false,
                };
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

    const renderArxivAuthors = (authors) => {
        return (
            <div className="card-author">
                {authors.map((author, index) => {
                    return (
                        <span>
                            {index > 0
                                ? ', ' + author.name[0]
                                : '- ' + author.name[0]}
                        </span>
                    );
                })}
            </div>
        );
    };

    const renderGoogleAuthors = (authors) => {
        return (
            <div className="card-author">
                {authors.split(',').map((author, index) => {
                    return (
                        <span key={index}>
                            {index > 0 ? ' ,' + author : '-' + author}
                        </span>
                    );
                })}
            </div>
        );
    };

    const renderGoogleScholarCard = (details, index) => {
        return (
            <div className="my-card">
                <div className="my-card-header">
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={details.link}
                        className="card-title"
                    >
                        {index}. {details.title}
                    </a>
                    <div style={{ color: 'grey' }}>{details.date}</div>
                </div>
                <div className="my-card-subheading">
                    <div className="card-author">
                        - {renderGoogleAuthors(details.authors)}
                    </div>
                    <div>
                        {details.resource ? (
                            details.resource.map((links) => {
                                if (
                                    links.file_format === 'PDF' ||
                                    links.title === 'Full View'
                                )
                                    return (
                                        <Link
                                            target="_blank"
                                            rel="noreferrer"
                                            href={links.link}
                                        >
                                            <FaFilePdf className="pdf-icon" />
                                        </Link>
                                    );
                            })
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div>{details.summary}</div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-max mt-4"
                    onClick={() => {
                        google_scholar_bibtex(details.result_id);
                    }}
                >
                    Generate BibTeX
                </button>
            </div>
        );
    };

    const renderAllGoogleResults = () => {
        return (
            <div>
                <div className="heading-sites">
                    Results from Google Scholar ({googleResult.length} results)
                </div>
                {googleResult.map((result, index) => {
                    return (
                        <div>{renderGoogleScholarCard(result, index + 1)}</div>
                    );
                })}
            </div>
        );
    };

    const renderArxivCard = (details, index) => {
        const pdf = details.resource.map((link) => {
            if (link.$.type === 'application/pdf') {
                return link.$.href;
            }
        });
        const html = details.resource.map((link) => {
            if (link.$.type === 'text/html') {
                return link.$.href;
            }
        });
        return (
            <div className="my-card">
                <div className="my-card-header">
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={html[0]}
                        className="card-title"
                    >
                        {index + 1}. {details.title}
                    </a>
                    <div style={{ color: 'grey' }}>{details.date}</div>
                </div>
                <div className="my-card-subheading">
                    <div className="card-author">
                        {details.authors.length > 0 ? (
                            renderArxivAuthors(details.authors)
                        ) : (
                            <></>
                        )}
                    </div>
                    <div>
                        <Link target="_blank" rel="noreferrer" href={pdf[1]}>
                            <FaFilePdf className="pdf-icon" />
                        </Link>
                    </div>
                </div>
                <div>{details.summary}</div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-max mt-4"
                    onClick={() => {
                        setBibtexData((prev) => {
                            return {
                                ...prev,
                                isOpen: true,
                                isLoading: true,
                            };
                        });
                        arxivBibtex(details.id);
                    }}
                >
                    Generate BibTeX
                </button>
            </div>
        );
    };

    const renderIEEECard = (details, index) => {
        return (
            <>
                <div className="my-card">
                    <div className="my-card-header">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={details.html}
                            className="card-title"
                        >
                            {index + 1}. {details.title}
                        </a>
                        <div style={{ color: 'grey' }}>{details.date}</div>
                    </div>
                    <div className="my-card-subheading">
                        <div className="card-author">
                            {details.authors.length > 0 ? (
                                <div className="card-author">
                                    {details.authors.map((author, index) => {
                                        return (
                                            <span>
                                                {index > 0
                                                    ? ', ' + author.full_name
                                                    : '- ' + author.full_name}
                                            </span>
                                        );
                                    })}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div>
                            <Link
                                target="_blank"
                                rel="noreferrer"
                                href={details.pdf}
                            >
                                <FaFilePdf className="pdf-icon" />
                            </Link>
                        </div>
                    </div>
                    <div>{details.summary}</div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-max mt-4"
                        onClick={() => {
                            setBibtexData((prev) => {
                                return {
                                    ...prev,
                                    isOpen: true,
                                    isLoading: true,
                                };
                            });
                            arxivBibtex(details.id);
                        }}
                    >
                        Generate BibTeX
                    </button>
                </div>
            </>
        );
    };

    const renderAllIEEEResults = () => {
        return (
            <div>
                <div className="heading-sites">
                    Results from IEEE ({ieeeResult.length} results)
                </div>
                {ieeeResult.map((result, index) => {
                    return renderIEEECard(result, index);
                })}
            </div>
        );
    };

    const renderSpringerAuthors = (prop) => {
        return (
            <div className="card-authors">
                {prop.map((author, index) => {
                    return (
                        <span>{index > 0 ? ' ,' + author : '- ' + author}</span>
                    );
                })}
            </div>
        );
    };
    const renderSpringerCard = (details, index) => {
        return (
            <div className="my-card">
                <div className="my-card-header">
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={details.resource[0]}
                        className="card-title"
                    >
                        {index + 1}. {details.title}
                    </a>
                    <div style={{ color: 'grey' }}>
                        {details.date.split('-')[0]}
                    </div>
                </div>
                <div className="my-card-subheading">
                    <div className="card-author">
                        {details.authors.length > 0 ? (
                            renderSpringerAuthors(details.authors)
                        ) : (
                            <></>
                        )}
                    </div>
                    <div>
                        <Link
                            target="_blank"
                            rel="noreferrer"
                            href={details.pdf[1]}
                        >
                            <FaFilePdf className="pdf-icon" />
                        </Link>
                    </div>
                </div>
                <div>{details.summary}</div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-max mt-4"
                    onClick={() => {
                        setBibtexData((prev) => {
                            return {
                                ...prev,
                                isOpen: true,
                                isLoading: true,
                            };
                        });
                        arxivBibtex(details.id.substring(4));
                    }}
                >
                    Generate BibTeX
                </button>
            </div>
        );
    };

    const renderAllSpringerResults = () => {
        return (
            <div>
                <div className="heading-sites">
                    Results from Springer ({springerResult.length} results)
                </div>
                {springerResult.map((result, index) => {
                    return renderSpringerCard(result, index);
                })}
            </div>
        );
    };
    const renderAllArxivResults = () => {
        return (
            <div>
                <div className="heading-sites">
                    Results from Arxiv ({arxivResult.length} results)
                </div>
                {arxivResult.map((result, index) => {
                    return renderArxivCard(result, index);
                })}
            </div>
        );
    };

    const handleSearch = async () => {
        if (search === '') return;
        setIsSearched(true);
        setIsLoading((prev) => {
            return {
                ...prev,
                googleScholar: true,
                arxiv: true,
                ieee: true,
                springer: true,
            };
        });
        if (filter.yearFrom !== '' && filter.yearTo !== '') {
            if (filter.yearFrom > filter.yearTo) {
                setErrorMessage('Invalid year range');
                setIsLoading(false);
                return;
            }
        }

        fetch('https://reqres.in/api/users?page=0')
            .then((respose) => respose.json())
            .then(async (respose) => {
                await ieeeSearch();
                await googleSearch();
                await springerSearch();
                await arxivSearch();
                setIsLoading(false);
                setSearch('');
            })
            .catch(() => {
                setErrorMessage('Unable to fetch user list');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        handleSearch();
    }, [pageNo]);

    useEffect(() => {
        setError((prev) => {
            return {
                arxivError: '',
                googleError: '',
                ieeeError: '',
                springerError: '',
            };
        });
    }, []);

    return (
        <>
            <div className="header__search">
                <input
                    className="header__searchInput"
                    type="text"
                    placeholder="Type name of research paper"
                    value={search}
                    onChange={handleChange}
                />
                <button className="hover:scale-110" onClick={handleSearch}>
                    <SearchIcon />
                </button>
            </div>
            <div className="w-screen flex justify-center">
                <Filter
                    result={result}
                    setResult={setResult}
                    yearFrom={filter.yearFrom}
                    yearTo={filter.yearTo}
                    setFilter={setFilter}
                    handleSearch={handleSearch}
                />
            </div>
            <div>
                {googleScholar ? (
                    <LoadingSpinner />
                ) : (
                    isGoogle && renderAllGoogleResults()
                )}
                {springer ? (
                    <LoadingSpinner />
                ) : (
                    isSpringer && renderAllSpringerResults()
                )}
                {arxiv ? (
                    <LoadingSpinner />
                ) : (
                    isArxiv && renderAllArxivResults()
                )}
                {ieee ? <LoadingSpinner /> : isIeee && renderAllIEEEResults()}
            </div>
            {springerError && <div>{springerError}</div>}
            {googleError && <div>{googleError}</div>}
            {arxivError && <div>{arxivError}</div>}
            {ieeeError && <div>{ieeeError}</div>}
            {isSearched && (
                <div className="navigation">
                    {pageNo > 1 ? (
                        <FcPrevious
                            className="previous-button"
                            onClick={() => {
                                setPageNo((prev) => {
                                    return --prev;
                                });

                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth',
                                });
                            }}
                        />
                    ) : (
                        <></>
                    )}
                    Page : {pageNo}
                    <FcNext
                        className="next-button"
                        onClick={() => {
                            setPageNo((prev) => {
                                return ++prev;
                            });
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: 'smooth',
                            });
                        }}
                    />
                </div>
            )}
            {bibtexData.isOpen ? (
                <Bibtex
                    setBibtexData={setBibtexData}
                    output={bibtexData.output}
                    isLoading={bibtexData.isLoading}
                />
            ) : null}
        </>
    );
};
export default Home;
