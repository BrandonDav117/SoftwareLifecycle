"use strict";

const body = document.body;

const bgColorsBody = [
  "linear-gradient(to bottom, gray, black", 
  "rgba(3, 144, 183, 0.8)",  // rgba: rgba(3, 144, 183, 0.8)
  "rgba(10, 115, 148, 0.8)", // rgba: rgba(10, 115, 148, 0.8)
  "rgba(18, 93, 120, 0.8)",  // rgba: rgba(18, 93, 120, 0.8)
  "rgba(143, 88, 250, 0.8)", // rgba: rgba(143, 88, 250, 0.8)
  "rgba(130, 53, 242, 0.8)", // rgba: rgba(130, 53, 242, 0.8)
  "rgba(115, 35, 222, 0.8)", // rgba: rgba(115, 35, 222, 0.8)
  "rgba(96, 29, 186, 0.8)",  // rgba: rgba(96, 29, 186, 0.8)
  "rgba(80, 26, 152, 0.8)",  // rgba: rgba(80, 26, 152, 0.8)
  "rgba(220, 34, 82, 0.8)",  // rgba: rgba(220, 34, 82, 0.8)
  "rgba(201, 24, 74, 0.8)",  // rgba: rgba(201, 24, 74, 0.8)
  "rgba(155, 22, 64, 0.8)",  // rgba: rgba(155, 22, 64, 0.8)
  "rgba(0, 0, 0, 0.8)"       // rgba: rgba(0, 0, 0, 0.8)
];

const bgColorsBody2 = [
  "linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.3))", 
  "rgba(3, 144, 183, 0.3)",  // rgba with 0.4 opacity
  "rgba(10, 115, 148, 0.3)", // rgba with 0.4 opacity
  "rgba(18, 93, 120, 0.3)",  // rgba with 0.4 opacity
  "rgba(143, 88, 250, 0.3)", // rgba with 0.4 opacity
  "rgba(130, 53, 242, 0.3)", // rgba with 0.4 opacity
  "rgba(115, 35, 222, 0.3)", // rgba with 0.4 opacity
  "rgba(96, 29, 186, 0.3)",  // rgba with 0.4 opacity
  "rgba(80, 26, 152, 0.3)",  // rgba with 0.4 opacity
  "rgba(220, 34, 82, 0.3)",  // rgba with 0.4 opacity
  "rgba(201, 24, 74, 0.3)",  // rgba with 0.4 opacity
  "rgba(155, 22, 64, 0.3)",  // rgba with 0.4 opacity
  "rgba(0, 0, 0, 0.3)"       // rgba with 0.4 opacity
];


const menus = [
  document.querySelector("#menu1"),
  document.querySelector("#menu2"),
  document.querySelector("#menu3"),
  document.querySelector("#menu4"),
  document.querySelector("#menu5")
];

const rightDisplay = document.querySelector(".rightDisplay");
const leftDisplay = document.querySelector(".leftDisplay");

let activeItems = [null, null, null, null];
let menuBorders = menus.map(menu => menu.querySelector(".menu__border"));


const rightDisplayContent = {
  menu1: [
    { title: "Start", heading: "", subHeading: "Welcome to our interactive guide to the development lifecycle for creating a software medical device.", description: "",  videoSrc: "Category1Vid.mp4" },
  ],
  menu2: [
    { title: "Company", heading: "Organise", subHeading: "Set up your company structure and ensure regulatory compliance.", description: "Establish a legal company structure and define the roles and responsibilities for the team.",  videoSrc: "Category2Vid.mp4" },
    { title: "QMS", heading: "Quality Management System", subHeading: "Implement a quality management system for regulatory adherence.", description: "Ensure that your development and documentation adhere to the relevant standards such as ISO 13485.",  videoSrc: "" },
    { title: "Tech File", heading: "Technical File", subHeading: "Prepare documentation to demonstrate compliance.", description: "Compile the necessary technical documentation, including risk assessments, for your medical device." }
  ],
  menu3: [
    { title: "Specify", heading: "Defining Requirements", subHeading: "Define the functional and non-functional requirements.", description: "Clearly specify what your device should do and the conditions it must meet." },
    { title: "Design", heading: "Design Specifications", subHeading: "Develop detailed plans for your device.", description: "Draft the design inputs and outputs, including system architecture and user interface." },
    { title: "Implement", heading: "Development", subHeading: "Turn your design into reality.", description: "Code and build the device, ensuring adherence to design specifications." },
    { title: "Verify", heading: "Verification", subHeading: "Check the implementation against the design.", description: "Conduct verification activities to ensure the product meets design specifications." },
    { title: "Validate", heading: "Validation", subHeading: "Ensure the device meets user needs.", description: "Perform validation to confirm the product satisfies the intended use." }
  ],
  menu4: [
    { title: "Submit", heading: "Regulatory Submission", subHeading: "Prepare and submit your regulatory application.", description: "Compile the submission package and send it to the relevant regulatory authority." },
    { title: "Rollout", heading: "Product Launch", subHeading: "Introduce your device to the market.", description: "Plan and execute the marketing and distribution strategy." },
    { title: "Maintain", heading: "Post-Market", subHeading: "Monitor and maintain your product.", description: "Collect feedback, monitor performance, and handle any issues that arise post-launch." },
  ],
  menu5: [
    { title: "Finish", heading: "Project Completion", subHeading: "Wrap up and reflect on the project.", description: "Conduct a final review, archive documentation, and identify lessons learned for future projects." },
  ]
};

