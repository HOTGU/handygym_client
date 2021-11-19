import React from "react";
import { Link } from "react-router-dom";

function ProPreview() {
    return (
        <div className="bodyContainer">
            트레이너의장점
            <Link to="/pro/register" className="defaultBtn bg-orange-500 text-white">
                프로등록
            </Link>
        </div>
    );
}

export default ProPreview;
