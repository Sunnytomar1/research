import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const Home = () => {
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = async () => {
        // const result = await fetch(
        //     `https://serpapi.com/search?engine=google_scholar&q=${search}&api_key=d7ce24996611c25af360e379262ef80d947eaba2712e6de0c1f539b1065c4a9e`,
        //     {
        //         method: "get",
        //         mode: "no-cors",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         params: {
        //             api_key:
        //                 "d7ce24996611c25af360e379262ef80d947eaba2712e6de0c1f539b1065c4a9e",
        //             engine: "google_scholar",
        //             q: search,
        //         },
        //     }
        // );
        // const data = await result.json();
        // console.log(data);
    };

    return (
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
    );
};
export default Home;
