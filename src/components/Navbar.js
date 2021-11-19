import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import { logout } from "../redux/userSlice";

const Navbar = () => {
    const { userInfo, isAuth } = useSelector((state) => state.user);
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {}, [location]);

    const handleLogout = () => {
        try {
            dispatch(logout());
            history.push("/");
            toast.success("로그아웃 성공");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <div className="border-b">
                <div className="bodyContainer flex justify-between items-center py-8">
                    <Link
                        to="/"
                        className="GFontBold tracking-tight flex flex-col items-center"
                    >
                        <div className="text-3xl text-orange-500">HANDY GYM</div>
                        <div className="text-gray-500 -mt-2 ">내 손 안의 건강지도사</div>
                    </Link>
                    {isAuth ? (
                        <>
                            <span>{userInfo?.nickname}</span>
                            <button
                                className="py-2 px-3 hover:bg-orange-100 rounded transition-colors"
                                onClick={handleLogout}
                            >
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/auth"
                            className="py-2 px-3 hover:bg-orange-100 rounded transition-colors"
                        >
                            로그인
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
