import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

import Lable from "../Form/Label";
import Select from "../Form/Select";

const initialPostData = {
    type: "",
    career: "",
    avatar: "",
    name: "",
    introduction: "",
    program: "",
    photos: [],
};

const careerOptions = [
    { value: "1~3년차" },
    { value: "3~5년차" },
    { value: "5~7년차" },
    { value: "7~9년차" },
    { value: "10년차이상" },
];

const typeOptions = [
    { value: "헬스" },
    { value: "필라테스" },
    { value: "요가" },
    { value: "테니스" },
    { value: "골프" },
    { value: "수영" },
    { value: "러닝" },
];

function Register() {
    const { register, handleSubmit } = useForm();

    const avatarRef = useRef();
    const avatarPreviewRef = useRef();
    const photosRef = useRef();
    const nameRef = useRef();
    const programRef = useRef();
    const introductionRef = useRef();

    const [postData, setPostData] = useState(initialPostData);
    const [photos, setPhotos] = useState([]);

    const onChange = (e) => {
        if (nameRef.current.value.length > 10) return;
        if (introductionRef.current.value.length > 600) return;
        if (programRef.current.value.length > 600) return;

        setPostData({ ...postData, [e.target.name]: e.target.value });
    };

    const loadAvatar = (e) => {
        e.preventDefault();

        const avatarFile = e.target.files[0];
        const avatarImg = URL.createObjectURL(avatarFile);

        avatarPreviewRef.current.hidden = false;
        avatarPreviewRef.current.src = avatarImg;

        if (avatarPreviewRef.current.complete) {
            URL.revokeObjectURL(avatarPreviewRef.current.src);
        }

        setPostData({ ...postData, avatar: avatarFile });
    };

    const loadPhotos = (e) => {
        e.preventDefault();

        if (photos.length >= 6) {
            toast.error("사진은 6개까지 가능합니다");
            return;
        }

        const imgFile = e.target.files[0];
        const img = URL.createObjectURL(imgFile);

        setPhotos([...photos, img]);
        setPostData({ ...postData, photos: [...photos, imgFile] });
    };

    const deletePhoto = (i) => {
        const removedPhotos = photos.filter((__, index) => index !== i);
        const removedPostDataPhotos = postData.photos.filter((__, index) => index !== i);
        const photoSrc = document.getElementById(`photo-${i}`).src;
        URL.revokeObjectURL(photoSrc);
        setPhotos(removedPhotos);
        setPostData({ ...postData, photos: removedPostDataPhotos });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!avatarRef.current.files[0]) return toast.error("프로필 사진은 필수입니다");
    //     if (nameRef.current.value.length === 0) return toast.error("이름을 작성해주세요");
    //     if (introductionRef.current.value.length < 150)
    //         return toast.error(
    //             `자기소개 글을 ${
    //                 150 - introductionRef.current.value.length
    //             }자 더 적어주세요`
    //         );
    //     if (programRef.current.value.length < 150)
    //         return toast.error(
    //             `프로그램 소개글을 ${
    //                 150 - programRef.current.value.length
    //             }자 더 적어주세요`
    //         );
    //     if (photos.length < 3) return toast.error("사진을 업로드하세요");
    // };

    return (
        <div className="bodyContainer">
            <form
                className="p-2 mt-2 mx-auto lg:w-2/3 md:w-3/4 sm:w-4/5"
                onSubmit={handleSubmit}
            >
                <Lable
                    title="프로필"
                    explanation="자신의 본명과 얼굴이 나오는 사진을 사용하세요"
                />
                <Lable explanation="옷고있는 사진은 친근함을 줍니다" />
                <div className="mr-5 my-3 w-full md:w-1/2 flex items-center">
                    <input
                        type="file"
                        onChange={loadAvatar}
                        hidden={true}
                        accept="image/*"
                        ref={avatarRef}
                    />

                    <div
                        onClick={() => avatarRef.current.click()}
                        className="relative w-32 h-32 border border-gray-400 rounded-full cursor-pointer hover:opacity-90 bg-white hover:bg-orange-200 transition-all flex items-center justify-center mb-3"
                    >
                        <img
                            ref={avatarPreviewRef}
                            hidden={true}
                            className="object-cover object-center rounded-full"
                        />
                        {!postData.avatar && (
                            <FontAwesomeIcon
                                icon={faCamera}
                                size="lg"
                                className="text-gray-400"
                            />
                        )}
                    </div>

                    <div className="w-1/2 ml-3">
                        <input
                            type="text"
                            name="name"
                            ref={nameRef}
                            placeholder="이름"
                            value={postData.name}
                            onChange={onChange}
                            className="defaultInput"
                        />
                    </div>
                </div>
                <Lable
                    title="자기소개"
                    explanation="'프로'님의 성격(mbti유형), 경력(경력, 학위 등), 나를 드러내는 개성, 나이, 성별 등을 설명해보세요."
                />
                <Lable explanation="'프로'님에 대한 정보가 많으면 많을수록 선택받을 확률이 높아져요! (최소 150자)" />
                <div className="relative">
                    <textarea
                        name="introduction"
                        ref={introductionRef}
                        value={postData.introduction}
                        onChange={onChange}
                        placeholder="인삿말을 빼놓지마세요😀"
                    />
                    <span
                        className={` text-sm absolute bottom-5 right-2 ${
                            postData.introduction.length < 150
                                ? "text-red-500"
                                : "text-teal-600"
                        }`}
                    >
                        {postData.introduction.length} / 600
                    </span>
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="mb-5 mr-5 w-full md:w-1/2">
                        <Lable title="분야" explanation="주분야를 선택해주세요" />
                        <Select
                            optionItems={typeOptions}
                            name="type"
                            value={postData.type}
                            postData={postData}
                            setPostData={setPostData}
                        />
                    </div>
                    <div className="mb-5 w-full md:w-1/2">
                        <Lable title="경력" explanation="경력을 선택해주세요" />
                        <Select
                            optionItems={careerOptions}
                            name="career"
                            value={postData.career}
                            postData={postData}
                            setPostData={setPostData}
                        />
                    </div>
                </div>
                <Lable
                    title="프로그램"
                    explanation="'프로'님만의 특별한 커리큘럼, 정보, 차별성을 드러내보세요.'"
                />
                <Lable explanation="운동 방식, 장소, 시간, 지역에 대한 정보가 많을수록 신뢰도가 높아져요! (최소 150자)" />
                <div className="relative">
                    <textarea
                        name="program"
                        value={postData.program}
                        ref={programRef}
                        onChange={onChange}
                        placeholder="자세히 서술하세요."
                    />
                    <span
                        className={` text-sm absolute bottom-5 right-2 ${
                            postData.program.length < 150
                                ? "text-red-500"
                                : "text-teal-600"
                        }`}
                    >
                        {postData.program.length} / 600
                    </span>
                </div>
                <Lable
                    title="사진"
                    explanation="'프로'님, 혹은 '프로그램'을 보여줄 수 있는 사진을 최소 3장 업로드하세요 (최대 6장)"
                />
                <input
                    type="file"
                    name="photos"
                    ref={photosRef}
                    hidden={true}
                    onChange={loadPhotos}
                />
                <div
                    className="my-2 inline-block py-2 px-5 border-2 text-gray-600 border-gray-500 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => photosRef.current.click()}
                >
                    업로드
                </div>
                <div className="flex flex-wrap gap-3 mb-5">
                    {photos.length > 0 &&
                        photos.map((photo, index) => (
                            <div className="relative w-60 h-72" key={index}>
                                <img
                                    src={photo}
                                    id={`photo-${index}`}
                                    className="w-full h-full object-center object-cover rounded-sm"
                                />
                                <div
                                    className="absolute -top-1 -right-1 bg-red-400 flex items-center justify-center w-6 h-6 rounded-full cursor-pointer hover:bg-red-500 transition-colors"
                                    onClick={() => deletePhoto(index)}
                                >
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        className="text-white"
                                        size="sm"
                                    />
                                </div>
                            </div>
                        ))}
                </div>
                <div className="text-right">
                    <div className="inline-block mr-3 text-xl py-3 px-6 text-gray-600 bg-teal-200 cursor-pointer rounded-sm hover:bg-teal-400 transition-colors">
                        프로필 미리보기
                    </div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="text-xl py-3 px-6 text-white bg-orange-500 cursor-pointer rounded-sm hover:bg-orange-400 transition-colors"
                    >
                        등록하기
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
