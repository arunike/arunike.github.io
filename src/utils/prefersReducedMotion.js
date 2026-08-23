const QUERY = "(prefers-reduced-motion: reduce)";

const getMediaQueryList = () => {
    if (typeof window === "undefined" || !window.matchMedia) {
        return null;
    }

    return window.matchMedia(QUERY);
};

export const prefersReducedMotion = () => Boolean(getMediaQueryList()?.matches);

export const onReducedMotionChange = (handler) => {
    const mediaQueryList = getMediaQueryList();
    if (!mediaQueryList) {
        return () => {};
    }

    const listener = (event) => handler(event.matches);
    mediaQueryList.addEventListener("change", listener);

    return () => mediaQueryList.removeEventListener("change", listener);
};

export default prefersReducedMotion;
