import LogoImg from '../images/favicon.png';

const Loader = ({ loading }) => {
  return (
    <div id="loader" className={loading ? '' : 'hidden'}>
      <div className="loader-logo-wrap">
        <img src={LogoImg} alt="Tut Wonders" className="loader-logo" />
        <div className="loader-ring" />
      </div>
      <p className="loader-text">LOADING TUT WONDERS</p>
    </div>
  );
};

export default Loader;