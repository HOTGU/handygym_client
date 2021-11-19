import React from "react";

const Post = ({ post }) => {
    return (
        <div className="bg-white rounded-sm p-2 hover:shadow-md transition-shadow cursor-pointer">
            <h1 className="text-xl truncate">{post.title}</h1>
            <div className=" line-clamp-2">{post.description}</div>
            <div>{post.location}</div>
            <div>{post.cost}</div>
        </div>
    );
};

export default React.memo(Post);
