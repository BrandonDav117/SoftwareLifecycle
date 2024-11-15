"use strict";

const body = document.body;
const bgColorsBody = ["#ffb457", "#ff96bd", "#9999fb", "#ffe797", "#cffff1"];

const menus = [
  document.querySelector("#menu1"),
  document.querySelector("#menu2"),
  document.querySelector("#menu3"),
  document.querySelector("#menu4")
];

const containerTest = document.querySelector(".containerTest");

let activeItems = [null, null, null, null]; // Array to keep track of active items for each menu
let menuBorders = menus.map(menu => menu.querySelector(".menu__border"));

// Function to handle item click in each menu
function clickMenuItem(menuIndex, item, index) {
    // Deactivate the current active item in any menu
    menus.forEach((menu, i) => {
        if (i !== menuIndex && activeItems[i]) {
            activeItems[i].classList.remove("active");
            resetMenuBorder(menuBorders[i]); // Reset the inactive menu's border
        }
    });

    // Deactivate the current active item in the current menu if any
    if (activeItems[menuIndex]) {
        activeItems[menuIndex].classList.remove("active");
    }

    // Activate the clicked item in the current menu
    item.classList.add("active");
    body.style.backgroundColor = bgColorsBody[index];
    activeItems[menuIndex] = item;

    // Update containerTest text based on the clicked item
    containerTest.textContent = item.querySelector(".text")?.textContent || `Item ${index + 1}`;

    // Offset the border for the current menu
    offsetMenuBorder(activeItems[menuIndex], menuBorders[menuIndex], menus[menuIndex]);
}

// Function to offset the menu border based on active item position
function offsetMenuBorder(element, menuBorder, menu) {
    const offsetActiveItem = element.getBoundingClientRect();
    const left = Math.floor(
        offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth - offsetActiveItem.width) / 2
    ) + "px";
    menuBorder.style.transform = `translate3d(${left}, 0, 0)`;
    menuBorder.style.opacity = 1; // Show the border when active
}

// Function to reset the border of an inactive menu
function resetMenuBorder(menuBorder) {
    menuBorder.style.transform = "translate3d(0, 0, 0)";
    menuBorder.style.opacity = 0; // Hide the border when inactive
}

// Initial setup for each menu
menus.forEach((menu, menuIndex) => {
    const menuItems = menu.querySelectorAll(".menu__item");

    // Reset the border initially and deactivate all items
    resetMenuBorder(menuBorders[menuIndex]);
    menuItems.forEach(item => item.classList.remove("active"));

    // Attach click event to each item in the menu
    menuItems.forEach((item, index) => {
        item.addEventListener("click", () => clickMenuItem(menuIndex, item, index));
    });
});

// Handle window resize to reset positions
window.addEventListener("resize", () => {
    menus.forEach((menu, menuIndex) => {
        if (activeItems[menuIndex]) offsetMenuBorder(activeItems[menuIndex], menuBorders[menuIndex], menu);
        else resetMenuBorder(menuBorders[menuIndex]);
    });
});
