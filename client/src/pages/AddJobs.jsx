import React, { useState, useRef, useEffect, useContext } from "react";
import Quill from "quill";

import { JobCategories, JobLocations } from "../assets/assets";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import "quill/dist/quill.snow.css";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner level");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendUrl, companyToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/post-job",
        { title, description, salary, location, level, category },
        { headers: { token: companyToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setSalary("");
        setDescription("");
        quillRef.current.root.innerHTML = ""; // clear editor
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Type the job description here...",
      });

      quillRef.current.on("text-change", () => {
        setDescription(quillRef.current.root.innerHTML);
      });
    }
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className="container p-4 flex flex-col w-full items-start gap-3">
      <div className="w-full">
        <p className="mb-2">Job Title</p>
        <input
          type="text"
          placeholder="Type here"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          className="w-full max-w-lg px-3 py-2 border border-gray-300 rounded"
        />
      </div>

      <div className="w-full max-w-3xl">
        <p className="my-2">Job Description</p>
        <div ref={editorRef} className="h-60 border border-gray-300 rounded mb-2" />
      </div>

      <div className="w-full max-w-3xl bg-gray-100 p-3 rounded">
        <p className="font-semibold mb-1">Preview:</p>
        <div
          className="prose max-w-full"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Job Category</p>
          <select className="w-full px-3 py-2 border-2 border-gray-300 rounded" onChange={(e) => setCategory(e.target.value)}>
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Job Location</p>
          <select className="w-full px-3 py-2 border-2 border-gray-300 rounded" onChange={(e) => setLocation(e.target.value)}>
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Job Level</p>
          <select className="w-full px-3 py-2 border-2 border-gray-300 rounded" onChange={(e) => setLevel(e.target.value)}>
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>
      </div>

      <div>
        <p className="mb-2">Job Salary</p>
        <input
          min={0}
          type="number"
          placeholder="2500"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]"
        />
      </div>
      <button className="w-28 py-3 mt-4 bg-black text-white rounded">ADD</button>
    </form>
  );
};

export default AddJob;
