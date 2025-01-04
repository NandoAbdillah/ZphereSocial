import { useState } from 'react';
import axiosClient from '../axios-client';

export default function CreateGroup() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [icon, setIcon] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('type', type);
    formData.append('icon', icon);
    formData.append('thumbnail', thumbnail);
    formData.append('description', description);

    console.log([...formData]);

    axiosClient
      .post("/create-group", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        e.target.reset();
        setName('');
        setLocation('');
        setType('');
        setIcon(null);
        setThumbnail(null);
        setDescription('');
        setErrors([]);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    
    
    <div className="middle-sidebar-bottom ">
      <div className="middle-sidebar-left">
        
          <div className="col-xl-10 mb-4 mx-auto card shadow-xss">
            <div className="row">
              <div className="col-lg-12 mb-3">
                <div className="card p-lg-5 p-4 bg-primary-gradiant rounded-3 shadow-xss bg-pattern border-0 overflow-hidden ">
                  <div className="bg-pattern-div"></div>
                  <h2 className="display2-size display2-md-size fw-700 text-white mb-0 mt-0">Create Your Own Group</h2>
                </div>
              </div>
            </div>

            <div className="row ">
              <div className="col-xl-8 col-lg-8 mx-auto">
                <div className="page-title mt-3">
                  <p className="text-center text-info mx-auto ">
                    Provide the required information in order to create a group
                  </p>
                  <form onSubmit={handleSubmit} encType="multipart/form-data" className='mb-5'>
                    <div className="row mx-auto">
                      <div className="col-12">
                        {errors.length > 0 && errors.map((error, index) => (
                          <div className="alert alert-danger" role="alert" key={index}>
                            {error}
                          </div>
                        ))}
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xssss">Group Name</label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xssss">Location</label>
                          <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row mx-auto">
                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xssss">Type</label>
                          <input
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row mx-auto">
                      <div className="col-lg-12 mb-3">
                        <label className="mont-font fw-600 font-xssss">Page Icon</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            id="icon"
                            onChange={(e) => handleFileChange(e, setIcon)}
                            className="custom-file-input"
                          />
                          <label htmlFor="icon" className="custom-file-label">Page Icon</label>
                        </div>
                      </div>
                    </div>

                    <div className="row mx-auto">
                      <div className="col-12">
                        {icon && <img src={URL.createObjectURL(icon)} alt="Icon" width="50px" height="25px" style={{ objectFit: 'cover' }} />}
                      </div>
                    </div>

                    <div className="row mx-auto">
                      <div className="col-lg-12 mb-3">
                        <label className="mont-font fw-600 font-xssss">Page Thumbnail</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            id="thumbnail"
                            onChange={(e) => handleFileChange(e, setThumbnail)}
                            className="custom-file-input"
                          />
                          <label htmlFor="thumbnail" className="custom-file-label">Page Thumbnail</label>
                        </div>
                      </div>
                    </div>

                    <div className="row mx-auto">
                      <div className="col-12">
                        {thumbnail && <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail" width="50px" height="25px" style={{ objectFit: 'cover' }} />}
                      </div>
                    </div>

                    <div className="row mx-auto">
                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label htmlFor="description">Group Description</label>
                          <textarea
                            name="description"
                            id="description"
                            className="overflow-hidden form-control"
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="row mx-auto">
                      <div className="col-lg-12 mb-3">
                        <button className="btn bg-current text-white" type="submit">Create Pages</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        
      </div>
    </div>
  
          
  );
}
