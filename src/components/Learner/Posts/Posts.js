import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Posts = () => {
    const { posts, pending, error } = useSelector((state) => state.post);

    return (
        <>
            <h1>POSTS</h1>
            {pending ? (
                <div className="flex justify-center items-center w-full h-full text-center">
                    <FontAwesomeIcon icon={faSpinner} spin size="5x" />
                </div>
            ) : (
                !error && (
                    <div className="grid grid-cols-4 gap-4">
                        {posts?.map((p) => (
                            <Post key={p._id} post={p} />
                        ))}
                    </div>
                )
            )}
        </>
    );
};

export default Posts;
