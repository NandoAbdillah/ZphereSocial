import { createRef, useState } from "react";
import JoditEditor from "jodit-react";
import html2pdf from "html2pdf.js";
import axiosClient from "../axios-client";

export default function CreateBook() {
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");

  const titleRef = createRef();
  const synopsisRef = createRef();
  const descriptionRef = createRef();
  const categoryRef = createRef();
  const thumbnailRef = createRef();

  const handleThumbnailChange = (e) => {
    setThumbnail(URL.createObjectURL(e.target.files[0]));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  //   // Ambil konten dari JoditEditor
  //   const editorContent = document.querySelector("#editorContent .jodit-wysiwyg");
  //   const htmlContent = editorContent.innerHTML; // Hanya ambil isi teks dan gambar dari editor

  
  //   const opt = {
  //     margin: 0.5,
  //     filename: `${titleRef.current.value}.pdf`,
  //     image: { type: "jpeg", quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: "in", format: "a4", orientation: "portrait" },  // Ubah format ke A4 atau gunakan orientation landscape
  //   };
    

  //   // Konversi konten HTML ke PDF menggunakan html2pdf.js
  //   html2pdf()
  //     .from(htmlContent)
  //     .set(opt)
  //     .output("blob")
  //     .then((pdfBlob) => {
  //       const formData = new FormData();
  //       const pdfFile = new File([pdfBlob], `${titleRef.current.value}.pdf`, {
  //         type: "application/pdf",
  //       });

  //       formData.append("title", titleRef.current.value);
  //       formData.append("thumbnail", thumbnailRef.current.files[0]);
  //       formData.append("synopsis", synopsisRef.current.value);
  //       formData.append("description", descriptionRef.current.value);
  //       formData.append("category", categoryRef.current.value);
  //       formData.append("content", pdfFile);

  //       axiosClient
  //         .post("/create-book", formData)
  //         .then((response) => {
  //           alert("Upload successful", response);
  //         })
  //         .catch((error) => {
  //           alert("Upload failed", error);
  //         });
  //     });
  // };

  const handleImageUpload = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ambil konten dari JoditEditor
    let editorContent = document.querySelector("#editorContent .jodit-wysiwyg").innerHTML;
  
    // Konversi semua gambar dalam editor ke base64
    const images = document.querySelectorAll("#editorContent .jodit-wysiwyg img");
    for (let img of images) {
      const imageUrl = img.src;
      if (!imageUrl.startsWith('data:')) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const base64Image = await handleImageUpload(blob);
        img.src = base64Image;  // Ganti src dengan base64
      }
    }
  
    // Setelah semua gambar dikonversi, buat PDF
    const opt = {
      margin: 0.5,
      filename: `${titleRef.current.value}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },  // Ubah format ke A4 atau gunakan orientation landscape
    };
  
    // Konversi konten HTML ke PDF menggunakan html2pdf.js
    html2pdf()
      .from(editorContent)
      .set(opt)
      .output("blob")
      .then((pdfBlob) => {
        const formData = new FormData();
        const pdfFile = new File([pdfBlob], `${titleRef.current.value}.pdf`, {
          type: "application/pdf",
        });
  
        formData.append("title", titleRef.current.value);
        formData.append("thumbnail", thumbnailRef.current.files[0]);
        formData.append("synopsis", synopsisRef.current.value);
        formData.append("description", descriptionRef.current.value);
        formData.append("category", categoryRef.current.value);
        formData.append("content", pdfFile);
  
        axiosClient
          .post("/create-book", formData)
          .then((response) => {
            alert("Upload successful", response);
          })
          .catch((error) => {
            alert("Upload failed", error);
          });
      });
  };
  

  return (
    <div className="container mt-5">
      <h1 className="mb-4" style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#333" }}>
        Buat Cerita Pendek
      </h1>

      <div className="form-group">
        <label htmlFor="title">Judul Cerpen</label>
        <input
          type="text"
          id="title"
          className="form-control"
          placeholder="Masukkan judul cerpen"
          ref={titleRef}
          style={{ fontSize: "1.5rem", padding: "10px" }}
        />
      </div>

      <div className="form-group">
        <label className="mont-font fw-600 font-xsss">Category</label>
        <select
          name="category"
          id="category"
          className="form-select"
          ref={categoryRef}
        >
          <option value="romance">Romance</option>
          <option value="mystery">Mystery</option>
          <option value="horror">Horror</option>
          <option value="science_fiction">Science Fiction</option>
          <option value="fantasy">Fantasy</option>
          <option value="historical_fiction">Historical Fiction</option>
          <option value="thriller">Thriller</option>
          <option value="drama">Drama</option>
          <option value="adventure">Adventure</option>
          <option value="comedy">Comedy</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="synopsis">Sinopsis</label>
        <textarea
          id="synopsis"
          className="form-control"
          placeholder="Masukkan sinopsis cerpen"
          ref={synopsisRef}
          style={{ fontSize: "1.2rem", padding: "10px", height: "100px" }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="creatorMessage">Pesan dari Creator</label>
        <textarea
          id="creatorMessage"
          className="form-control"
          placeholder="Masukkan pesan dari creator"
          ref={descriptionRef}
          style={{ fontSize: "1.2rem", padding: "10px", height: "80px" }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="thumbnail">Upload Thumbnail Cerpen</label>
        <input
          type="file"
          id="thumbnail"
          className="form-control-file"
          accept="image/*"
          onChange={handleThumbnailChange}
          ref={thumbnailRef}
        />
        {thumbnail && (
          <img
            src={thumbnail}
            alt="Thumbnail"
            className="img-fluid mt-3"
            style={{ borderRadius: "8px", maxHeight: "200px" }}
          />
        )}
      </div>

      <div className="form-group">
        <label htmlFor="content">Isi Cerpen</label>
        <div id="editorContent">
          <JoditEditor
            value={content}
            config={{ height: 400, toolbarSticky: false }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
      </div>

      <button className="btn btn-primary mr-2" onClick={handleSubmit}>
        Upload
      </button>
      <button className="btn btn-warning mr-2">Sinkronkan Versi</button>
      <button className="btn btn-secondary">Simpan Arsip</button>
    </div>
  );
}
