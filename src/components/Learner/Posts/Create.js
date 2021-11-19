import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import SearchAddress from "../../SearchAddress";
import { createPost } from "../../../redux/postSlice";
import BackBtn from "../../BackBtn";
import Lable from "../../Form/Label";
import Select from "../../Form/Select";

const initialPostData = {
    title: "",
    description: "",
    location: "",
    cost: "",
};

const costOptions = [
    { value: "1~3만원" },
    { value: "3~5만원" },
    { value: "5~7만원" },
    { value: "7~9만원" },
    { value: "10만원이상" },
];

const Create = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const pending = useSelector((state) => state.post.pending);

    const [postData, setPostData] = useState(initialPostData);
    const [toggleSearch, setToggleSearch] = useState(true);

    const handleChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    };

    const handleCreate = (e) => {
        e.preventDefault();

        const promiseResult = dispatch(createPost(postData, history)).unwrap();
        toast.promise(promiseResult, {
            loading: "로딩 중",
            success: (data) => `${data.message}`,
            error: (err) => `${err.message}`,
        });

        promiseResult.then(() => history.push("/learner"));
    };

    const handleClick = () => {
        confirmAlert({
            title: "동네를 변경하시겠습니까?",
            buttons: [
                {
                    label: "네",
                    onClick: () => {
                        setToggleSearch(true);
                        setPostData({ ...postData, location: "" });
                    },
                },
                {
                    label: "아니요",
                },
            ],
        });
    };

    return (
        <>
            <div className="bodyContainer">
                <div className="mt-2 mx-auto lg:w-2/3 md:w-3/4 sm:w-4/5">
                    <div className="flex justify-between items-center">
                        <BackBtn />
                        <button disabled={pending} onClick={handleCreate}>
                            <FontAwesomeIcon
                                icon={faUpload}
                                className="text-3xl text-orange-500 cursor-pointer transition-colors hover:text-orange-400"
                            />
                        </button>
                    </div>
                    <form className="bg-white shadow-sm px-4 py-6 mt-2">
                        <div className="mb-5 flex flex-col md:flex-row">
                            <div className="mr-5 w-full md:w-1/2">
                                <Lable
                                    title="동네"
                                    explanation="운동하고 싶은 동네를 검색하세요"
                                />
                                {toggleSearch ? (
                                    <div className="relative">
                                        <SearchAddress
                                            setToggleSearch={setToggleSearch}
                                            postData={postData}
                                            setPostData={setPostData}
                                        />
                                    </div>
                                ) : (
                                    <input
                                        type="text"
                                        placeholder="운동동네"
                                        name="location"
                                        value={postData.location}
                                        readOnly
                                        onClick={handleClick}
                                        className="defaultInput hover:bg-orange-200 cursor-pointer"
                                    />
                                )}
                            </div>
                            <div className="w-full md:w-1/2">
                                <Lable
                                    title="가격"
                                    explanation="1회당 원하는 가격을 골라주세요"
                                />
                                <Select
                                    optionItems={costOptions}
                                    name="cost"
                                    value={postData.cost}
                                    postData={postData}
                                    setPostData={setPostData}
                                />
                            </div>
                        </div>
                        <div className="mb-5">
                            <Lable
                                title="제목"
                                explanation="자신이 필요한 정보를 간략하게 적으세요"
                            />
                            <input
                                type="text"
                                name="title"
                                placeholder="ex) 허리디스크 재활해주실 여성 트레이너분 찾아요"
                                value={postData.title}
                                onChange={handleChange}
                                className="defaultInput"
                            />
                        </div>
                        <div>
                            <Lable
                                title="본문"
                                explanation="원하는 장소, 희망하는 정보, 건강지도사의 스타일 등을
                                    자세하게 적어보세요"
                            />

                            <textarea
                                placeholder="ex)&#13;&#10; 안녕하세요^^&#13;&#10; 허리디스크가 심해서 간단한 걷기와 코어운동을 하고 싶은데 올바르게 걷는 방법을 알고 싶어요.&#13;&#10; 그리고 허리에 최대한 무리가 안가는 코어운동을 배우고 싶습니다.&#13;&#10; 친한 언니처럼 다정하게 코칭해주실 여성트레이너분을 찾아요."
                                name="description"
                                value={postData.description}
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Create;
