
const testimonialsData = [
  { text: "Tut Wonders transformed our digital presence completely. The website they built is fast, beautiful, and our conversions have doubled since launch.", name: "Sara El-Sayed", role: "CEO, Cairo Startup", init: "SE" },
  { text: "Professional team with real attention to detail. Our mobile app was delivered on time and the code quality is excellent.", name: "Mohammed Ali", role: "Product Manager, Tech Co.", init: "MA" },
  { text: "They understood our brand from the very first call. The UI/UX work they delivered felt like magic — our users love it.", name: "Lina Karim", role: "Founder, Fashion Brand", init: "LK" },
  { text: "Outstanding communication throughout the project. They gave us honest advice and pushed back when our ideas weren't optimal. That's rare.", name: "Ahmed Farouk", role: "Director, E-Commerce Store", init: "AF" },
  { text: "The maintenance plan they set up has saved us countless hours. Issues get resolved before we even notice them.", name: "Yasmine Nasser", role: "COO, Media Agency", init: "YN" },
  { text: "Highly skilled developers who actually care about your business outcome, not just completing the scope. A true partner.", name: "Omar Hassan", role: "Entrepreneur", init: "OH" },
];

const Testimonials = () => {
  const allTestimonials = [...testimonialsData, ...testimonialsData];

  return (
    <section id="testimonials">
      <div className="container">
        <div className="testimonials-header">
          <p className="section-label reveal">Client Stories</p>
          <h2 className="section-title reveal">What Our Clients Say</h2>
        </div>
      </div>
      <div className="testimonials-track-wrap">
        <div className="testimonials-track">
          {allTestimonials.map((t, index) => (
            <div key={index} className="testimonial-card">
              <div className="t-quote">"</div>
              <p className="t-text">{t.text}</p>
              <div className="t-author">
                <div className="t-avatar">{t.init}</div>
                <div>
                  <p className="t-name">{t.name}</p>
                  <p className="t-role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;