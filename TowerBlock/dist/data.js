const regulatoryData = {
    lifecycle: [
        // 1. Start
        { category: 'Start', subcategory: 'Need', content: 'Identify market need and opportunity', order: 1, quiz: { question: 'Is identifying market need the first step?', answer: true } },
        { category: 'Start', subcategory: 'Idea', content: 'Initial concept development and feasibility assessment', order: 1, quiz: { question: 'Should you develop a detailed concept before assessing market need?', answer: false } },
        { category: 'Start', subcategory: 'Device Class', content: 'Determine regulatory classification of the device', order: 1, quiz: { question: 'Is device classification necessary before starting development?', answer: true } },
        // 2. Company
        { category: 'Company', subcategory: 'Company Breakdown', content: 'Establish company structure and regulatory compliance framework', order: 2, quiz: { question: 'Can you start development without a proper company structure?', answer: false } },
        // 3. QMS
        { category: 'QMS', subcategory: 'ISO Standards', content: 'Implement ISO 13485 quality management system', order: 3, quiz: { question: 'Is ISO 13485 mandatory for medical device companies?', answer: true } },
        { category: 'QMS', subcategory: 'Policies', content: 'Develop and document quality policies and procedures', order: 3, quiz: { question: 'Are documented procedures optional in a QMS?', answer: false } },
        { category: 'QMS', subcategory: 'Documents', content: 'Maintain required QMS documents', order: 3, quiz: { question: 'Are QMS documents required?', answer: true } },
        { category: 'QMS', subcategory: 'EQMS', content: 'Implement an Electronic QMS system', order: 3, quiz: { question: 'Is an EQMS system recommended?', answer: true } },
        { category: 'QMS', subcategory: 'Traceability', content: 'Ensure traceability of all processes and changes', order: 3, quiz: { question: 'Is traceability important in QMS?', answer: true } },
        { category: 'QMS', subcategory: 'Change Control', content: 'Establish change control procedures', order: 3, quiz: { question: 'Is change control required for QMS?', answer: true } },
        { category: 'QMS', subcategory: 'FDA/CE/UKCA', content: 'Prepare for regulatory submissions (FDA, CE, UKCA)', order: 3, quiz: { question: 'Are regulatory submissions required?', answer: true } },
        // 4. Tech File
        { category: 'Tech File', subcategory: 'Templates', content: 'Create technical documentation templates', order: 4, quiz: { question: 'Should technical documentation be prepared before development?', answer: true } },
        { category: 'Tech File', subcategory: 'Diagrams', content: 'Prepare technical diagrams', order: 4, quiz: { question: 'Are diagrams part of the tech file?', answer: true } },
        // 5. Specify
        { category: 'Specify', subcategory: 'Requirements', content: 'Define detailed product requirements and specifications', order: 5, quiz: { question: 'Can you start development without clear requirements?', answer: false } },
        { category: 'Specify', subcategory: 'Risk', content: 'Perform risk analysis and management', order: 5, quiz: { question: 'Is risk analysis required?', answer: true } },
        // 6. Design
        { category: 'Design', subcategory: 'External', content: 'Design external interfaces and user interactions', order: 6, quiz: { question: 'Should user interface design consider regulatory requirements?', answer: true } },
        { category: 'Design', subcategory: 'Internal', content: 'Design internal system architecture', order: 6, quiz: { question: 'Is internal architecture design important?', answer: true } },
        // 7. Development
        { category: 'Development', subcategory: 'Code', content: 'Implement software according to design specifications', order: 7, quiz: { question: 'Is code documentation required for regulatory compliance?', answer: true } },
        { category: 'Development', subcategory: 'IFU', content: 'Prepare Instructions for Use (IFU)', order: 7, quiz: { question: 'Are IFUs required for medical devices?', answer: true } },
        // 8. Verify
        { category: 'Verify', subcategory: 'Robotic', content: 'Perform automated testing and verification', order: 8, quiz: { question: 'Can automated testing replace all manual testing?', answer: false } },
        { category: 'Verify', subcategory: 'Human', content: 'Conduct human testing and verification', order: 8, quiz: { question: 'Is human testing required?', answer: true } },
        // 9. Validate
        { category: 'Validate', subcategory: 'Clinical', content: 'Conduct clinical validation studies', order: 9, quiz: { question: 'Is clinical validation required for all medical devices?', answer: true } },
        { category: 'Validate', subcategory: 'Technical', content: 'Perform technical validation', order: 9, quiz: { question: 'Is technical validation required?', answer: true } },
        // 10. Submit
        { category: 'Submit', subcategory: 'FDA/CE/UKCA', content: 'Prepare and submit regulatory submissions', order: 10, quiz: { question: 'Can you market a medical device without regulatory approval?', answer: false } },
        // 11. Rollout
        { category: 'Rollout', subcategory: 'Service Desk', content: 'Establish customer support and service infrastructure', order: 11, quiz: { question: 'Is post-market support required for medical devices?', answer: true } },
        { category: 'Rollout', subcategory: 'Marketing', content: 'Develop marketing strategy and materials', order: 11, quiz: { question: 'Is marketing important for rollout?', answer: true } },
        { category: 'Rollout', subcategory: 'Sales', content: 'Set up sales channels and processes', order: 11, quiz: { question: 'Are sales channels necessary for rollout?', answer: true } },
        // 12. Maintain
        { category: 'Maintain', subcategory: 'Bug Fixes', content: 'Fix bugs and issues post-launch', order: 12, quiz: { question: 'Is post-launch bug fixing required?', answer: true } },
        { category: 'Maintain', subcategory: 'New Features', content: 'Develop and release new features', order: 12, quiz: { question: 'Should new features be managed post-launch?', answer: true } },
        { category: 'Maintain', subcategory: 'Post-Market', content: 'Monitor and maintain product in the market', order: 12, quiz: { question: 'Can you stop monitoring the device after market release?', answer: false } },
        // 13. Finish
        { category: 'Finish', subcategory: 'Sale', content: 'Complete sale of the company or product', order: 13, quiz: { question: 'Is a sale a possible exit strategy?', answer: true } },
        { category: 'Finish', subcategory: 'Takeover', content: 'Handle company or product takeover', order: 13, quiz: { question: 'Is takeover a possible exit strategy?', answer: true } },
        { category: 'Finish', subcategory: 'Finish', content: 'Finalize and close out the project', order: 13, quiz: { question: 'Is project closure important?', answer: true } }
    ]
}; 