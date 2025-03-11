function toggleChildren(element) {
    let children = element.nextElementSibling;
    if (children) {
        children.classList.toggle("active");
    }
}

function toggleHierarchy() {
    let panel = document.getElementById("hierarchyPanel");
    panel.classList.toggle("hidden");
}
