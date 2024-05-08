import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useSnackbar} from 'notistack'

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {enqueueSnackbar} = useSnackbar();

  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/books/${id}`).then((res) => {
      setTitle(res.data.title);
      setAuthor(res.data.author);
      setPublishYear(res.data.publishYear);
      setLoading(false)
    }).catch((err) => {
      setLoading(false)
      alert("An error happened. Please check console.")
      console.log(err);
    })
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:3000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book created successfully", {variant: "success"})
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        // alert("An error happened. Please check console");
        enqueueSnackbar("Error", {variant: "error"})
        console.log(err);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4 flex justify-between">
          <label className="text-xl mr-4 text-gray-500 max-w-[300px]">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 my-2 w-[300px]"
          />
        </div>
        <div className="my-4 flex justify-between">
          <label className="text-xl mr-4 text-gray-500 max-w-[300px]">
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 my-2 w-[300px]"
          />
        </div>
        <div className="my-4 flex justify-between">
          <label className="text-xl mr-4 text-gray-500 max-w-[300px]">
            Publish Year
          </label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 my-2 w-[300px]"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
