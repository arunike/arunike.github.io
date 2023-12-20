const ProjectCardEffect = (selector) => {
    const animations = ['slideFromLeft', 'slideFromRight', 'slideFromTop', 'slideFromBottom'];

    const applyRandomAnimation = (element) => {
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        element.style.animation = `${randomAnimation} 1s forwards`;
    };

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            applyRandomAnimation(entry.target);
            observerInstance.unobserve(entry.target);
            }
        });
    }, options);

    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
        observer.observe(element);
    });
};

export default ProjectCardEffect;