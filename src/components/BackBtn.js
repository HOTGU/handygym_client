import React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function BackBtn() {
    const history = useHistory();

    return (
        <div onClick={history.goBack}>
            <FontAwesomeIcon
                icon={faAngleLeft}
                className="text-3xl text-orange-500 cursor-pointer transition-colors hover:text-orange-400"
            />
        </div>
    );
}

export default BackBtn;
