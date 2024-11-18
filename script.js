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

let activeItems = [null, null, null, null]; // Tracks active items for each menu
let menuBorders = menus.map(menu => menu.querySelector(".menu__border"));

// Content data for rightDisplay based on menu and item index
const rightDisplayContent = {
  menu1: [
    {
      title: "Start",
      heading: "Needs",
      subHeading: "Welcome to our interactive guide to the development lifecycle for creating a software medical device.",
      description: "It is a good idea to start your project by identifying an unmet clinical need. To do this, immerse yourself in a clinical setting to identify a problem requiring solving."
    },
    {
      title: "Company",
      heading: "Organize",
      subHeading: "Set up your company structure and ensure regulatory compliance.",
      description: "Establish a legal company structure and define the roles and responsibilities for the team."
    },
    {
      title: "QMS",
      heading: "Quality Management System",
      subHeading: "Implement a quality management system for regulatory adherence.",
      description: "Ensure that your development and documentation adhere to the relevant standards such as ISO 13485."
    },
    {
      title: "Tech File",
      heading: "Technical File",
      subHeading: "Prepare documentation to demonstrate compliance.",
      description: "Compile the necessary technical documentation, including risk assessments, for your medical device."
    }
  ],
  menu2: [
    {
      title: "Specify",
      heading: "Requirements",
      subHeading: "Define the functional and non-functional requirements.",
      description: "Clearly specify what your device should do and the conditions it must meet."
    },
    {
      title: "Design",
      heading: "Design Specifications",
      subHeading: "Develop detailed plans for your device.",
      description: "Draft the design inputs and outputs, including system architecture and user interface."
    },
    {
      title: "Implement",
      heading: "Development",
      subHeading: "Turn your design into reality.",
      description: "Code and build the device, ensuring adherence to design specifications."
    },
    {
      title: "Verify",
      heading: "Verification",
      subHeading: "Check the implementation against the design.",
      description: "Conduct verification activities to ensure the product meets design specifications."
    },
    {
      title: "Validate",
      heading: "Validation",
      subHeading: "Ensure the device meets user needs.",
      description: "Perform validation to confirm the product satisfies the intended use."
    }
  ],
  menu3: [
    {
      title: "Submit",
      heading: "Regulatory Submission",
      subHeading: "Prepare and submit your regulatory application.",
      description: "Compile the submission package and send it to the relevant regulatory authority."
    },
    {
      title: "Rollout",
      heading: "Product Launch",
      subHeading: "Introduce your device to the market.",
      description: "Plan and execute the marketing and distribution strategy."
    },
    {
      title: "Maintain",
      heading: "Post-Market Surveillance",
      subHeading: "Monitor and maintain your product.",
      description: "Collect feedback, monitor performance, and handle any issues that arise post-launch."
    }
  ],
  menu4: [
    {
      title: "Finish",
      heading: "Project Completion",
      subHeading: "Wrap up and reflect on the project.",
      description: "Conduct a final review, archive documentation, and identify lessons learned for future projects."
    }
  ]
};

// Function to handle item click in each menu
function clickMenuItem(menuIndex, item, index) {
  // Deactivate the current active item in any menu
  menus.forEach((menu, i) => {
    if (i !== menuIndex && activeItems[i]) {
      activeItems[i].classList.remove("active");
      resetMenuBorder(menuBorders[i]);
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

  // Update `rightDisplay` content dynamically
  const menuId = menus[menuIndex].id;
  const menuContent = rightDisplayContent[menuId]?.[index];
  if (menuContent) {
    // Update right display text
    rightDisplay.querySelector("#title").textContent = menuContent.title || "Default Title";
    rightDisplay.querySelector("#heading").textContent = menuContent.heading || "Default Heading";
    rightDisplay.querySelector("#sub-heading").textContent = menuContent.subHeading || "Default Subheading";
    rightDisplay.querySelector(".rightdisplayText4").textContent = menuContent.description || "Default Description";
  }

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