const rightDisplayContent2 = [
  { title: "Start", heading: "", subHeading: "Welcome to our interactive guide to the development lifecycle for creating a software medical device.", description: "" },
  { title: "Company", heading: "Organise", subHeading: "Set up your company structure and ensure regulatory compliance.", description: "Establish a legal company structure and define the roles and responsibilities for the team." },
  { title: "QMS", heading: "Quality Management System", subHeading: "Implement a quality management system for regulatory adherence.", description: "Ensure that your development and documentation adhere to the relevant standards such as ISO 13485." },
  { title: "Tech File", heading: "Technical File", subHeading: "Prepare documentation to demonstrate compliance.", description: "Compile the necessary technical documentation, including risk assessments, for your medical device." },
  { title: "Specify", heading: "Defining Requirements", subHeading: "Define the functional and non-functional requirements.", description: "Clearly specify what your device should do and the conditions it must meet." },
  { title: "Design", heading: "Design Specifications", subHeading: "Develop detailed plans for your device.", description: "Draft the design inputs and outputs, including system architecture and user interface." },
  { title: "Implement", heading: "Development", subHeading: "Turn your design into reality.", description: "Code and build the device, ensuring adherence to design specifications." },
  { title: "Verify", heading: "Verification", subHeading: "Check the implementation against the design.", description: "Conduct verification activities to ensure the product meets design specifications." },
  { title: "Validate", heading: "Validation", subHeading: "Ensure the device meets user needs.", description: "Perform validation to confirm the product satisfies the intended use." },
  { title: "Submit", heading: "Regulatory Submission", subHeading: "Prepare and submit your regulatory application.", description: "Compile the submission package and send it to the relevant regulatory authority." },
  { title: "Rollout", heading: "Product Launch", subHeading: "Introduce your device to the market.", description: "Plan and execute the marketing and distribution strategy." },
  { title: "Maintain", heading: "Post-Market", subHeading: "Monitor and maintain your product.", description: "Collect feedback, monitor performance, and handle any issues that arise post-launch." },
  { title: "Finish", heading: "Project Completion", subHeading: "Wrap up and reflect on the project.", description: "Conduct a final review, archive documentation, and identify lessons learned for future projects." },
];

