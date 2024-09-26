import { useEffect, useState } from "react";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import axios from "axios";

import SearchBar from "./SearchBar";
import ImageComponent from "./ImageComponent";
import BasicModal from "./common/BasicModal";

const ImageContainer = () => {
  const [images, setImages] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hover, setHover] = useState(false);
  const [index, setIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    if (loading == true) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  //api methods can be refactored further if they are to be reused in other components
  const fetchImages = async () => {
    //client id can be stored in dotenv
    try {
      const url = `https://api.unsplash.com/photos/?page=${page}&per_page=20&client_id=hddB5mZ7vphMkcZY1SIrvXEb_AaQg4AJiEC6VviAMMU`;

      const { data } = await axios.get(url);
      console.log(data);
      setImages([...images, ...data]);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchImagesByKeyword = async () => {
    try {
      const url = `https://api.unsplash.com/search/photos/?client_id=hddB5mZ7vphMkcZY1SIrvXEb_AaQg4AJiEC6VviAMMU&query=${keyword}`;

      const { data } = await axios.get(url);
      setImages(data.results);
      setKeyword("");
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchImageById = async (id) => {
    try {
      const url = `https://api.unsplash.com/photos/${id}?client_id=hddB5mZ7vphMkcZY1SIrvXEb_AaQg4AJiEC6VviAMMU`;

      const { data } = await axios.get(url);
      setModalData(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  //infinte scroll
  const handleScroll = () => {
    if (
      document.body.scrollHeight - 300 <
      window.scrollY + window.innerHeight
    ) {
      setLoading(true);
    }
  };

  //debouncing can be implemented for the scroll to prevent frequent calls to the api
  window.addEventListener("scroll", handleScroll);

  const showDetailsOnHover = (i) => {
    setHover(true);
    setIndex(i);
  };

  const hideDetailsOnLeave = () => {
    setHover(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-5xl font-bold text-center text-green-200">
        Image Gallery
      </h1>
      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        fetchImagesByKeyword={fetchImagesByKeyword}
      />
      <section>
        {/* masonry layout and hover effect */}
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="20px">
            {images.map((image, i) => {
              return (
                <ImageComponent
                  i={i}
                  hover={hover}
                  index={index}
                  image={image}
                  showDetailsOnHover={showDetailsOnHover}
                  hideDetailsOnLeave={hideDetailsOnLeave}
                  fetchImageById={fetchImageById}
                  setShowModal={setShowModal}
                />
              );
            })}
          </Masonry>
        </ResponsiveMasonry>

        {/* lighbox effect using modal */}
        <BasicModal
          showModal={showModal}
          handleClose={handleClose}
          modalData={modalData}
        />
      </section>
    </div>
  );
};

export default ImageContainer;
