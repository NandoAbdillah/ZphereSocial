import { useState, useEffect, useRef } from "react";
import axiosClient from "../axios-client";
import { message, notification } from "antd";
import { useStateContext } from "../contexts/ContextProvider";
import CubeLoader from "../components/CubeLoader";
import styled from "styled-components";

function GroupsButton({ status, groupId, fetchGroupStatus }) {
  const joinGroup = (group_id) => {
    axiosClient
      .get(`/group/${group_id}/join`)
      .then((response) => {
        fetchGroupStatus(group_id);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const leaveGroup = (group_id) => {
    axiosClient
      .get(`/group/${group_id}/leave`)
      .then((response) => {
        fetchGroupStatus(group_id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <StyledWrapper>
      <button
        className="text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl font-xsssss fw-700 ls-lg text-white"
        style={{
          backgroundImage: `${
            status === "hasJoin"
              ? "linear-gradient(30deg, #fe9431, #ffffff)" // Gradien untuk warna warning
              : "linear-gradient(30deg, #0400ff, #4ce3f7)"
          }`, // Gradien untuk warna biru
        }}
        onClick={
          status === "hasJoin"
            ? () => leaveGroup(groupId)
            : () => joinGroup(groupId)
        }
      >
        {status === "hasJoin" ? "LEAVE" : "JOIN"}
      </button>
    </StyledWrapper>
  );
}

export default function Groups() {
  const { user, token } = useStateContext();
  const [search, setSearch] = useState("");
  const [groups, setGroups] = useState([]);
  const [groupStatus, setGroupStatus] = useState({});
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!hasLoaded.current) {
      loadGroups();
      hasLoaded.current = true; // Set to true after the first call
    }
  }, []);

  const loadGroups = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/groups?page=${page}`);
      const newGroups = response.data.data || [];

      // Filter out duplicates
      const uniqueGroups = newGroups.filter(
        (newGroup) => !groups.some((group) => group.id === newGroup.id)
      );

      setGroups((prevGroups) => [...prevGroups, ...uniqueGroups]);
      setLoading(false);
      setCurrentPage(page);

      setHasMore(
        response.data.meta.current_page < response.data.meta.last_page
      );
    } catch (err) {
      setLoading(false);
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
    }
  };

  const fetchGroups = (searchQuery = "") => {
    setGroups([]);
    setLoading(true);
    axiosClient
      .get("/get-groups", {
        params: { search: searchQuery },
      })
      .then((response) => {
        setGroups(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
        setLoading(false);
      });
  };



  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadGroups(currentPage + 1);
    }
  };

  useEffect(() => {
    if (isInputFocused && search) {
      fetchGroups(search);
    }
  }, [search, isInputFocused]);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  useEffect(() => {
    if (groups.length > 0) {
      groups.forEach((group) => {
        fetchGroupStatus(group.id);
      });
    }
  }, [groups]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchGroupStatus = (group_id) => {
    axiosClient
      .get(`/group/${group_id}/status`)
      .then((response) => {
        setGroupStatus((prevGroup) => ({
          ...prevGroup,
          [group_id]: {
            status: response.data.status,
          },
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openNotification = (type, message, description) => {
    notification[type] = {
      message: message,
      description: description,
    };
  };

  if (Object.keys(groupStatus).length < 5) {
    return <CubeLoader />;
  }

  return (
    <>
      {groups && Object.keys(groupStatus).length > 5 && (
        <div className="col-xl-12">
          <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
            <div className="card-body d-flex align-items-center p-0">
              <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">Group</h2>

              <div className="search-form-2 ms-auto">
                <i className="ti-search font-xss"></i>
                <input
                  type="text"
                  className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
                  placeholder="Search here."
                  value={search}
                  onChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
              <a href="/create-group">
                <i
                  className="btn-round-md ms-2  theme-dark-bg bg-current rounded-3 text-center feather-plus"
                  style={{ fontSize: "30px", color: "white" }}
                ></i>
              </a>
            </div>
          </div>

          <div className="row ps-2 pe-1">
            {groups.length > 0 ? (
              groups.map((group) => (
                <div className="col-md-6 col-sm-6 pe-2 ps-2" key={group.id}>
                  <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                    <div
                      className="card-body position-relative h100 bg-image-cover bg-image-center"
                      style={{
                        backgroundImage: `url(${
                          import.meta.env.VITE_ASSET_URL
                        }${group.thumbnail} )`,
                      }}
                    ></div>
                    <div className="card-body d-block w-100 pl-10 pe-4 pb-4 pt-0 text-left position-relative">
                      <a href={`/group/${group.uuid}/${group.id}`}>
                        <figure
                          className="avatar position-absolute w75 z-index-1"
                          style={{
                            top: "-40px",
                            left: "15px",
                          }}
                        >
                          <a href={`/group/${group.uuid}/${group.id}`}>
                            <img
                              src={`${import.meta.env.VITE_ASSET_URL}/${
                                group.icon
                              }`}
                              alt="image"
                              className="float-right p-1 bg-white w-100 rounded-xxl"
                              style={{
                                width: "5rem",
                                height: "5rem",
                                objectFit: "cover",
                              }}
                            />
                          </a>
                        </figure>
                        <div className="clearfix"></div>
                        <h4 className="fw-700 font-xsss mt-3 mb-1">
                          {group.name}
                        </h4>
                        <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">
                          {`${group.members} Members - ${group.postsCount} Posts`}
                        </p>
                      </a>
                      <span className="position-absolute right-15 top-0 d-flex align-items-center">
                        {user.id == group.admin.id && (
                          <a
                            href={`/edit-group/${group.id}`}
                            className="d-lg-block d-none"
                          >
                            <i className="feather-edit-2 btn-round-md font-md bg-primary-gradiant text-white"></i>
                          </a>
                        )}

                        {groupStatus[group.id] && (
                          <GroupsButton
                            status={groupStatus[group.id].status}
                            groupId={group.id}
                            fetchGroupStatus={fetchGroupStatus}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-center text-danger">No Pages Found!</h1>
            )}
          </div>

          {loading && <h1>Loading...</h1>}
          {!loading && hasMore && !isInputFocused && (
            <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
              <div
                className="snippet mt-2 ms-auto me-auto"
                data-title=".dot-typing"
              >
                <div className="stage mx-auto">
                  <div
                    className="dot-typing"
                    style={{ marginLeft: "-4rem" }}
                  ></div>
                  <button
                    onClick={handleLoadMore}
                    className="position-absolute btn "
                    style={{
                      marginTop: "-1.5rem",
                      marginLeft: "-3rem",
                    }}
                  >
                    LOAD MORE
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

const StyledWrapper = styled.div`
  button {
    border: none;
    color: #fff;

    border-radius: 20px;
    background-size: 100% auto;
    font-family: inherit;
    font-size: 17px;
    padding: 0.6em 1.5em;
  }

  button:hover {
    background-position: right center;
    background-size: 200% auto;
    -webkit-animation: pulse 2s infinite;
    animation: pulse512 1.5s infinite;
  }

  @keyframes pulse512 {
    0% {
      box-shadow: 0 0 0 0 #05bada66;
    }

    70% {
      box-shadow: 0 0 0 10px rgb(218 103 68 / 0%);
    }

    100% {
      box-shadow: 0 0 0 0 rgb(218 103 68 / 0%);
    }
  }
`;
