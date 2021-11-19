import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function Lable({ title, explanation }) {
    return (
        <>
            <h4 className=" text-gray-700 text-2xl">{title}</h4>
            <div>
                <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="text-gray-400"
                    size="xs"
                />
                <span className="GFontLight text-gray-600 text-sm ml-1">
                    {explanation}
                </span>
            </div>
        </>
    );
}

export default Lable;
