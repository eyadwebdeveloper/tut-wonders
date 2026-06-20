
const Loader = ({ loading }) => {
  return (
    <div id="loader" className={loading ? '' : 'hidden'}>
      <div className="loader-ankh"></div>
      <p className="loader-text">LOADING TUT WONDERS</p>
    </div>
  );
};

export default Loader;