const Filter = ({
    result,
    setResult,
    yearFrom,
    yearTo,
    setFilter,
    handleSearch,
}) => {
    return (
        <div className="flex flex-col gap-4 pt-4">
            <div className="flex flex-col justify-center items-center text-center">
                <div>Show results from</div>
                <div className="flex gap-4 justify-center">
                    <div >
                        <div >Google Scholar</div>
                        <input
                            className="h-4 w-4"
                            type="checkbox"
                            checked={result.isGoogle}
                            onChange={(e) => {
                                setResult((prev) => {
                                    return {
                                        ...prev,
                                        isGoogle: e.target.checked,
                                    };
                                });
                            }}
                        />
                        <div>Arxiv</div>
                        <input
                            className="h-4 w-4"
                            type="checkbox"
                            checked={result.isArxiv}
                            onChange={(e) => {
                                setResult((prev) => {
                                    return {
                                        ...prev,
                                        isArxiv: e.target.checked,
                                    };
                                });
                            }}
                        />
                    </div>
                    <div>
                        <div>Springer</div>
                        <input
                            className="h-4 w-4"
                            type="checkbox"
                            checked={result.isSpringer}
                            onChange={(e) => {
                                setResult((prev) => {
                                    return {
                                        ...prev,
                                        isSpringer: e.target.checked,
                                    };
                                });
                            }}
                        />
                        <div>IEEE</div>
                        <input
                            className="h-4 w-4"
                            type="checkbox"
                            checked={result.isIeee}
                            onChange={(e) => {
                                setResult((prev) => {
                                    return {
                                        ...prev,
                                        isIeee: e.target.checked,
                                    };
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="h-[1px] w-full bg-black" />
            <div className="w-[90vw] max-w-[350px]">
                <div>Year Filter</div>
                <div className="flex gap-4">
                    <div>
                        <div>From</div>
                        <input
                        
                            placeholder="eg. 2010"
                            value={yearFrom}
                            className="border-2 border-gray-400 rounded-md p-1 w-full"
                            type="number"
                            onChange={(e) => {
                                setFilter((prev) => {
                                    return {
                                        ...prev,
                                        yearFrom: e.target.value,
                                    };
                                });
                            }}
                        />
                    </div>
                    <div>
                        <div>To</div>
                        <input
                        
                            placeholder="eg. 2021"
                            value={yearTo}
                            className="border-2 border-gray-400 rounded-md p-1 w-full"
                            type="number"
                            onChange={(e) => {
                                setFilter((prev) => {
                                    return {
                                        ...prev,
                                        yearTo: e.target.value,
                                    };
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="h-[1px] w-full bg-black" />
            <div className="flex flex-row gap-8 justify-center items-center">
                <button
                    className="bg-gray-400 text-white px-4 py-2 rounded-md w-min"
                    onClick={handleSearch}
                >
                    Apply
                </button>
                <button
                    className="bg-gray-400 text-white px-4 py-2 rounded-md w-min"
                    onClick={() => {
                        setResult((prev) => {
                            return {
                                ...prev,
                                isGoogle: true,
                                isArxiv: true,
                                isSpringer: true,
                                isIeee: true,
                            };
                        });
                        setFilter((prev) => {
                            return {
                                ...prev,
                                yearFrom: '',
                                yearTo: '',
                            };
                        });
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Filter;