const subCategoryContent = [
  { title: "Start", heading: "Need", subHeading: "", description: "It is a good idea to start your project by identifying an unmet clinical need. To do this, you will need to immerse yourself in a clinical setting and use this experience to identify a problem that requires solving." },
  { title: "Start", heading: "Idea", subHeading: "", description: "During the process of understanding the clinical problem you have identified, you may have an innovative idea for a potential solution. This can range from an elegant engineering solution to the development of a novel technology. " },
  { title: "Start", heading: "Device Class", subHeading: "", description: "Once you have a firm vision of your software medical device, it is important to ascertain its medical device class. You will need to do this for each regulatory jurisdiction within which you intend to market your device. The device class will determine the exact regulatory path and the documentation that will need to be produced." },
  { title: "Company", heading: "Breakdown", subHeading: "", description: "You will need to address the following items as part of company process: Register you company, Declare ownership, Assign Directors, Register a bank account, Locate funding, Structure a business plan, Assign a board, Configure payroll, Setup HR, Establish insurance, Locate an Office " },
  { title: "QMS", heading: "ISO Standards", subHeading: "", description: "ISO standards provide a set of best practices and encourage international standardisation. There are a number of ISO standards that are specific to medical devices. These include: <br><br> ISO 13485 Quality Management Systems for Medical Devices <br> ISO 9001 General Business Quality Management System <br> ISO 62304 Software Components of Medical Devices <br> ISO 15223 Software Medical Device Labelling. <br> ISO 14971 Risk Management for Medical Devices. <br><br> Early on in your project it is important to identify the ISO standards that you should be adhering to. Throughout your work, you will need to ensure that your development process follows these standards. ISO 13485 is the primary standard for software medical devices." },
  { title: "QMS", heading: "Policies", subHeading: "", description: "Your company will need to develop policies for a range of business activities: <br><br> • Employee Code of Conduct Policy <br> • Disciplinary Action Policy <br> • Health and Safety Policy <br> • Security Policy <br> • Quality Management Policy <br> • Environmental Policy <br> • Ethical Policy <br> • Leave of Absence Policy <br> • Equal Opportunity Policy <br> • Human Resources Policy <br><br> It is typically not necessary to develop these from scratch, but you can base your policies upon existing templates. You can adapt these to be more specific to your company and its requirements." },
  { title: "QMS", heading: "Documents", subHeading: "", description: "Your QMS system requires a large set of documents that detail the key processes within your company. Typically, the list of documents would include: <br><br> • Generic QMS document template. <br> • Document versioning process. <br> • Risk Management Plan. <br> • Standard operating procedures. <br> • Change control process. <br> • Traceability process. <br> •	Software development process. <br> •	Software release process. <br> •	Approved supplier list. <br><br> Your QMS documents will be included in your regulatory submissions, so it is imperative that these are kept up to date and accurate.    " },
  { title: "Tech File", heading: "Templates", subHeading: "", description: "Your Technical File will need to include the following documents: <br><br> • Software Development Process <br> • Software Architecture Description <br> • Risk Analysis <br> • Verification and Validation Plan <br><br> At this stage of your project, you will want to create templates for each of these documents that can then be filled in as your progress through the software life cycle. " },
  { title: "Tech File", heading: "Diagrams", subHeading: "", description: "Regulatory processes such as FDA and CE Marking, require specific diagrams to be created for your device. These include: <br><br> • Software Architecture Diagrams <br> • Information Flow Diagrams <br> • Security Attack Vector Diagrams <br><br> In your Technical File you can use standard diagram formats such as Unified Modelling Language (UML)." },
  { title: "Specify", heading: "Requirements", subHeading: "", description: "It is necessary to capture all the requirements of the software. Here are some example requirements: <br><br> Tier 1 Requirement: <br> ‘The user should be able to view images of the brain.’ <br><br> Tier 2 Requirement: <br> ‘The user should be able to zoom in and out of an image’. <br><br> Tier 3 Requirement: <br> ‘The user should be able to zoom using a slider bar’. <br><br>  The requirements should be structured in a tree-like hierarchy: <br><br>  • Each tier 3 requirements relate to a tier 2 requirement. <br> • Each tier 2 requirements relate to a tier 1 requirement." },
  { title: "Specify", heading: "Risk", subHeading: "", description: "During the specification phase, you will need to identify the risks associated with each requirement. <br> Risk for a requirement is defined by the combination of the severity of the risk and the likelihood of it occurring. <br><br> Risk = Severity x Likelihood. <br><br> The specifics of this align to the Risk Analysis process you defined as part of your QMS. You will need to take special care assessing the risk regarding cyber-security and use AI. " },
  { title: "Design", heading: "External", subHeading: "", description: "This is the part of the software that your users will interact with. You can approach the external design process with the following steps: <br><br> • Write a full list of features for your software based on your requirements. <br>• Draw wireframes of each user interface screen, ensuring all features are incorporated. <br> • Conduct design reviews with potential users. <br> • Iterate and refine your external design-based upon feedback." },
  { title: "Design", heading: "Internal", subHeading: "", description: "This is the underlying architecture of your software. You can approach the internal design process with the following steps: <br><br> • Write a detailed list of the key modules required for your software. <br><br> • Draw diagrams of the internal structure of the software showing the connections between modules. <br><br> • Draw diagrams of the information flows within your software. <br><br> • Draw diagrams showing the cyber-security structure of your software. <br><br> The combination of your internal and external design documents as well as your specification will enable your developers to implement your software." },
  { title: "Implement", heading: "Coding", subHeading: "", description: "According to both your internal and external designs, you will now begin coding the software. <br><br> •	Identify the order in which you will implement your features. <br> • Each feature should be assigned to an individual developer. <br> • As a developer is implementing a feature, they should write unit tests to support the forthcoming verification process. <br> • Version control will be needed for handling both collaborating on code and working on multiple features in parallel. <br><br> Over the course of this process, it is best practice to also employ extensive debugging, regular code reviews and refactoring to maintain a quality codebase. " },
  { title: "Implement", heading: "Instructions for use", subHeading: "", description: "As per regulatory requirements it is necessary to write a detailed user guide referred to as the IFU (instructions for use). <br><br> This document should include: <br><br>•	A list of what the software can be used for. <br> • The minimum hardware requirements for your software. <br> • List the medical devices that your software can be used with. <br> • Detailed instructions for each software feature. <br> • Information on residual risks. <br> • Information about your medical device label, which you will need to include with your software. <br> • List contact details for support and commercial issues. <br><br> For the European market, you will need to produce the IFU in multiple languages. The IFU is an important requirement for the later verification process." },
  { title: "Verify", heading: "Robotic", subHeading: "", description: "Automated testing consists of three types of tests: <br><br> • Unit Tests, the lowest level of testing. These test the base functionality of your code in isolated units. <br><br> • Integration Tests, these check that different modules of code work together. <br><br> • System-level testing, this is where the software is tested as a whole, checking against the specification. <br><br> The advantage of automated tests is that they can be run automatically whenever code is changed to ensure that features are not inadvertently broken. " },
  { title: "Verify", heading: "Human", subHeading: "", description: "It can be difficult to write a comprehensive set of tests that check all functionality of the software. It is often necessary to use human testing as well as automated testing. <br><br> • Create a test plan for each feature according to the intended functionality. <br><br> • For each release of the software, run the human testing based on your test plan. <br><br> As this is the Verification process, we are not seeking feedback from users at this stage, we are only focused on ensuring the features tested meet the specification." },
  { title: "Validate", heading: "Clinical Validation", subHeading: "", description: "This is the part of work where you demonstrate that your software is suitable for use in a clinical setting. <br><br> For any numbers that you calculate within the software, you will need to demonstrate that they are accurate, reproducible and clinically relevant. You may need to demonstrate that your device produces results that are comparable to existing products. <br><br> You will also want to gather feedback from clinicians that have been using the software, to identify problems, suggest improvements and ensure the software is usable in a clinical environment." },
  { title: "Validate", heading: "Technical Validation", subHeading: "", description: "In addition to clinical validation, technical validation focuses on checking that the software works well from a technical perspective in the intended environment. <br><br> It is important to validate that the software works correctly with any medical devices listed in your IFU that may be used together with your software. <br><br> It is likely that the validation process identifies issues that should be fixed before moving on to regulatory submission. " },
  { title: "Submit", heading: "FDA/CE/UKCA", subHeading: "", description: "The details of this process depend on the intended regulatory jurisdiction, and the class of your software medical device. <br><br> Submission for CE Mark: For this you will need to find a notified body to which you submit your documentation. They will then review your work and carry out an audit. <br><br> Submission for FDA 510(k): You will submit your application directly to the FDA. You then enter an iterative cycle in which you will address questions from the FDA. <br><br> Submission for UKCA Mark: This is based on the old European model, Medical Device Directive (MDD), but is changing be more in line with the current CE Marking process, Medical Device Regulation (MDR). <br><br> Submission for Other Jurisdictions: Other jurisdictions have their own regulatory approaches which are predominantly based on the FDA or CE Marking processes." },
  { title: "Rollout", heading: "Service Desk", subHeading: "", description: "In order for your users to operate the software effectively, you will need to provide a service desk. This will provide the following: <br><br> • Customer On-boarding and Installation <br> • Software Training <br> • Troubleshooting <br> • Feedback Gathering (Bugs and Feature Requests) <br> • General Customer Support <br><br> You will want to provide digital communication for your service desk, this can be email/web based. You may want to provide telephone and face-to-face support. <br><br> Due to the critical nature of medical device software, you will want to provide continuous support 24/7, 365 days a year. To ensure quality, it is advisable to build a Service Desk within your company as opposed to third party service desk support. <br><br> You should setup your Service Desk before for your first sale and test each aspect of your SD with your beta testers." },
  { title: "Rollout", heading: "Marketing", subHeading: "", description: "It will be necessary to produce a marketing campaign for your software medical device. This could include: <br><br> • Exhibition stands at medical conferences <br> • Advertising digital and print materials <br> • Social media campaigns <br> • Recruiting opinion leaders <br> • Promoting training sessions <br><br> It is necessary to ensure all your product advertising material complies with relevant regulations. <br><br> For example, it is imperative that any performance metrics you quote are accurate. It is a good idea to employ a marketing agency that has experience within medical device marketing." },
  { title: "Rollout", heading: "Sales", subHeading: "", description: "Selling Software Medical Devices can be a complex process, the time and effort required to make a sale should not be underestimated. <br><br> In some institutions, sales can take months or years to complete. In addition to convincing a potential end-user that they want to buy the software, it will be necessary to persuade their hospital IT department and purchasing department. <br><br> Particularly in the United States, it will be necessary to integrate with the re-imbursement procedures of the hospital. Supplier relationships with medical institutions will be an important part of the sales process. <br><br> Your software will need to run alongside existing IT infrastructure which may involve integration challenges. You will also need to meet any local requirements for the hospital or medical institution. <br><br> Once you have completed the paperwork for your first sale, you can rollout the software to your first customer." },
  { title: "Maintain", heading: "Bug Fixes", subHeading: "", description: "When your software is in use, bugs will be identified by your users and your internal team. <br><br> It is important that bug fixes don’t inadvertently break existing features. This highlights the importance of automated verification regression tests that can identify changes to the performance of the software. <br><br> For urgent bug fixes such as security issues, you will need a fast-track approach to change control so that you can release fixes promptly whilst ensuring quality." },
  { title: "Maintain", heading: "New Features", subHeading: "", description: "Your users will request new features, and you should review and prioritise taking into account your existing development plan to ensure that the software is developed in a strategic fashion. " },
  { title: "Maintain", heading: "Post-Market Surveillance", subHeading: "", description: "As part of your regulatory submission, you will need to perform continuous post-market surveillance. <br><br> This involves monitoring the performance of your software to ensure security, user-experience and feature quality. You will need to identify potential patient safety and cyber-security issues. <br><br> You will also need to identify issues related to third-party dependencies such as software libraries, operating systems and computer hardware. You should review issues for each dependency using international cyber-security database systems such as the US National Vulnerability Database (NVD). <br><br> You will need a design review meeting once your software has been in use to review your Post-Market Surveillance." },
  { title: "Finish", heading: "Sale", subHeading: "", description: "One scenario that could arise, is that your company will be purchased by another. For this to happen, your company will need to pass through the due diligence process. <br><br> Following the QMS and your Regulatory Approval process will help ensure that your company attains to sufficient quality standards." },
  { title: "Finish", heading: "Close", subHeading: "", description: "At some point, it may be necessary to close your company. In this scenario it is desirable to ensure that each customer has time to find replacement solutions. Any outstanding commercial agreements you have must be handled on a case-by-case basis." },
  { title: "Finish", heading: "Conclusion", subHeading: "", description: "Creating a software medical device can be very rewarding, both financially and in terms of providing real benefit to patients’ lives. " },
];

