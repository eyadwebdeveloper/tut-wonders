import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const CtaBand = ({ onOpenBot }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document
      .querySelectorAll(
        ".cta-title.reveal, .cta-sub.reveal, .cta-actions.reveal",
      )
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="cta">
      <div className="container">
        <h2 className="cta-title reveal">{t("cta.title")}</h2>
        <p className="cta-sub reveal">{t("cta.subtitle")}</p>
        <div className="cta-actions reveal">
          <button
            className="btn-white"
            onClick={onOpenBot}
            style={{ cursor: "pointer", border: "none" }}
          >
            {t("cta.button")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CtaBand;
