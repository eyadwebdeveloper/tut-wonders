import { useTranslation } from 'react-i18next';

const Brand = () => {
  const { t } = useTranslation();
  const items = t('brand.items', { returnObjects: true });
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