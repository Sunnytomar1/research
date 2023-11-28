const Filter = ({
    isGoogle,
    isArxiv,
    isSpringer,
    setResult,
    yearFrom,
    yearTo,
    setFilter,
    handleSearch,
}) => {
    return (
        <div className="flex flex-col gap-4 pt-4">
            <div>
                <div>Show results from</div>
                <div className="flex gap-4">
                    <div>Google Scholar</div>
                    <input
                        type="checkbox"
                        checked={isGoogle}
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
                        type="checkbox"
                        checked={isArxiv}
                        onChange={(e) => {
                            setResult((prev) => {
                                return {
                                    ...prev,
                                    isArxiv: e.target.checked,
                                };
                            });
                        }}
                    />
                    <div>Springer</div>
                    <input
                        type="checkbox"
                        checked={isSpringer}
                        onChange={(e) => {
                            setResult((prev) => {
                                return {
                                    ...prev,
                                    isSpringer: e.target.checked,
                                };
                            });
                        }}
                    />
                </div>
            </div>
            <div className="h-[1px] w-full bg-black" />
            <div>
                <div>Year Filter</div>
                <div className="flex">
                    <div>
                        <div>From</div>
                        <input
                            value={yearFrom}
                            className=""
                            type="text"
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
                            value={yearTo}
                            className=""
                            type="text"
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
            <div className="flex flex-col gap-8">
                <button
                    className="bg-gray-400 text-white px-4 py-2 rounded-md"
                    onClick={handleSearch}
                >
                    Apply
                </button>
                <button
                    className="bg-gray-400 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                        setResult((prev) => {
                            return {
                                ...prev,
                                isGoogle: true,
                                isArxiv: true,
                                isSpringer: true,
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
