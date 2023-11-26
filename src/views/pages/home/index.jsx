import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { APIInstance } from "../../../config/APIInstance";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import { FaFilePdf } from "react-icons/fa6";
import "./styles.css";
import { Link } from "@mui/material";

const Home = () => {
  const [search, setSearch] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [googleResult, setGoogleResult] = useState([]);
  const [ieeeResult, setIEEEResult] = useState([]);
  const [arxivResult, setArxivResult] = useState([]);
  const [springerResult, setSpringerResult] = useState([]);
  const [error, setError] = useState({
    googleError: "",
    ieeeError: "",
    arxivError: "",
    springerError: "",
  });
  const { googleError, arxivError, ieeeError, springerError } = error;

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const googleSearch = async () => {
    setGoogleResult([]);
    let googleArray = [];
    try {
      const resGoogle = await APIInstance.post("/google_scholar", {
        search,
        page_no: pageNo,
      });
      if (resGoogle.data.error) {
        console.log(resGoogle.data.error);
        setError((prev) => {
          return {
            ...prev,
            googleError: resGoogle.data.error,
          };
        });
        return;
      }
      resGoogle.data.map((result) => {
        googleArray.push({
          title: result.title,
          authors: result.publication_info.summary.split("-")[0],
          summary: result.snippet,
          resource: result.resources,
          link: result.link,
          date: result.publication_info.summary.split("-")[1].substr(-6, 6),
        });
      });
      setGoogleResult(googleArray);
    } catch (error) {
      console.log(error);
    }
  };

  const ieeeSearch = async () => {
    try {
      const resIEEE = await APIInstance.post("/ieee", {
        search,
        page_no: pageNo,
      });
      if (resIEEE.data.error) {
        console.log(resIEEE.data.error);
        return;
      }
      let IEEEarray = [];
      resIEEE.data.map((result) => {
        IEEEarray.push({
          title: result.title,
          authors: result.authors.authors,
          summary: result.abstract,
          pdf: result.pdf_url ? result.pdf_url : undefined,
          html: result.html_url ? result.html_url : undefined,
          date: result.publication_date,
        });
      });
      setIEEEResult(IEEEarray);
    } catch (error) {
      console.log(error);
    }
  };

  const springerSearch = async () => {
    try {
      const resSpringer = await APIInstance.post("/springer", {
        search,
        page_no: pageNo,
      });
      if (resSpringer.data.error) {
        console.log(resSpringer.data.error);
        return;
      }
      let springerArray = [];

      console.log("resSpringer is :");
      console.log(resSpringer);
      resSpringer.data.map((result) => {
        let editorNameArray = [];
        let editorName = [];
        result.bookEditors.map((editor) => {
          let name = "";
          editorName = editor.bookEditor.split(",");
          editorName.reverse();
          editorName.map((temp) => {
            name = name + " " + temp;
          });

          editorNameArray.push(name);
        });
        springerArray.push({
          title: result.publicationName,
          summary: result.abstract,
          resource: result.url.map((links) => {
            if (links.format === "html") {
              return links.value;
            } else return undefined;
          }),
          authors: editorNameArray,
          date: result.onlineDate,
          pdf: result.url.map((links) => {
            if (links.format === "pdf") 
            return links.value;
          }),
        });
      });
      console.log("Springer Array:");
      setSpringerResult(springerArray);
      console.log(springerArray);
    } catch (error) {
      console.log(error);
    }
  };

  const renderSpringerAuthors = (authors) => {
    return (
      <div className="card-author">
        {authors.split(",").map((author, index) => {
          return <span>{index > 0 ? " ," + author : author}</span>;
        })}
      </div>
    );
  };
  const renderSpringerCard = (details) => {
    return (
      <div className="my-card">
        <div className="my-card-header">
          <a
            target="_blank"
            rel="noreferrer"
            href={details.resource[0]}
            className="card-title"
          >
            {console.log(details.resource)}
            {details.title}
          </a>
          <div style={{ color: "grey" }}>{details.date.split("-")[0]}</div>
        </div>
        <div className="my-card-subheading">
          <div className="card-author">
            - {details.authors ? renderSpringerAuthors(details.authors) : <></>}
          </div>
          <Link target="_blank" rel="noreferrer" href={details.pdf[1]}>
            <FaFilePdf className="pdf-icon" />
          </Link>
          {console.log("Authors")}
          {console.log(details.authors)}
          {/* {details.pdf ? (
        details.resource.map((links) => {
          if (links.file_format === "PDF" || links.title === "Full View")
            return (
              <Link target="_blank" rel="noreferrer" href={details.link}>
                <FaFilePdf className="pdf-icon" />
              </Link>
            );
        })
      ) : (
        <></>
      )} */}
        </div>
        <div>{details.summary}</div>
      </div>
    );
  };

  const arxivSearch = async () => {
    try {
      const resArxiv = await APIInstance.post("/arxiv", {
        search,
        page_no: pageNo,
      });
      if (resArxiv.data.error) {
        console.log(resArxiv.data.error);
        return;
      }
      let arxivArray = [];
      resArxiv.data.map((result) => {
        arxivArray.push({
          title: result.title,
          authors: result.author,
          summary: result.summary,
          resource: result.link,
          date: result.updated,
        });
      });
      setArxivResult(arxivArray);
    } catch (error) {
      console.log(error);
    }
  };

  const renderGoogleAuthors = (authors) => {
    return (
      <div className="card-author">
        {authors.split(",").map((author, index) => {
          return <span>{index > 0 ? " ," + author : author}</span>;
        })}
      </div>
    );
  };

  const renderGoogleScholarCard = (details) => {
    return (
      <div className="my-card">
        <div className="my-card-header">
          <a
            target="_blank"
            rel="noreferrer"
            href={details.link}
            className="card-title"
          >
            {details.title}
          </a>
          <div style={{ color: "grey" }}>{details.date}</div>
        </div>
        <div className="my-card-subheading">
          <div className="card-author">
            - {renderGoogleAuthors(details.authors)}
          </div>
          {details.resource ? (
            details.resource.map((links) => {
              if (links.file_format === "PDF" || links.title === "Full View")
                return (
                  <Link target="_blank" rel="noreferrer" href={links.link}>
                    <FaFilePdf className="pdf-icon" />
                  </Link>
                );
            })
          ) : (
            <></>
          )}
        </div>
        <div>{details.summary}</div>
      </div>
    );
  };

  const renderAllGoogleResults = () => {
    return (
      <div>
        {googleResult.length > 0 ? (
          <div className="heading-sites">Results from Google Scholar</div>
        ) : (
          <></>
        )}
        {googleResult.map((result) => {
          return <div>{renderGoogleScholarCard(result)}</div>;
        })}
      </div>
    );
  };

  const renderIEEECard = (details) => {
    return (
      <div className="my-card">
        <div className="my-card-header">
          <a
            target="_blank"
            rel="noreferrer"
            href={details.link}
            className="card-title"
          >
            {details.html}
          </a>
          <div style={{ color: "grey" }}>{details.date}</div>
        </div>
        <div className="my-card-subheading">
          <div className="card-author">- {details.authors}</div>
          {details.pdf ? (
            //   details.resource.map((links) => {
            //     if (links.file_format === "PDF" || links.title === "Full View")
            //       return (
            <Link target="_blank" rel="noreferrer" href={details.link}>
              <FaFilePdf className="pdf-icon" />
            </Link>
          ) : (
            //       );
            //   })
            <></>
          )}
        </div>
        <div>{details.summary}</div>
      </div>
    );
  };

  const renderAllIEEEResults = () => {
    return (
      <div>
        {ieeeResult.length > 0 ? (
          <div className="heading-sites">Results from IEEE</div>
        ) : (
          <></>
        )}
        {ieeeResult.map((result) => {
          renderIEEECard(result);
        })}
      </div>
    );
  };

  const renderAllSpringerResults = () => {
    return (
      <div>
        Hello all
        {springerResult.length > 0 ? (
          <div className="heading-sites">Results from Springer</div>
        ) : (
          <></>
        )}
        {console.log("inside render all, springerResult is :")}
        {console.log(springerResult)}
        {springerResult.map((result) => {
          renderSpringerCard(result);
        })}
      </div>
    );
  };

  const handleSearch = async () => {
    if (search === "") return;
    // googleSearch();
    // ieeeSearch();
    springerSearch();
    // arxivSearch();

    // const resElsiever=await APIInstance.post("/elsiever", {search,
    //     page_no:pageNo});
    //     console.log("Elsiever result: ");
    //     console.log(resElsiever.data);
    //     let elsieverArray=[];
    //     resElsiever.data.map((result)=>{
    //         elsieverArray.push({
    //             title:result.title,
    //             authors: result.author,
    //             summary:result.summary,
    //             resource:result.link,
    //             date:result.updated

    //         })});
    //         console.log("Elsiever Array:");
    //         console.log(elsieverArray);
    // const resElsiever=await APIInstance.post("/elsiever", {search,
    //     page_no:pageNo});
    // console.log(resElsiever);
  };

  useEffect(() => {
    handleSearch();
  }, [pageNo]);

  useEffect(() => {
    setError((prev) => {
      return {
        arxivError: "",
        googleError: "",
        ieeeError: "",
        springerError: "",
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
      {/* {renderAllGoogleResults()}
      {googleError && <div>{googleError}</div>} */}
      {/* {renderAllIEEEResults()}
      {ieeeError && <div>{ieeeError}</div>} */}
      {/* {renderAllSpringerResults()} */}
      <div>
        Hello all
        {springerResult.length > 0 ? (
          <div className="heading-sites">Results from Springer</div>
        ) : (
          <div>Empty</div>
        )}
        {springerResult.map((result) => {
          return <div>{renderSpringerCard(result)}</div>;
        })}
      </div>
      Hello Springer
      {springerError && <div>{springerError}</div>}
      <div className="navigation">
        {pageNo > 1 ? (
          <FcPrevious
            className="previous-button"
            onClick={() => {
              setPageNo((prev) => {
                return --prev;
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
          }}
        />
      </div>
    </>
  );
};
export default Home;
