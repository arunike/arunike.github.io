const REVEAL_TARGETS = [
    [".timeline-item", "timeline-animated"],
    [".skill-category", "skills-animated"],
    [".project-card", "project-card-animated"],
    [".course-card", "course-card-animated"],
    [".project-slide", "project-slide-animated"],
    [".expertise-card-3d", "expertise-card-3d-animated"],
    ["footer", "footer-revealed"],
];

const callbacks = new Set();

export const registerSweepCallback = (callback) => {
    callbacks.add(callback);
    return () => callbacks.delete(callback);
};

export const sweepMissedReveals = () => {
    let seen = 0;
    let pending = 0;

    REVEAL_TARGETS.forEach(([selector, className]) => {
        document.querySelectorAll(selector).forEach((element) => {
            seen += 1;

            if (element.classList.contains(className)) {
                return;
            }

            const rect = element.getBoundingClientRect();
            if (rect.top < 0 && rect.bottom <= window.innerHeight * 0.12) {
                element.classList.add(className);
                return;
            }

            pending += 1;
        });
    });

    callbacks.forEach((callback) => {
        seen += 1;
        if (!callback()) {
            pending += 1;
        }
    });

    return { seen, pending };
};

export default sweepMissedReveals;
