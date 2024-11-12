"use strict"; 

const body = document.body;
const bgColorsBody = ["#ffb457", "#ff96bd", "#9999fb", "#ffe797", "#cffff1"];
const menu = body.querySelector(".menu");
const menuItems = menu.querySelectorAll(".menu__item");
const menuBorder = menu.querySelector(".menu__border");
const containerTest = document.querySelector(".containerTest"); // Reference to containerTest
let activeItem = menu.querySelector(".active");

function clickItem(item, index) {
    menu.style.removeProperty("--timeOut");
    
    if (activeItem === item) return;
    
    if (activeItem) {
        activeItem.classList.remove("active");
    }

    // Set active item and update background color of the body only
    item.classList.add("active");
    body.style.backgroundColor = bgColorsBody[index];
    activeItem = item;
    
    // Update the text content of containerTest based on the clicked item
    containerTest.textContent = item.querySelector(".text")?.textContent || `Item ${index + 1}`;
    
    offsetMenuBorder(activeItem, menuBorder);
}

function offsetMenuBorder(element, menuBorder) {
    const offsetActiveItem = element.getBoundingClientRect();
    const left = Math.floor(offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth - offsetActiveItem.width) / 4) + "px";
    menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;
}

// Initial setup
offsetMenuBorder(activeItem, menuBorder);

// Attach click event to each menu item
menuItems.forEach((item, index) => {
    item.addEventListener("click", () => clickItem(item, index));
});

// Handle window resize
window.addEventListener("resize", () => {
    offsetMenuBorder(activeItem, menuBorder);
    menu.style.setProperty("--timeOut", "none");
});
