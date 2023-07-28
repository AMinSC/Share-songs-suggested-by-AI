/* loading.js */
const mask = document.querySelector('#mask');
const loadingImg = document.querySelector('.loading-img');

export function LoadingWithMask(gif) {
    loadingImg.src = gif;
    mask.style.display = 'block';
    loadingImg.style.display = 'block';
}

export function closeLoadingWithMask() {
    mask.style.display = 'none';
    loadingImg.style.display = 'none';
}
