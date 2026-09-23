export default function PageIntro({ title, children, image }) {
  return (
    <section className={`page-intro ${image ? 'page-intro--image' : ''}`}>
      {image && <img className="page-intro__bg" src={image} alt="" />}
      <div className="page-intro__inner">
        <h1 className="display">{title}</h1>
        {children && <p className="page-intro__lede">{children}</p>}
      </div>
    </section>
  );
}