const subCategoryPartContinuousContent = [
  { title: "QMS", heading: "EQMS", subHeading: "", description: "Whilst it remains possible to create an entirely paper-based Quality Management System, it is recommended that you use an Electronic QMS (EQMS) system to ensure that your records stay synchronised. <br> <br> Your EQMS system is a database of all the activity related to company operations and product development. Your EQMS system provides the audit trail required for regulatory compliance and approval." },
  { title: "QMS", heading: "Traceability", subHeading: "", description: "For each feature within your software, it is necessary to ensure that documentation is produced for each stage of its development. Traceability is the process of systematically checking the existence of each of the following sections of documentation for each feature: <br> <br> Specification <br> Design <br> Implementation <br> Verification <br> and Validation. <br><br> References to the relevant documentation should be listed for each feature. The process of traceability allows auditors and stakeholders to navigate and access this information effectively." },
  { title: "QMS", heading: "Change Control", subHeading: "", description: "It is likely that you will need to make modifications to your software after its initial release. This will be to correct any outstanding bugs and add new features. <br> <br> It is not necessary to make a new regulatory submission for every change made but it is necessary to make all changes in a controlled and documented fashion. <br><br>Change Control is the required process for making these changes and ensures quality and accountability. Change Control can be implemented with a series of review meetings, one at the end of each phase of software development. <br><br> For example, at the end of the specification phase for a new set of features, it is necessary to hold a Change Control review meeting with technical and clinical stakeholders to ensure that the specification is suitable. At the end of the meeting the specification should be signed off so that the design phase can begin.The most important of these meetings will be at the end of the validation phase before release to market. Change Control should also be used if you need to make changes to your plan ahead of its initial submission." },
  { title: "QMS", heading: "FDA/CE/UKCA", subHeading: "", description: "You will need to get regulatory approval for every region in which you intend to market your software. <br><br> FDA: To market your software in the U.S, you will need to gain FDA clearance. For software medical devices this typically requires FDA 510(k). <br><br> CE Marking: To market your software in the EU, you will need to gain CE Mark. <br><br> UKCA Marking: To market your software in the UK, you will need to gain a UKCA Mark. <br><br> Other jurisdictions have their own regulatory approaches which are predominantly based on the FDA or CE Marking processes." },
];

