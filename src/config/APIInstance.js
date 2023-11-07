import axios from "axios";

const APIInstance_Google_Scholar = axios.create({
    baseURL: "https://serpapi.com/search?",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
    params: {
        api_key:
            "d7ce24996611c25af360e379262ef80d947eaba2712e6de0c1f539b1065c4a9e",
        engine: "google_scholar",
    },
});

const APIInstance_IEEE = axios.create({
    baseURL: "https://ieeexploreapi.ieee.org/api/v1/search/",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
        apikey: "akvqtwssjgzkywh9y6m59552",
        format: "json",
        max_records: "25",
    },
});

export { APIInstance_Google_Scholar, APIInstance_IEEE };
