export function HeaderOnScroll() {
    const header = document.getElementById('HeaderBack');

    if (document.body.scrollTop == 0) {
        header.style.borderBottomColor = 'white';
    } else {
        header.style.borderBottomColor = 'black';
    }
}