// Add a variable to track the current highlighted subcategory
let currentHighlightedSubcategory = null;

function clickMenuItem(menuIndex, item, itemIndex) {
  // Reset active states for other menus
  menus.forEach((menu, i) => {
    if (i !== menuIndex && activeItems[i]) {
      activeItems[i].classList.remove("active");
      resetMenuBorder(menuBorders[i]);
    }
  });

  // Update the active item for the current menu
  if (activeItems[menuIndex]) {
    activeItems[menuIndex].classList.remove("active");
  }

  item.classList.add("active");
  activeItems[menuIndex] = item;

  const globalIndex = calculateGlobalIndex(menuIndex, itemIndex);

  // Update the background color for the right display
  rightDisplay.style.background = bgColorsBody[globalIndex % bgColorsBody.length];
  document.documentElement.style.setProperty('--highlight-color', bgColorsBody[globalIndex % bgColorsBody.length]);
  document.documentElement.style.setProperty('--highlight-color2', bgColorsBody2[globalIndex % bgColorsBody.length]);


  // Update the right display content
  const menuId = menus[menuIndex].id;
  const menuContent = rightDisplayContent[menuId]?.[itemIndex];
  if (menuContent) {
    updateRightDisplay(menuContent);
  }

  // Update menu border and scroll to the corresponding subcategory
  offsetMenuBorder(item, menuBorders[menuIndex], menus[menuIndex]);
  scrollToSubcategoryWithHighlight(globalIndex); // Call the modified function
}

