import gsap from "gsap";

const FeaturedProjectsSlider = ({ projects, sectionRef }) => {
    return (
        <div className="featured-projects-slider" ref={sectionRef}>
            {projects.map((project, index) => (
                <div className="project-slide" key={index}>
                    <div className="slide-content">
                        <span className="project-watermark">
                            {`0${index + 1}`}
                        </span>
                        <h3 className="project-cat">{project.category}</h3>
                        <h2 className="project-title">{project.title}</h2>
                        <p className="project-desc">{project.description}</p>

                        <div className="project-tags">
                            {project.tags.map((tag, i) => (
                                <span key={i} className="p-tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div
                        className="slide-visual"
                        onMouseMove={(e) => {
                            const rect =
                                e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left - rect.width / 2;
                            const y = e.clientY - rect.top - rect.height / 2;

                            const imgWrapper =
                                e.currentTarget.querySelector(".img-wrapper");

                            gsap.to(imgWrapper, {
                                x: x * 0.1,
                                y: y * 0.1,
                                rotationY: x * 0.05,
                                rotationX: -y * 0.05,
                                duration: 0.5,
                                ease: "power2.out",
                            });
                        }}
                        onMouseLeave={(e) => {
                            const imgWrapper =
                                e.currentTarget.querySelector(".img-wrapper");
                            gsap.to(imgWrapper, {
                                x: 0,
                                y: 0,
                                rotationY: 0,
                                rotationX: 0,
                                duration: 0.5,
                                ease: "power2.out",
                            });
                        }}
                    >
                        <div
                            className="img-wrapper"
                            style={{ perspective: "1000px" }}
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                loading={index === 0 ? "eager" : "lazy"}
                                decoding="async"
                                className="img-fade"
                                onLoad={(e) =>
                                    e.currentTarget.classList.add("img-loaded")
                                }
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeaturedProjectsSlider;
