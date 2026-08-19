function processImages() {
    document.querySelectorAll(".md-content img").forEach((img) => {

        // Добавляем подпись
        if (!img.closest("figure")) {
            const alt = img.getAttribute("alt");

            if (alt && alt.trim() !== "" && alt !== "alt text") {
                const figure = document.createElement("figure");
                figure.className = "image-with-caption";

                img.parentNode.insertBefore(figure, img);
                figure.appendChild(img);

                const caption = document.createElement("figcaption");
                caption.textContent = alt;
                figure.appendChild(caption);
            }
        }

        // Уменьшаем очень высокие скриншоты
        const checkImage = () => {
            if (img.naturalHeight > img.naturalWidth * 1.7) {
                img.classList.add("tall-screenshot");
            }
        };

        if (img.complete) {
            checkImage();
        } else {
            img.addEventListener("load", checkImage, { once: true });
        }
    });
}


// Запускаем при первоначальной загрузке
document.addEventListener("DOMContentLoaded", processImages);


// Следим за изменениями страницы
const observer = new MutationObserver(() => {
    processImages();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});