function clickMenuItem2(menuIndex, item, itemIndex) {
// Reset active states for other menus
  menus.forEach((menu, i) => {
    if (i !== menuIndex && activeItems[i]) {
      activeItems[i].classList.remove("active");
      resetMenuBorder(menuBorders[i]);
    }
  });

  // Update the active item for the current menu
  if (activeItems[menuIndex]) {
    activeItems[menuIndex].classList.remove("active");
  }

  item.classList.add("active");
  activeItems[menuIndex] = item;

  const globalIndex = calculateGlobalIndex(menuIndex, itemIndex);

  // Update the background color for the right display
  rightDisplay.style.background = bgColorsBody[globalIndex % bgColorsBody.length];
  document.documentElement.style.setProperty('--highlight-color', bgColorsBody[globalIndex % bgColorsBody.length]);
  document.documentElement.style.setProperty('--highlight-color2', bgColorsBody2[globalIndex % bgColorsBody.length]);

  // Update menu border and scroll to the corresponding subcategory
  offsetMenuBorder(item, menuBorders[menuIndex], menus[menuIndex]);
  scrollToSubcategoryWithHighlight(globalIndex); // Call the modified function
}

// Scroll To Subcategory but Adds Active Highlight
function scrollToSubcategoryWithHighlight(globalIndex) {

  scrollToSubcategory(globalIndex);

  // Highlight the current subcategory
  const subcategoryElements = document.querySelectorAll('.subCategory'); // Updated to match CSS class
  const newSubcategory = subcategoryElements[globalIndex];

  if (currentHighlightedSubcategory) {
    currentHighlightedSubcategory.classList.remove('highlight'); // Remove highlight from the previous subcategory
  }

  if (newSubcategory) {
    newSubcategory.classList.add('highlight'); // Add highlight to the current subcategory
    currentHighlightedSubcategory = newSubcategory; // Update the reference
  }
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

// Initialize subCategoryParts and subCategoryPartContinuous
const subCategory = document.querySelectorAll(".subCategory");
const subCategoryParts = document.querySelectorAll(".subCategoryPart");
const subCategoryPartContinuous = document.querySelectorAll(".subCategoryPartContinuous");

subCategory.forEach((div, index) => {
  div.addEventListener("click", () => {
    // console.log("subCategory Triggered");
    clickSubCategoryPart(index, "subCategory"); 
  });
});

subCategoryPartContinuous.forEach((div, index) => {
  div.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up
    // console.log("subCategoryContinuous Triggered");
    clickSubCategoryPart(index, "subCategoryPartContinuous"); 
  });
});

