import React, { useState } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { signin, signup } from "../redux/userSlice";

const initialState = { nickname: "", email: "", password: "", confirmPassword: "" };

function Auth() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { pending, isAuth } = useSelector((state) => state.user);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const referer = location.state && location.state.referer;

    if (isAuth) {
        return <Redirect to={referer || "/"} />;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            const promiseResult = dispatch(signup(formData)).unwrap();
            toast.promise(promiseResult, {
                loading: "로딩 중",
                success: () => `회원가입 성공`,
                error: (err) => `${err.message}`,
            });
            promiseResult.then(() => {
                setIsSignup(false);
            });
        } else {
            const promiseResult = dispatch(signin(formData)).unwrap();
            toast.promise(promiseResult, {
                loading: "로딩 중",
                success: () => "로그인 성공",
                error: (err) => `${err.message}`,
            });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleSignup = () => setIsSignup((prev) => !prev);
    return (
        <div className="bodyContainer">
            <form
                className="bg-white mx-auto shadow-md w-2/3 sm:w-1/2 md:w-2/5 lg:w-1/4 p-4 mt-12 flex flex-col items-center"
                onSubmit={handleSubmit}
            >
                <FontAwesomeIcon
                    icon={faUserCircle}
                    size="3x"
                    className=" text-orange-500 mb-4"
                />
                <div className="text-2xl GFontBold mb-4">
                    {isSignup ? "회원가입" : "로그인"}
                </div>
                {isSignup && (
                    <input
                        type="text"
                        name="nickname"
                        placeholder="닉네임"
                        className="defaultInput mb-2"
                        required
                        value={formData.nickname}
                        onChange={handleChange}
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="이메일"
                    className="defaultInput mb-2"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    className="defaultInput mb-2"
                    required
                    value={formData.password}
                    onChange={handleChange}
                />
                {isSignup && (
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="비밀번호 확인"
                        className="defaultInput mb-2"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                )}
                <button
                    disabled={pending}
                    type="submit"
                    className="defaultInput bg-orange-400 text-white hover:bg-orange-500 transition-colors mb-2"
                >
                    {isSignup ? "회원가입" : "로그인"}
                </button>
                <div className="self-end text-sm">
                    <span className=" GFontLight">
                        {isSignup ? "아이디가 이미 있으신가요?" : "아이디가 없으신가요?"}
                    </span>
                    <span
                        onClick={toggleSignup}
                        className="ml-1 Gfont text-orange-400 cursor-pointer"
                    >
                        {isSignup ? "로그인" : "회원가입"}
                    </span>
                </div>
            </form>
        </div>
    );
}

export default Auth;
