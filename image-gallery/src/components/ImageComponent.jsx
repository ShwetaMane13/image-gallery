const ImageComponent = (props) => {
  const {hover, index, i, image, showDetailsOnHover, hideDetailsOnLeave, fetchImageById, setShowModal} = props;
  return (
    <section className="position: relative flex justify-center items-center cursor-pointer">
      <img
        className="border rounded-lg"
        onMouseEnter={() => showDetailsOnHover(i)}
        onMouseLeave={() => hideDetailsOnLeave()}
        onClick={() => {
          fetchImageById(image.id);
          setShowModal(true);
        }}
        src={image.urls?.raw}
      />
      {hover && index == i ? (
        <section className="h-auto w-40 p-5 border flex items-center justify-center border-slate-200 position: absolute bg-white">
          <span>{image.alt_description}</span>
        </section>
      ) : null}
    </section>
  );
};

export default ImageComponent;