subCategoryParts.forEach((div, index) => {
  div.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up
    // console.log("subCategoryPart Triggered");
    clickSubCategoryPart(index, "subCategoryPart");
  });
});


function clickSubCategoryPart(index, source = "") {
  let content;

  if (source === 'subCategoryPartContinuous') {
    console.log("Continuous Condition Has Been Met");
    // If it's a continuous subcategory part, use subCategoryPartContinuousContent
    content = subCategoryPartContinuousContent[index] || {
      title: "Test",
      heading: "Test",
      subHeading: "",
      description: "Default continuous description."
    }; 
  } 
  
  if (source === 'subCategoryPart') {
    // Ensure we fetch content from subCategoryContent (for subCategoryParts)
    console.log("SubCategoryPart Condition Has Been Met");
    content = subCategoryContent[index] || {
      title: "Custom SubCategory",
      heading: "Dynamic Heading",
      subHeading: "Updated SubHeading for SubCategory Link",
      description: "This content is displayed when clicking on a subcategory link."
    };
  }

  if (source === 'subCategory') {
    console.log("SubCategory Condition Has Been Met");
        // If triggered by subCategory, use rightDisplayContent index
      content = rightDisplayContent2[index] || {
        title: "Right Display Title",
        heading: "Right Display Heading",
        subHeading: "Right Display SubHeading",
        description: "This content is displayed when triggered by a subCategory link."
     };
  }

  // Ensure correct text is displayed in the right panel
  updateRightDisplay(content);

  // Find the corresponding menu and menu item
  const menuIndex = menus.findIndex(menu =>
    rightDisplayContent[menu.id]?.some(item => item.title === content.title)
  );

  if (menuIndex !== -1) {
    const itemIndex = rightDisplayContent[menus[menuIndex].id].findIndex(item => item.title === content.title);
    
    if (itemIndex !== -1) {
      const menuItem = menus[menuIndex].querySelectorAll(".menu__item")[itemIndex];
      if (menuItem) {
        clickMenuItem2(menuIndex, menuItem, itemIndex);
      }
    }
  }
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


// Function to update rightDisplay content with a smooth transition
function updateRightDisplay(content) {
  const fields = {
    title: rightDisplay.querySelector("#title"),
    heading: rightDisplay.querySelector("#heading"),
    subHeading: rightDisplay.querySelector("#sub-heading"),
    description: rightDisplay.querySelector(".rightdisplayText4")
  };

  const border = rightDisplay.querySelector("#border"); // Select border separately
  const videoElement = rightDisplay.querySelector("#categoryVideo"); // Select the video element

  // Fade out text, border, and video
  Object.values(fields).forEach(element => element.style.opacity = "0");
  if (border) border.style.opacity = "0";
  if (videoElement) videoElement.style.opacity = "1"; // Ensure it's visible before fading out

  // Step 1: Fade out video
  videoElement.style.opacity = "0";

  setTimeout(() => {
    // Update video source only after fade-out completes
    if (videoElement && content.videoSrc) {
      videoElement.src = content.videoSrc;
      videoElement.load();
      videoElement.style.display = "block";
    }

    // Step 2: Update text content after fade-out
    Object.keys(fields).forEach(field => {
      const element = fields[field];
      if (content[field]) {
        element[field === "description" ? "innerHTML" : "textContent"] = content[field];
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });

    // Step 3: Fade everything back in after a short delay
    setTimeout(() => {
      // Fade in text, border, and video
      Object.values(fields).forEach(element => (element.style.opacity = "1"));
      if (border) border.style.opacity = "1";
      if (videoElement && content.videoSrc) videoElement.style.opacity = "1";

      // Trigger typewriter effect if present
      typeWriterEffect(content);
    }, 300);

  }, 1000); // Fade-out duration must match CSS transition
}




function typeWriterEffect(content) {
  // Loop through each field in the content
  Object.keys(content).forEach((field) => {
    // Skip the description field
    if (field === "description") {
      return; // Skip typewriter effect for description
    }

    // Select the element by ID or Class, depending on how it's defined
    const element = rightDisplay.querySelector(`#${field}`) || rightDisplay.querySelector(`.${field}`);
    
    // Check if element exists and content is available for it
    if (element && content[field]) {
      const text = content[field];
      let i = 0;
      let output = "";

      // Start the typewriter effect with an interval for typing
      const typeWriterInterval = setInterval(() => {
        // Add one character at a time to the output string
        output += text.charAt(i);
        
        // Update the innerHTML with the new output
        element.innerHTML = output;

        // Handle breaklines, preserving them in the output
        if (output.includes("<br>")) {
          output = output.replace("<br>", "");
          element.innerHTML += "<br>";
        }

        i++;

        // Stop the interval once all characters have been typed
        if (i >= text.length) {
          clearInterval(typeWriterInterval);
        }
      }, 50); // You can adjust the interval for typing speed
    }
  });
}


 // Clicked subCategoryPart Style Changes
 document.addEventListener("DOMContentLoaded", function () {
  const subCategoryParts = document.querySelectorAll(".subCategoryPart");
  const subCategoryPartContinuous = document.querySelectorAll(".subCategoryPartContinuous");
  const subCategories = document.querySelectorAll(".subCategory");
  const menuItems = document.querySelectorAll(".menu__item");

  function removeActiveClass() {
      subCategoryParts.forEach(elem => elem.classList.remove("active"));
  }

  subCategoryParts.forEach(el => {
      el.addEventListener("click", function () {
          removeActiveClass(); // Remove "active" class from all .subCategoryPart elements
          this.classList.add("active"); // Add "active" class to the clicked element
      });
  });

  // Clicking on .subCategory or .menu__item removes styles from .subCategoryPart
  [...subCategories, ...menuItems, ...subCategoryPartContinuous].forEach(el => {
      el.addEventListener("click", removeActiveClass);
  });
});


 // Clicked subCategoryPartContinuous Style Changes
 document.addEventListener("DOMContentLoaded", function () {
  const subCategoryPartContinuous = document.querySelectorAll(".subCategoryPartContinuous");
  const subCategoryParts = document.querySelectorAll(".subCategoryPart");
  const subCategories = document.querySelectorAll(".subCategory");
  const menuItems = document.querySelectorAll(".menu__item");

  function removeActiveClass() {
    subCategoryPartContinuous.forEach(elem => elem.classList.remove("active"));
  }

  subCategoryPartContinuous.forEach(el => {
      el.addEventListener("click", function () {
          removeActiveClass(); // Remove "active" class from all .subCategoryPart elements
          this.classList.add("active"); // Add "active" class to the clicked element
      });
  });

  // Clicking on .subCategory or .menu__item removes styles from .subCategoryPart
  [...subCategories, ...menuItems, ...subCategoryParts].forEach(el => {
      el.addEventListener("click", removeActiveClass);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.querySelector("#preloader");
  const startButton = document.querySelector(".switch");

  const startFade = document.querySelectorAll(".mainDisplayHeading, .switch, .logos");
  const ClickElementsFadein = document.querySelectorAll(".leftDisplay, .rightDisplay, .menu");
  const ClickElementsFadeout = document.querySelectorAll(".mainDisplayHeading, .switch, #animation-container, .logos");

    // Wait for the preloader animation to end before showing elements
    window.addEventListener('DOMContentLoaded', () => {
      startFade.forEach(element => {
        element.classList.add("fade-in");
      });
    }, { once: true });
  // }

  if (startButton) {
    startButton.addEventListener("click", () => {

      const customOrder2 = [2, 0, 1, 3]; // Define the order (indices of elements)

      customOrder2.forEach((orderIndex, delayIndex) => {
        setTimeout(() => {
          ClickElementsFadeout[orderIndex].classList.add("fade-out");
        }, delayIndex * 300); // Delay each one sequentially
      });

      const customOrder = [2, 3, 4, 5, 6, 1, 0]; // Define the order (indices of elements)

      customOrder.forEach((orderIndex, delayIndex) => {
        setTimeout(() => {
          ClickElementsFadein[orderIndex].classList.add("fade-in");
        }, delayIndex * 250); // Delay each one sequentially
      });
    })
}});


// Handle window resize
window.addEventListener("resize", () => {
  menus.forEach((menu, menuIndex) => {
    if (activeItems[menuIndex]) offsetMenuBorder(activeItems[menuIndex], menuBorders[menuIndex], menu);
    else resetMenuBorder(menuBorders[menuIndex]);
  });
});

// Set the first menu item as active on page load, but only for menu1
window.addEventListener('DOMContentLoaded', () => {
  const menu1 = document.getElementById('menu1'); // Get menu1 by ID

  if (menu1) {
    // Find the first item in menu1
    const firstItem = menu1.querySelector('.menu__item'); 

    if (firstItem) {
      // Get the index of menu1 in the `menus` array
      const menuIndex = menus.indexOf(menu1);
      if (menuIndex !== -1) {
        // Set the first item as active in menu1
        clickMenuItem(menuIndex, firstItem, 0);
      }
    }
  }
});
