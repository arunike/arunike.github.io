const extractColorFromImage = (imageSrc) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageSrc;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            );
            const data = imageData.data;

            let r = 0,
                g = 0,
                b = 0;
            let count = 0;

            for (let i = 0; i < data.length; i += 4 * 10) {
                const red = data[i];
                const green = data[i + 1];
                const blue = data[i + 2];
                const alpha = data[i + 3];

                if (
                    alpha > 100 &&
                    red + green + blue < 700 &&
                    red + green + blue > 50
                ) {
                    r += red;
                    g += green;
                    b += blue;
                    count++;
                }
            }

            if (count > 0) {
                r = Math.round(r / count);
                g = Math.round(g / count);
                b = Math.round(b / count);
                resolve(
                    `#${((1 << 24) + (r << 16) + (g << 8) + b)
                        .toString(16)
                        .slice(1)}`
                );
            } else {
                resolve("#000000");
            }
        };

        img.onerror = () => resolve("#000000");
    });
};

export default extractColorFromImage;
