import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { faRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { fetchAllPosts } from "../../redux/postSlice";
import Posts from "./Posts/Posts";

const Learner = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchPosts() {
            try {
                await dispatch(fetchAllPosts()).unwrap();
            } catch (error) {
                toast.error(error.message);
            }
        }

        fetchPosts();
    }, [dispatch]);

    return (
        <div className="bodyContainer">
            <div
                className={`p-6 bg-green-100 rounded-md flex justify-between
                 items-center relative`}
            >
                <div>
                    <>
                        <div className="flex items-center mb-5">
                            <FontAwesomeIcon icon={faRunning} className="text-4xl mr-2" />
                            <span>
                                늘씬한 몸보다는 불륨있고 탄탄한 몸을 만들고 싶어요!
                            </span>
                        </div>
                        <div className="flex items-center mb-5">
                            <FontAwesomeIcon icon={faRunning} className="text-4xl mr-2" />
                            <span>
                                임신 5개월차 임산부를 위한 산전스트레칭을 알려주세요!
                            </span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faRunning} className="text-4xl mr-2" />
                            <span>
                                허리디스크가 있어 허리에 무리가 되지 않게 코어근육을
                                기르고 싶어요!
                            </span>
                        </div>
                    </>
                </div>
                <Link
                    to="/learner/post/create"
                    className="defaultBtn bg-green-500 text-white"
                >
                    프로찾기
                </Link>
            </div>
            <Posts />
        </div>
    );
};

export default Learner;
