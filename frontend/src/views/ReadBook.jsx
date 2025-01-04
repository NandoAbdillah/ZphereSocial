import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axios-client';

function StoryHeader({ book }) {
  return (
    
      <header className="story-header mb-4 p-4 bg-light border-bottom">
      <h1 className="mb-3">{book.title}</h1>
      <div className="d-flex justify-content-between mb-2">
        <span className="text-muted">{book.genre}</span>
        <span className="text-muted">Rating: {}/5</span>
        <span className="text-muted">{book.views} views</span>
      </div>
      <p className="mb-3"><strong>Sinopsis:</strong> {book.synopsis}</p>
      <p className="mb-3"><strong>Deskripsi:</strong> {book.description}</p>
      <p className="text-muted">Dibuat pada: {book.created_at}</p>
    </header>
    
  );
}

function PDFViewer({ pdfUrl, currentPage, totalPages, onNavigate, onMarkReading }) {
  return (
    <div className="pdf-viewer mb-4" style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
      <embed 
        src={`${pdfUrl}#toolbar=0`} 
        width="100%" 
        height="600px" 
        type="application/pdf" 
        style={{ border: 'none' }}
      />
      <div className="pdf-controls d-flex justify-content-between mt-3 p-3 bg-light">
        <button className="btn btn-secondary" onClick={() => onNavigate(currentPage - 1)} disabled={currentPage === 1}>
          Sebelumnya
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button className="btn btn-secondary" onClick={() => onNavigate(currentPage + 1)} disabled={currentPage === totalPages}>
          Selanjutnya
        </button>
      </div>
      <button className="btn btn-primary mt-3 w-100" onClick={onMarkReading}>
        Tandai Akhir Bacaan
      </button>
    </div>
  );
}

function ReviewSection({ reviews, onLike, onComment }) {
  return (
    <div className="review-section">
      <h3>Review & Komentar</h3>
      {reviews.map((review, index) => (
        <div key={index} className="review mb-3 p-3 border rounded">
          <p><strong>{review.user}</strong>: {review.comment}</p>
          <div className="d-flex justify-content-between">
            <span className="text-muted">{review.date}</span>
            <button className="btn btn-sm btn-outline-primary" onClick={() => onLike(index)}>Like ({review.likes})</button>
          </div>
        </div>
      ))}
      <div className="add-comment mt-4">
        <textarea className="form-control" rows="3" placeholder="Tambahkan komentar..."></textarea>
        <button className="btn btn-success mt-2">Kirim Komentar</button>
      </div>
    </div>
  );
}

function ReadBook() {
  
  const {id} = useParams();
  const [book, setBook] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [markedPage, setMarkedPage] = useState(null);
  const totalPages = 10; // Example
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const savedPage = localStorage.getItem('lastReadPage');
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    }
  }, []);

  useEffect(() => {
    axiosClient
    .get('/book', {params : {id : id}})
    .then((response) => {
      setBook(response.data.data[0]);
      setPdfUrl(`${import.meta.env.VITE_ASSET_URL}${response.data.data[0].content}`)
    })
    .catch((error) => {
      alert('tidak dapat memuat buku')
    })

  }, [])

  const handlePageNavigate = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      localStorage.setItem('lastReadPage', page);
    }
  };

  const handleMarkReading = () => {
    setMarkedPage(currentPage);
    alert(`Bacaan ditandai di halaman ${currentPage}`);
  };

  const reviews = [
    { user: "John Doe", comment: "Sangat menarik!", likes: 10, date: "2024-08-31" },
    { user: "Jane Smith", comment: "Saya suka cerita ini.", likes: 7, date: "2024-08-30" },
  ];

  return (
    <>
    {
    
      book && pdfUrl && (
        <div className="story-page container mt-5">
      <StoryHeader
        book={book}
      />
      <PDFViewer
        pdfUrl={pdfUrl}
        currentPage={currentPage}
        totalPages={totalPages}
        onNavigate={handlePageNavigate}
        onMarkReading={handleMarkReading}
      />
      <ReviewSection
        reviews={reviews}
        onLike={(index) => console.log("Liked review", index)}
        onComment={(text) => console.log("Commented:", text)}
      />
    </div>
      )
      
    }
    </>
  );
}

export default ReadBook;
