
const Brand = () => {
  const items = [
    'Web Development', '✦', 'Mobile Apps', '✦',
    'UI/UX Design', '✦', 'E-Commerce', '✦',
    'Digital Strategy', '✦', 'Maintenance', '✦',
    'React', '✦', 'Flutter', '✦', 'Laravel', '✦',
  ];
  const doubled = [...items, ...items];

  return (
    <div className="marquee-band">
      <div className="marquee-track">
        {doubled.map((item, index) => (
          <span key={index} className={item === '✦' ? 'dot' : ''}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Brand;