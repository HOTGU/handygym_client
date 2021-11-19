import React, { useState, useRef, useEffect } from "react";

function Select({ optionItems, name, value, postData, setPostData }) {
    const ref = useRef();
    const [showItems, setShowItems] = useState(false);

    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            setShowItems(false);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref]);

    // useOnClickOutside(ref, () => setShowItems(false));

    return (
        <div className="relative">
            <input
                type="text"
                value={value}
                name={name}
                readOnly
                onClick={(e) => setShowItems(true)}
                className="defaultInput hover:bg-orange-200 cursor-pointer z-0"
            ></input>
            <div className="absolute top-15 w-full z-20" ref={ref}>
                {showItems && (
                    <div className="border">
                        {optionItems.map((item, i) => (
                            <input
                                className="w-full bg-white border-b p-2 hover:bg-orange-200 cursor-pointer"
                                readOnly
                                key={i}
                                value={item.value}
                                onClick={(e) => {
                                    setPostData({
                                        ...postData,
                                        [name]: e.target.value,
                                    });
                                    setShowItems(false);
                                }}
                            ></input>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Select;
