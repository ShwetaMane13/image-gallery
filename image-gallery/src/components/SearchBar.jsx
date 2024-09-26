const SearchBar = (props) => {
  const {keyword, setKeyword, fetchImagesByKeyword} = props;
  return (
    <section className="flex justify-center gap-5">
      <input
        className="border border-black-300 outline-0 p-2"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        type="text"
      />
      <button
        className="bg-green-200 border border-green-400 text-green-400 font-bold px-3 py-1"
        onClick={fetchImagesByKeyword}
      >
        Search
      </button>
    </section>
  );
};

export default SearchBar;
