"use strict";

const body = document.body;
const bgColorsBody = ["#ffb457", "#ff96bd", "#9999fb", "#ffe797", "#cffff1"];

const menus = [
  document.querySelector("#menu1"),
  document.querySelector("#menu2"),
  document.querySelector("#menu3"),
  document.querySelector("#menu4")
];

const rightDisplay = document.querySelector(".rightDisplay");
const leftDisplay = document.querySelector(".leftDisplay");

let activeItems = [null, null, null, null];
let menuBorders = menus.map(menu => menu.querySelector(".menu__border"));

const rightDisplayContent = {
  menu1: [
    { title: "Start", heading: "", subHeading: "Welcome to our interactive guide to the development lifecycle for creating a software medical device.", description: "" },
    { title: "Company", heading: "Organize", subHeading: "Set up your company structure and ensure regulatory compliance.", description: "Establish a legal company structure and define the roles and responsibilities for the team." },
    { title: "QMS", heading: "Quality Management System", subHeading: "Implement a quality management system for regulatory adherence.", description: "Ensure that your development and documentation adhere to the relevant standards such as ISO 13485." },
    { title: "Tech File", heading: "Technical File", subHeading: "Prepare documentation to demonstrate compliance.", description: "Compile the necessary technical documentation, including risk assessments, for your medical device." }
  ],
  menu2: [
    { title: "Specify", heading: "Requirements", subHeading: "Define the functional and non-functional requirements.", description: "Clearly specify what your device should do and the conditions it must meet." },
    { title: "Design", heading: "Design Specifications", subHeading: "Develop detailed plans for your device.", description: "Draft the design inputs and outputs, including system architecture and user interface." },
    { title: "Implement", heading: "Development", subHeading: "Turn your design into reality.", description: "Code and build the device, ensuring adherence to design specifications." },
    { title: "Verify", heading: "Verification", subHeading: "Check the implementation against the design.", description: "Conduct verification activities to ensure the product meets design specifications." },
    { title: "Validate", heading: "Validation", subHeading: "Ensure the device meets user needs.", description: "Perform validation to confirm the product satisfies the intended use." }
  ],
  menu3: [
    { title: "Submit", heading: "Regulatory Submission", subHeading: "Prepare and submit your regulatory application.", description: "Compile the submission package and send it to the relevant regulatory authority." },
    { title: "Rollout", heading: "Product Launch", subHeading: "Introduce your device to the market.", description: "Plan and execute the marketing and distribution strategy." },
    { title: "Maintain", heading: "Post-Market Surveillance", subHeading: "Monitor and maintain your product.", description: "Collect feedback, monitor performance, and handle any issues that arise post-launch." }
  ],
  menu4: [
    { title: "Finish", heading: "Project Completion", subHeading: "Wrap up and reflect on the project.", description: "Conduct a final review, archive documentation, and identify lessons learned for future projects." }
  ]
};

const subCategoryContent = [
  { title: "Start", heading: "Need", subHeading: "", description: "It is a good idea to start your project by identifying an unmet clinical need. To do this, you will need to immerse yourself in a clinical setting and use this experience to identify a problem that requires solving." },
  { title: "Start", heading: "Idea", subHeading: "", description: "During the process of understanding the clinical problem you have identified, you may have an innovative idea for a potential solution. This can range from an elegant engineering solution to the development of a novel technology. " },
  { title: "Start", heading: "Device Class", subHeading: "", description: "Once you have a firm vision of your software medical device, it is important to ascertain its medical device class. You will need to do this for each regulatory jurisdiction within which you intend to market your device. The device class will determine the exact regulatory path and the documentation that will need to be produced." },
  { title: "Company", heading: "Placeholder Heading 3", subHeading: "Placeholder SubHeading 3", description: "This is a placeholder description for subcategory 3." },
  { title: "QMS", heading: "Need", subHeading: "", description: "It is a good idea to start your project by identifying an unmet clinical need. To do this, you will need to immerse yourself in a clinical setting and use this experience to identify a problem that requires solving." },
  { title: "QMS", heading: "Idea", subHeading: "", description: "During the process of understanding the clinical problem you have identified, you may have an innovative idea for a potential solution. This can range from an elegant engineering solution to the development of a novel technology. " },
  { title: "QMS", heading: "Device Class", subHeading: "", description: "Once you have a firm vision of your software medical device, it is important to ascertain its medical device class. You will need to do this for each regulatory jurisdiction within which you intend to market your device. The device class will determine the exact regulatory path and the documentation that will need to be produced." },
  { title: "QMS", heading: "Placeholder Heading 3", subHeading: "Placeholder SubHeading 3", description: "This is a placeholder description for subcategory 3." },
];

