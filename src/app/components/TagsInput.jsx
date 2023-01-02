import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
export default function TagsInput({ tags, setTags }) {
  const [tag, setTag] = useState("");
  const inputRef = useRef(null);
  return (
    <div
      className="tags-input flex flex-wrap bg-gray-200 gap-1 items-center hover:cursor-text focus-within:bg-gray-300"
      onClick={() => inputRef.current.focus()}
    >
      {tags.map((tag, tagIndex) => (
        <div
          className="bg-sky-500 p-2 rounded-3xl text-white flex flex-row space-x-2 items-center hover:cursor-default"
          key={tagIndex}
        >
          <span>#{tag}</span>
          <CiCircleRemove
            size={24}
            className="hover:cursor-pointer hover:text-gray-900"
            onClick={() =>
              setTags((currTags) =>
                currTags.filter((_, index) => index !== tagIndex)
              )
            }
          />
        </div>
      ))}
      <input
        type="text"
        ref={inputRef}
        className="bg-transparent hover:bg-transparent focus:bg-transparent"
        onChange={(e) => setTag(e.target.value)}
        value={tag}
        placeholder={tags.length === 0 && "Hashtags"}
        onKeyDown={(event) => {
          if (event.key === "Enter" && tag !== "" && tags.indexOf(tag) === -1) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            setTag("");
            setTags((currTags) => [...currTags, tag.replaceAll(" ", "_")]);
          }
        }}
      />
    </div>
  );
}
