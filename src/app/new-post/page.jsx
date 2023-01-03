"use client";
import { IoImagesSharp } from "react-icons/io5";
import { BsUpload, BsShieldLockFill } from "react-icons/bs";
import { RiShieldUserFill } from "react-icons/ri";
import { AiFillSafetyCertificate, AiFillDelete } from "react-icons/ai";
import { MdCloudUpload } from "react-icons/md";
import { Fragment, useReducer, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import TagsInput from "../components/TagsInput";
import { useRouter } from "next/navigation";
const allowedMimes = ["image/jpeg", "image/png"];
function reducer(state, action) {
  switch (action.type) {
    case "add_image":
      return [...state, { url: action.url, key: action.key }];
    case "delete_image":
      return state.filter((_, index) => index !== action.index);
    default:
      return state;
  }
}
export default function NewPostPage() {
  const [tags, setTags] = useState([]);
  const { status } = useSession({ required: true });
  const [images, dispatch] = useReducer(reducer, []);
  const [tempImages, setTempImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const upload = async (file) => {
    if (allowedMimes.includes(file.type)) {
      const imageUrl = URL.createObjectURL(file);
      setTempImages((currTempImages) => [...currTempImages, imageUrl]);
      let response = await fetch("/api/posts/upload", {
        method: "POST",
        body: JSON.stringify({ name: file.name, type: file.type }),
      });
      const data = await response.json();
      if (data.url) {
        const uploaded = await fetch(data.url, {
          method: "PUT",
          headers: {
            "Content-type": file.type,
            "Access-Control-Allow-Origin": "*",
          },
          body: file,
        });
        if (uploaded.ok) {
          setTempImages([]);
          dispatch({
            type: "add_image",
            url: data.url.split("?")[0],
            key: data.image_id,
          });
          if (!selectedImage) setSelectedImage(0);
        }
      }
    }
  };
  const uploadImages = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (files) {
      let counter = 0;
      for (let file of files) {
        upload(file);
        counter++;
        if (counter >= 4) break;
      }
    }
  };
  function dodrop(event) {
    event.preventDefault();
    var dt = event.dataTransfer;
    var files = dt.files;
    let counter = 0;
    for (var i = 0; i < files.length; i++) {
      upload(files[i]);
      counter++;
      if (counter >= 4) break;
    }
    setIsDragging(false);
  }
  const submitPost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let response = await fetch("/api/posts/create", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
        tags: tags,
        images: images.map((image) => {
          return image.key;
        }),
      }),
    });
    const data = await response.json();
    if (response.ok) {
      router.push(`/posts/${data.slug}`);
    }
    setIsLoading(false);
  };
  if (status === "authenticated") {
    return (
      <Fragment>
        <input
          type="file"
          onChange={uploadImages}
          id="images"
          accept="image/jpg, image/jpeg, image/png"
          multiple
          hidden
        />
        {images.length === 0 && tempImages.length === 0 ? (
          <section className="flex flex-col justify-center items-center w-full">
            <div
              className={`${
                isDragging && "bg-gray-100"
              } bg-white rounded-3xl flex flex-col items-center whitespace-pre
          justify-center h-full px-10 py-4 mt-10 w-4/5 border-4 border-dashed
          space-y-6 text-center relative`}
            >
              <div
                className="absolute w-full h-full"
                onDrop={dodrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  setIsDragging(false);
                }}
              ></div>
              <IoImagesSharp className="text-emerald-600" size={120} />
              <span className="text-3xl font-medium leading-8">
                Drag and drop to <br /> upload
              </span>
              <button
                className="emerald-button text-xl font-medium rounded-md space-x-3 z-10"
                onClick={() => document.getElementById("images").click()}
              >
                <BsUpload /> <span>Browse your files</span>
              </button>
            </div>
            <div className="grid lg:grid-cols-3 gap-4 lg:w-4/5 w-full my-10 justify-center">
              <div className="flex text-sm items-center space-x-1 justify-center">
                <RiShieldUserFill className="text-lg" />{" "}
                <span>
                  We <span className="font-bold">blur</span> human faces
                  automatically
                </span>
              </div>
              <div className="flex text-sm items-center space-x-1 justify-center">
                <BsShieldLockFill className="text-lg" />{" "}
                <span>Mindful of the rights of others</span>
              </div>
              <div className="flex text-sm items-center space-x-1 justify-center">
                <AiFillSafetyCertificate className="text-lg" />{" "}
                <span>Excludes graphic nudity, violence, or hate</span>
              </div>
            </div>
          </section>
        ) : (
          <section className="flex flex-col lg:flex-row gap-4 p-4">
            <div
              className="flex flex-row lg:flex-col basis-1/5 items-center p-4 gap-4 bg-gray-100 rounded-3xl"
              style={{ top: 0 }}
            >
              {tempImages.map((image, index) => (
                <div className="w-24 h-24 relative" key={index}>
                  <Image
                    src={image}
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                    className="rounded-full transition duration-300 ease-in-out bg-white animate-pulse"
                  />
                </div>
              ))}
              {images.map((image, index) => (
                <div className="w-24 h-24 relative" key={index}>
                  <button onClick={() => setSelectedImage(index)}>
                    <Image
                      src={image.url}
                      fill
                      style={{
                        objectFit: "cover",
                        filter: selectedImage === index ? "opacity(0.5)" : "",
                      }}
                      className="rounded-full hover:scale-110 transition duration-300 ease-in-out bg-white"
                    />
                  </button>
                  <button
                    className="rounded-full bg-red-800 p-1 hover:scale-110 transition duration-300 ease-in-out absolute"
                    style={{ right: "-5px", top: "0" }}
                    onClick={() => {
                      if (selectedImage === index) {
                        if (selectedImage !== 0) setSelectedImage(index - 1);
                      }
                      dispatch({ type: "delete_image", index: index });
                    }}
                  >
                    <AiFillDelete color="white" />
                  </button>
                </div>
              ))}
              {images.length < 4 ? (
                <button
                  className="p-4 rounded-full emerald-button relative"
                  onClick={() => document.getElementById("images").click()}
                >
                  <MdCloudUpload className="text-2xl text-white" />
                </button>
              ) : null}
            </div>
            {selectedImage != null ? (
              <div className="bg-gray-100 rounded-3xl basis-4/5 p-4">
                <div className="flex flex-col lg:flex-row gap-6">
                  <Image
                    src={images[selectedImage].url}
                    className="basis-1/3 rounded-xl"
                    width={240}
                    height={240}
                    style={{ objectFit: "contain" }}
                    alt="Pyramids"
                    loading="eager"
                  />
                  <div className="basis-2/3 flex flex-col space-y-4">
                    <input
                      type="text"
                      placeholder="Title"
                      className="bg-gray-200"
                      onChange={(event) => {
                        setTitle(event.target.value);
                      }}
                      value={title}
                    />
                    <TagsInput tags={tags} setTags={setTags} />
                    <textarea
                      rows={6}
                      className="bg-gray-200"
                      placeholder="Write a description here..."
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
                    >
                      {description}
                    </textarea>
                    <div className="flex flex-row justify-end">
                      <button
                        onClick={submitPost}
                        disabled={isLoading}
                        className={`emerald-button rounded-lg ${
                          isLoading ? "bg-emerald-300" : null
                        }`}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center h-full">
                            <div role="status">
                              <svg
                                aria-hidden="true"
                                className="mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-300 fill-emerald-500"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        ) : null}
                        {isLoading ? "Processing..." : "Post"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        )}
      </Fragment>
    );
  }
}
