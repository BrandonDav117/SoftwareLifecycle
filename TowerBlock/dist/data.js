const regulatoryData = {
    lifecycle: [
        // 1. Start
        { 
            category: 'Start', 
            subcategory: 'Need', 
            content: 'Identify market need and opportunity', 
            order: 1, 
            quiz: { 
                question: 'What is the first step in identifying a market need?',
                options: [
                    'Conduct a detailed market analysis',
                    'Start developing the product immediately',
                    'Look for existing competitors only',
                    'Focus solely on technical feasibility'
                ],
                correctIndex: 0
            }
        },
        { 
            category: 'Start', 
            subcategory: 'Idea', 
            content: 'Initial concept development and feasibility assessment', 
            order: 1, 
            quiz: { 
                question: 'What should be included in the initial concept development?',
                options: [
                    'Only technical specifications',
                    'Only market analysis',
                    'Both technical and market feasibility',
                    'Only regulatory requirements'
                ],
                correctIndex: 2
            }
        },
        { 
            category: 'Start', 
            subcategory: 'Device Class', 
            content: 'Determine regulatory classification of the device', 
            order: 1, 
            quiz: { 
                question: 'Why is device classification important?',
                options: [
                    'It determines the marketing strategy only',
                    'It affects development timeline only',
                    'It determines regulatory requirements and approval pathway',
                    'It only impacts the product design'
                ],
                correctIndex: 2
            }
        },
        // 2. Company
        { 
            category: 'Company', 
            subcategory: 'Company Breakdown', 
            content: 'Establish company structure and regulatory compliance framework', 
            order: 2, 
            quiz: { 
                question: 'What is essential in a company structure for medical device development?',
                options: [
                    'Only technical roles',
                    'Only marketing roles',
                    'A balanced team with regulatory expertise',
                    'Only administrative roles'
                ],
                correctIndex: 2
            }
        },
        // 3. QMS
        { 
            category: 'QMS', 
            subcategory: 'ISO Standards', 
            content: 'Implement ISO 13485 quality management system', 
            order: 3, 
            quiz: { 
                question: 'What is the primary purpose of ISO 13485?',
                options: [
                    'To ensure product quality only',
                    'To manage customer complaints only',
                    'To establish a comprehensive quality management system',
                    'To handle only manufacturing processes'
                ],
                correctIndex: 2
            }
        },
        { 
            category: 'QMS', 
            subcategory: 'Policies', 
            content: 'Develop and document quality policies and procedures', 
            order: 3, 
            quiz: { 
                question: 'What should quality policies cover?',
                options: [
                    'Only manufacturing processes',
                    'Only product testing',
                    'All aspects of product lifecycle and company operations',
                    'Only customer service'
                ],
                correctIndex: 2
            }
        },
        { 
            category: 'QMS', 
            subcategory: 'Documents', 
            content: 'Maintain required QMS documents', 
            order: 3, 
            quiz: { 
                question: 'What is the purpose of QMS documentation?',
                options: [
                    'To satisfy auditors only',
                    'To provide evidence of compliance and traceability',
                    'To store technical specifications only',
                    'To track sales only'
                ],
                correctIndex: 1
            }
        },
        { 
            category: 'QMS', 
            subcategory: 'EQMS', 
            content: 'Implement an Electronic QMS system', 
            order: 3, 
            quiz: { 
                question: 'What are the benefits of an Electronic QMS?',
                options: [
                    'Only digital storage',
                    'Only easier access',
                    'Improved traceability, efficiency, and compliance',
                    'Only cost reduction'
                ],
                correctIndex: 2
            }
        },
        { 
            category: 'QMS', 
            subcategory: 'Traceability', 
            content: 'Ensure traceability of all processes and changes', 
            order: 3, 
            quiz: { 
                question: 'Why is traceability important in QMS?',
                options: [
                    'Only for audit purposes',
                    'Only for product recalls',
                    'To ensure accountability and compliance throughout the product lifecycle',
                    'Only for marketing purposes'
                ],
                correctIndex: 2
            }
        },
        { 
            category: 'QMS', 
            subcategory: 'Change Control', 
            content: 'Establish change control procedures', 
            order: 3, 
            quiz: { 
                question: 'What is the purpose of change control procedures?',
                options: [
                    'To track only major changes',
                    'To manage and document all changes systematically',
                    'To handle only software updates',
                    'To track only customer feedback'
                ],
                correctIndex: 1
            }
        },
        { 
            category: 'QMS', 
            subcategory: 'FDA/CE/UKCA', 
            content: 'Prepare for regulatory submissions (FDA, CE, UKCA)', 
            order: 3, 
            quiz: { 
                question: 'What is required for regulatory submissions?',
                options: [
                    'Only technical documentation',
                    'Only clinical data',
                    'Comprehensive documentation including technical, clinical, and quality data',
                    'Only marketing materials'
                ],
                correctIndex: 2
            }
        },
        // 4. Tech File
        { 
            category: 'Tech File', 
            subcategory: 'Templates', 
            content: 'Create technical documentation templates', 
            order: 4, 
            quiz: { 
                question: 'What should technical documentation templates include?',
                options: [
                    'Only product specifications',
                    'Only user manuals',
                    'All required documentation sections for regulatory compliance',
                    'Only marketing materials'
                ],
                correctIndex: 2
            }
        },
        { 
            category: 'Tech File', 
            subcategory: 'Diagrams', 
            content: 'Prepare technical diagrams', 
            order: 4, 
            quiz: { 
                question: 'What is the purpose of technical diagrams?',
                options: [
                    'Only for marketing',
                    'Only for user manuals',
                    'To document system architecture and processes clearly',
                    'Only for internal use'
                ],
                correctIndex: 2
            }
        },
        // 5. Specify
        { 
            category: 'Specify', 
            subcategory: 'Requirements', 
            content: 'Define detailed product requirements and specifications', 
            order: 5, 
            quiz: { 
                question: 'What should product requirements include?',
                options: [
                    'Only technical specifications',
                    'Only user requirements',
                    'Comprehensive requirements covering technical, user, and regulatory needs',
                    'Only marketing requirements'
                ],
                correctIndex: 2
            }
        },
        { 
            category: 'Specify', 
            subcategory: 'Risk', 
            content: 'Perform risk analysis and management', 
            order: 5, 
            quiz: { 
                question: 'What is the purpose of risk analysis?',
                options: [
                    'To identify only technical risks',
                    'To identify and mitigate all potential risks to patient safety',
                    'To handle only manufacturing risks',
                    'To track only financial risks'
                ],
                correctIndex: 1
            }
        },
        // 6. Design
        { 
            category: 'Design', 
            subcategory: 'External', 
            content: 'Design external interfaces and user interactions', 
            order: 6, 
            quiz: { 
                question: 'What should external interface design consider?',
                options: [
                    'Only aesthetics',
                    'Only technical requirements',
                    'User experience, safety, and regulatory requirements',
                    'Only marketing requirements'
                ],
                correctIndex: 2
            }
        },
        { 
            category: 'Design', 
            subcategory: 'Internal', 
            content: 'Design internal system architecture', 
            order: 6, 
            quiz: { 
                question: 'What is important in internal system architecture?',
                options: [
                    'Only performance',
                    'Only security',
                    'Security, reliability, and maintainability',
                    'Only scalability'
                ],
                correctIndex: 2
            }
        },
        // 7. Development
        { 
            category: 'Development', 
            subcategory: 'Code', 
            content: 'Implement software according to design specifications', 
            order: 7, 
            quiz: { 
                question: 'What is essential in software implementation?',
                options: [
                    'Only functionality',
                    'Only performance',
                    'Following design specifications and maintaining documentation',
                    'Only user interface'
                ],
                correctIndex: 2
            }
        },
        { 
            category: 'Development', 
            subcategory: 'IFU', 
            content: 'Prepare Instructions for Use (IFU)', 
            order: 7, 
            quiz: { 
                question: 'What should IFUs include?',
                options: [
                    'Only basic instructions',
                    'Only technical details',
                    'Clear instructions, warnings, and safety information',
                    'Only marketing information'
                ],
                correctIndex: 2
            }
        },
        // 8. Verify
        { 
            category: 'Verify', 
            subcategory: 'Robotic', 
            content: 'Perform automated testing and verification', 
            order: 8, 
            quiz: { 
                question: 'What is the role of automated testing?',
                options: [
                    'To replace all manual testing',
                    'To handle only performance testing',
                    'To complement manual testing and ensure consistency',
                    'To handle only security testing'
                ],
                correctIndex: 2
            }
        },
        { 
            category: 'Verify', 
            subcategory: 'Human', 
            content: 'Conduct human testing and verification', 
            order: 8, 
            quiz: { 
                question: 'Why is human testing necessary?',
                options: [
                    'Only for user interface testing',
                    'Only for performance testing',
                    'To validate usability and safety in real-world conditions',
                    'Only for marketing purposes'
                ],
                correctIndex: 2
            }
        },
        // 9. Validate
        { 
            category: 'Validate', 
            subcategory: 'Clinical', 
            content: 'Conduct clinical validation studies', 
            order: 9, 
            quiz: { 
                question: 'What is the purpose of clinical validation?',
                options: [
                    'Only to satisfy regulators',
                    'Only to test performance',
                    'To demonstrate safety and effectiveness in intended use',
                    'Only to gather marketing data'
                ],
                correctIndex: 2
            }
        },
        { 
            category: 'Validate', 
            subcategory: 'Technical', 
            content: 'Perform technical validation', 
            order: 9, 
            quiz: { 
                question: 'What does technical validation ensure?',
                options: [
                    'Only basic functionality',
                    'Only performance',
                    'The product meets all technical requirements and specifications',
                    'Only user interface requirements'
                ],
                correctIndex: 2
            }
        },
        // 10. Submit
        { 
            category: 'Submit', 
            subcategory: 'FDA/CE/UKCA', 
            content: 'Prepare and submit regulatory submissions', 
            order: 10, 
            quiz: { 
                question: 'What is required for regulatory submissions?',
                options: [
                    'Only technical documentation',
                    'Only clinical data',
                    'Comprehensive documentation including technical, clinical, and quality data',
                    'Only marketing materials'
                ],
                correctIndex: 2
            }
        },
        // 11. Rollout
        { 
            category: 'Rollout', 
            subcategory: 'Service Desk', 
            content: 'Establish customer support and service infrastructure', 
            order: 11, 
            quiz: { 
                question: 'What should a medical device service desk handle?',
                options: [
                    'Only technical support',
                    'Only customer complaints',
                    'Technical support, complaints, and post-market surveillance',
                    'Only sales inquiries'
                ],
                correctIndex: 2
            }
        },
        { 
            category: 'Rollout', 
            subcategory: 'Marketing', 
            content: 'Develop marketing strategy and materials', 
            order: 11, 
            quiz: { 
                question: 'What should medical device marketing consider?',
                options: [
                    'Only product features',
                    'Only pricing',
                    'Regulatory compliance and approved claims',
                    'Only market share'
                ],
                correctIndex: 2
            }
        },
        { 
            category: 'Rollout', 
            subcategory: 'Sales', 
            content: 'Set up sales channels and processes', 
            order: 11, 
            quiz: { 
                question: 'What is important in medical device sales?',
                options: [
                    'Only revenue targets',
                    'Only market share',
                    'Compliance with regulations and proper documentation',
                    'Only customer relationships'
                ],
                correctIndex: 2
            }
        },
        // 12. Maintain
        { 
            category: 'Maintain', 
            subcategory: 'Bug Fixes', 
            content: 'Fix bugs and issues post-launch', 
            order: 12, 
            quiz: { 
                question: 'How should post-launch bug fixes be handled?',
                options: [
                    'Fix immediately without documentation',
                    'Only document major issues',
                    'Through proper change control and documentation',
                    'Only for critical issues'
                ],
                correctIndex: 2
            }
        },
        { 
            category: 'Maintain', 
            subcategory: 'New Features', 
            content: 'Develop and release new features', 
            order: 12, 
            quiz: { 
                question: 'What is required for new feature development?',
                options: [
                    'Only technical implementation',
                    'Only user testing',
                    'Full development lifecycle including regulatory assessment',
                    'Only marketing approval'
                ],
                correctIndex: 2
            }
        },
        { 
            category: 'Maintain', 
            subcategory: 'Post-Market', 
            content: 'Monitor and maintain product in the market', 
            order: 12, 
            quiz: { 
                question: 'What is post-market surveillance?',
                options: [
                    'Only sales monitoring',
                    'Only customer feedback',
                    'Continuous monitoring of safety and performance',
                    'Only competitor analysis'
                ],
                correctIndex: 2
            }
        },
        // 13. Finish
        { 
            category: 'Finish', 
            subcategory: 'Sale', 
            content: 'Complete sale of the company or product', 
            order: 13, 
            quiz: { 
                question: 'What is important in a medical device company sale?',
                options: [
                    'Only financial terms',
                    'Only intellectual property',
                    'Transfer of all regulatory responsibilities and documentation',
                    'Only customer relationships'
                ],
                correctIndex: 2
            }
        },
        { 
            category: 'Finish', 
            subcategory: 'Takeover', 
            content: 'Handle company or product takeover', 
            order: 13, 
            quiz: { 
                question: 'What must be considered in a takeover?',
                options: [
                    'Only financial aspects',
                    'Only technical transfer',
                    'Regulatory compliance and documentation transfer',
                    'Only employee retention'
                ],
                correctIndex: 2
            }
        },
        { 
            category: 'Finish', 
            subcategory: 'Finish', 
            content: 'Finalize and close out the project', 
            order: 13, 
            quiz: { 
                question: 'What is essential in project closure?',
                options: [
                    'Only financial closure',
                    'Only technical documentation',
                    'Complete documentation and regulatory compliance',
                    'Only customer handover'
                ],
                correctIndex: 2
            }
        }
    ]
}; 