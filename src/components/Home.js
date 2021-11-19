import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className=" md:flex flex-row">
            <div className="h-full bg-orange-200 w-full flex flex-col items-center justify-center py-16 md:w-1/2">
                <div className="h-80 w-80 rounded-full flex justify-center items-center my-8 bg-gray-300">
                    LEANER
                </div>
                <div className="text-2xl mb-2">나를 위한 건강한 습관이 필요하세요?</div>
                <div className=" text-gray-500">나만의 기준으로, 필요한 정보만 골라!</div>
                <div className="mb-6 text-gray-500">나를 위한 건강전문가 찾기</div>
                <Link to="/learner" className="defaultBtn bg-orange-500 text-white">
                    프로찾기
                </Link>
            </div>
            <div className="h-full bg-green-200 w-full flex flex-col items-center justify-center py-16 md:w-1/2">
                <div className="h-80 w-80 rounded-full flex justify-center items-center my-8 bg-gray-300">
                    PRO
                </div>
                <div className="text-2xl mb-2">
                    내가 아는 정보를 여러사람과 나누고 싶으신가요?
                </div>
                <div className=" text-gray-500">
                    다양한 니즈를 가진 여러 고객을 만나고
                </div>
                <div className="mb-6 text-gray-500">올바른 건강 가이드가 되어보기</div>
                <Link to="/pro" className="defaultBtn bg-green-500 text-white">
                    러너찾기
                </Link>
            </div>
        </div>
    );
};

export default Home;
