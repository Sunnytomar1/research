import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { APIInstance } from "../../../config/APIInstance";

const Home = () => {
    const [search, setSearch] = useState("");
    const[pageNo,setPageNo]=useState(1);
    const[googleResult,setGoogleResult]=useState([]);
    const[ieeeResult,setIEEEResult]=useState([]);
    const[arxivResult,setArxivResult]=useState([]);
    const[springerResult,setSpringerResult]=useState([]);
    
    const handleChange = (e) => {
        setSearch(e.target.value);
    };
    
    const googleSearch=async ()=>{
        
        let googleArray=[];
        const resGoogle=await APIInstance.post("/google_scholar", {
            search,
            page_no:pageNo
        });
        if(resGoogle.data.error){
            console.log(resGoogle.data.error);
            return;
        }
        console.log("Google result: ");
        console.log(resGoogle);
        resGoogle.data.map((result)=>{
            googleArray.push(
                {
                    title: result.title,
                    authors: result.publication_info.authors,
                    summary: result.snippet,
                    resource:result.resources,
                    link:result.link,
                    date:result.publication_info.summary.split('-')[1].substr(-6,6)
                    
                })});
                console.log("googleArray: ");
                setGoogleResult(googleArray);
                console.log(googleArray);
         }
            
    const ieeeSearch=async ()=>{
        
        const resIEEE=await APIInstance.post("/ieee", {
            search,
            page_no:pageNo
        });
        if(resIEEE.data.error){
            console.log(resIEEE.data.error);
            return;
        }
        // console.log("IEEE result");
        // console.log(resIEEE.data);
        let IEEEarray=[];
        resIEEE.data.map((result)=>{
            IEEEarray.push({
                title:result.title,
                authors: result.authors.authors,
                summary:result.abstract,
                pdf:result.pdf_url?result.pdf_url:undefined,
                html:result.html_url?result.html_url:undefined,
                date: result.publication_date
            })});
            console.log("IEEE Array:");
            setIEEEResult(IEEEarray);
            console.log(IEEEarray);
        }
                
    const springerSearch=async ()=>{
        
        const resSpringer=await APIInstance.post("/springer", {
            search,
            page_no:pageNo
        });
        if(resSpringer.data.error){
            console.log(resSpringer.data.error);
            return;
        }
        // console.log("Springer result: ");
        // console.log(resSpringer.data);
        let springerArray=[];
        resSpringer.data.map((result)=>{
            springerArray.push({
                    title:result.publicationName,
                    authors: result.bookEditors,
                    summary:result.abstract,
                    resource:result.url,
                    date:result.onlineDate
                    
                })});
                console.log("Springer Array:");
                setSpringerResult(springerArray);
                console.log(springerArray);
            }
            const arxivSearch=async ()=>{

                const resArxiv=await APIInstance.post("/arxiv", {
                    search,
                    page_no:pageNo
                });
                if(resArxiv.data.error){
                    console.log(resArxiv.data.error);
                    return;
                }
                    // console.log("Arxiv result: ");
                    // console.log(resArxiv.data);
                    let arxivArray=[];
                    resArxiv.data.map((result)=>{
                        arxivArray.push({
                            title:result.title,
                            authors: result.author,
                            summary:result.summary,
                            resource:result.link,
                            date:result.updated
                            
                        })});
                        console.log("Arxiv Array:");
                        setArxivResult(arxivArray);
                        console.log(arxivArray);
            }
                        
                        const handleSearch = async (searchQuery) => {
                            googleSearch();
                            ieeeSearch();
                            springerSearch();
                            arxivSearch();
                        
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
        {/* {googleResult.map((result)=>{return(<div>{result.date}</div>)})} */}
                </>
    );
};
export default Home;
