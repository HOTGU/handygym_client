import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAngleUp, faSpinner } from "@fortawesome/free-solid-svg-icons";

import { searchAddress } from "../redux/addressSlice";

function SearchAddress({ setToggleSearch, postData, setPostData }) {
    const dispatch = useDispatch();

    const { address, pending } = useSelector((state) => state.address);

    const [searchResult, setSearchResult] = useState(false);
    const [term, setTerm] = useState("");

    const searchingAddress = async () => {
        if (term === "") return;
        setSearchResult(true);
        dispatch(searchAddress(term));
    };

    const handleClick = (e) => {
        setPostData({
            ...postData,
            location: e.target.value,
        });
        setSearchResult(false);
        setToggleSearch(false);
        setTerm("");
    };

    return (
        <div className="w-auto">
            <input
                type="text"
                id="jsLocationSearch"
                placeholder="읍/면/동으로 검색하세요"
                value={term}
                onChange={(e) => {
                    if (e.target.value === "") setSearchResult(false);
                    setTerm(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.code === "Enter" || e.code === "NumpadEnter" || e.code === 13)
                        searchingAddress();
                }}
                className="defaultInput"
                autoComplete="off"
            />
            <div
                className="absolute cursor-pointer rounded-sm flex justify-center items-center right-0 top-0 w-12 h-12 hover:bg-orange-400 text-orange-500 hover:text-white transition-colors"
                onClick={searchResult ? () => setSearchResult(false) : searchingAddress}
            >
                {pending ? (
                    <FontAwesomeIcon icon={faSpinner} spin size="lg" />
                ) : (
                    <FontAwesomeIcon
                        icon={searchResult ? faAngleUp : faSearch}
                        size="lg"
                    />
                )}
            </div>
            <div className="absolute top-15 w-full z-50">
                {searchResult && !pending && (
                    <div className="w-auto max-h-44 overflow-y-scroll">
                        {!address.length ? (
                            <span className="text-red-700 font-bold">
                                검색결과가 없습니다
                            </span>
                        ) : (
                            <div className="border">
                                {address?.map((a) => (
                                    <div key={a._id} className=" w-full">
                                        <input
                                            value={a.fulladd}
                                            readOnly
                                            onClick={handleClick}
                                            className="w-full bg-white border-b p-2 hover:bg-orange-200 cursor-pointer"
                                        ></input>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchAddress;