// Function to handle menu item click
function clickMenuItem(menuIndex, item, itemIndex) {
  menus.forEach((menu, i) => {
    if (i !== menuIndex && activeItems[i]) {
      activeItems[i].classList.remove("active");
      resetMenuBorder(menuBorders[i]);
    }
  });

  if (activeItems[menuIndex]) {
    activeItems[menuIndex].classList.remove("active");
  }

  item.classList.add("active");
  activeItems[menuIndex] = item;

  const globalIndex = calculateGlobalIndex(menuIndex, itemIndex);
  body.style.backgroundColor = bgColorsBody[globalIndex % bgColorsBody.length];

  const menuId = menus[menuIndex].id;
  const menuContent = rightDisplayContent[menuId]?.[itemIndex];
  if (menuContent) {
    updateRightDisplay(menuContent);
  }

  offsetMenuBorder(item, menuBorders[menuIndex], menus[menuIndex]);
  scrollToSubcategory(globalIndex);
}

// Function to calculate global index
function calculateGlobalIndex(menuIndex, itemIndex) {
  let globalIndex = itemIndex;
  for (let i = 0; i < menuIndex; i++) {
    const prevMenuItems = menus[i].querySelectorAll(".menu__item").length;
    globalIndex += prevMenuItems;
  }
  return globalIndex;
}

// Function to scroll the left display to a specific subcategory
function scrollToSubcategory(globalIndex) {
  const subcategories = leftDisplay.querySelectorAll(".subCategory");
  const targetSubcategory = subcategories[globalIndex];

  if (targetSubcategory) {
    const offset = targetSubcategory.offsetLeft - leftDisplay.offsetLeft;
    leftDisplay.scrollTo({
      left: offset,
      behavior: "smooth"
    });
  }
}

// Function to handle subCategoryPart click
function clickSubCategoryPart(index) {
  const content = subCategoryContent[index] || {
    title: "Custom SubCategory",
    heading: "Dynamic Heading",
    subHeading: "Updated SubHeading for SubCategory Link",
    description: "This content is displayed when clicking on a subcategory link."
  };

  updateRightDisplay(content);
}

// Function to update the right display content
function updateRightDisplay(content) {
  rightDisplay.querySelector("#title").textContent = content.title || "Default Title";
  rightDisplay.querySelector("#heading").textContent = content.heading || "Default Heading";
  rightDisplay.querySelector("#sub-heading").textContent = content.subHeading || "Default Subheading";
  rightDisplay.querySelector(".rightdisplayText4").textContent = content.description || "Default Description";
}

// Function to offset menu border
function offsetMenuBorder(element, menuBorder, menu) {
  const offsetActiveItem = element.getBoundingClientRect();
  const left = Math.floor(
    offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth - offsetActiveItem.width) / 2
  ) + "px";
  menuBorder.style.transform = `translate3d(${left}, 0, 0)`;
  menuBorder.style.opacity = 1;
}

// Function to reset menu border
function resetMenuBorder(menuBorder) {
  menuBorder.style.transform = "translate3d(0, 0, 0)";
  menuBorder.style.opacity = 0;
}

// Initialize menus
menus.forEach((menu, menuIndex) => {
  const menuItems = menu.querySelectorAll(".menu__item");
  resetMenuBorder(menuBorders[menuIndex]);

  menuItems.forEach((item, itemIndex) => {
    item.classList.remove("active");
    item.addEventListener("click", () => clickMenuItem(menuIndex, item, itemIndex));
  });
});

// Initialize subCategoryParts
document.querySelectorAll(".subCategoryPart").forEach((div, index) => {
  div.addEventListener("click", () => clickSubCategoryPart(index));
});

// Function to update rightDisplay content
function updateRightDisplay(content) {
  const fields = {
    title: rightDisplay.querySelector("#title"),
    heading: rightDisplay.querySelector("#heading"),
    subHeading: rightDisplay.querySelector("#sub-heading"),
    description: rightDisplay.querySelector(".rightdisplayText4")
  };

  // Loop through each field and update visibility based on content
  Object.keys(fields).forEach(field => {
    const element = fields[field];
    if (content[field]) {
      element.textContent = content[field];
      element.style.display = "block";  // Show if content exists
    } else {
      element.style.display = "none";  // Hide if no content
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.querySelector("#preloader");
  const containerTest = document.querySelector(".containerTest");

  if (preloader) {
    // Trigger the animation on the preloader
    preloader.classList.add("active");

    // Wait for the preloader icon animation to finish
    preloader.querySelector(".icon").addEventListener("animationend", () => {
      // Fade out the preloader
      preloader.classList.add("fade-out");

      // Once the fade-out is done, show and fade in containerTest
      preloader.addEventListener("animationend", () => {
        containerTest.style.display = "flex";  // Make containerTest visible
        containerTest.classList.add("fade-in");
      });
    });
  }
});


// Handle window resize
window.addEventListener("resize", () => {
  menus.forEach((menu, menuIndex) => {
    if (activeItems[menuIndex]) offsetMenuBorder(activeItems[menuIndex], menuBorders[menuIndex], menu);
    else resetMenuBorder(menuBorders[menuIndex]);
  });
});
