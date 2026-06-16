export const masterQuestionBank = [
  // TECHNOLOGY & DEV
  { category: "Technology", question: "In computing, what does 'API' stand for?", options: ["Automated Program Interface", "Application Programming Interface", "Applied Process Integration", "Application Protocol Index"], answer: 1 },
  { category: "Technology", question: "Which company created the React framework?", options: ["Google", "Meta (Facebook)", "Microsoft", "Vercel"], answer: 1 },
  { category: "Technology", question: "What does HTML stand for?", options: ["HyperText Markup Language", "HyperTransfer Markup Language", "HighText Machine Language", "Hyperlink Text Markup Language"], answer: 0 },
  { category: "Technology", question: "What is the main function of a DNS server?", options: ["Storing websites", "Translating domain names to IP addresses", "Encrypting passwords", "Blocking malware"], answer: 1 },
  { category: "Technology", question: "Which HTTP status code means 'Not Found'?", options: ["200", "403", "404", "500"], answer: 2 },
  { category: "Technology", question: "Which of these is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], answer: 2 },
  { category: "Technology", question: "What does CSS stand for?", options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"], answer: 2 },
  { category: "Technology", question: "In Git, what command saves your changes to the local repository?", options: ["git push", "git commit", "git add", "git pull"], answer: 1 },
  { category: "Technology", question: "What port does HTTPS typically use?", options: ["80", "21", "443", "8080"], answer: 2 },
  { category: "Technology", question: "Who is widely considered the first computer programmer?", options: ["Alan Turing", "Charles Babbage", "Ada Lovelace", "Grace Hopper"], answer: 2 },
  
  // QUALITY ASSURANCE (QA)
  { category: "QA & Testing", question: "What is 'Regression Testing'?", options: ["Testing new features", "Testing if a recent code change broke existing features", "Testing the UI design", "Testing server load"], answer: 1 },
  { category: "QA & Testing", question: "What does 'UAT' stand for?", options: ["User Acceptance Testing", "Universal Automated Testing", "Unified API Testing", "User Application Tracking"], answer: 0 },
  { category: "QA & Testing", question: "Which of the following is an automated testing tool?", options: ["Figma", "Jira", "Selenium", "Docker"], answer: 2 },
  { category: "QA & Testing", question: "What is a 'Smoke Test'?", options: ["Testing hardware temperatures", "A deep, exhaustive security test", "A quick check to ensure core functions work", "Testing database architecture"], answer: 2 },
  { category: "QA & Testing", question: "In QA, what is a 'False Positive'?", options: ["A bug that is actually a feature", "A test that fails but the code is actually correct", "A test that passes but the code is broken", "A bug that cannot be reproduced"], answer: 1 },
  { category: "QA & Testing", question: "Which environment comes immediately before Production?", options: ["Development", "Staging/UAT", "Local", "Sandbox"], answer: 1 },
  { category: "QA & Testing", question: "What is 'Black Box' testing?", options: ["Testing without knowing the internal code structure", "Testing only the backend database", "Testing command-line interfaces", "Testing server hardware"], answer: 0 },
  { category: "QA & Testing", question: "Which metric tracks the percentage of code covered by automated tests?", options: ["Test Ratio", "Code Coverage", "Execution Rate", "Pass/Fail Index"], answer: 1 },
  { category: "QA & Testing", question: "What is the purpose of 'Load Testing'?", options: ["To see how the system behaves under expected peak traffic", "To test user login flows", "To check visual CSS bugs", "To test API security"], answer: 0 },
  { category: "QA & Testing", question: "A bug is found in Production. What is the standard term for the immediate fix?", options: ["Hotfix", "Feature Release", "Rollback", "Beta Patch"], answer: 0 },

  // MATHEMATICS
  { category: "Mathematics", question: "What is the next number in the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, __?", options: ["11", "12", "13", "15"], answer: 2 },
  { category: "Mathematics", question: "Solve: 8 ÷ 2(2 + 2) = ?", options: ["1", "16", "8", "4"], answer: 1 },
  { category: "Mathematics", question: "What is the square root of 144?", options: ["10", "12", "14", "16"], answer: 1 },
  { category: "Mathematics", question: "What is 15% of 200?", options: ["15", "20", "30", "45"], answer: 2 },
  { category: "Mathematics", question: "What is the value of Pi to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], answer: 1 },
  { category: "Mathematics", question: "Solve for x: 5x + 5 = 30", options: ["4", "5", "6", "7"], answer: 1 },
  { category: "Mathematics", question: "How many degrees are in a right angle?", options: ["45", "90", "180", "360"], answer: 1 },
  { category: "Mathematics", question: "What is 7 cubed (7³)?", options: ["21", "49", "343", "777"], answer: 2 },
  { category: "Mathematics", question: "A triangle has two angles of 60°. What is the third angle?", options: ["30°", "60°", "90°", "120°"], answer: 1 },
  { category: "Mathematics", question: "What is the binary representation of the number 5?", options: ["100", "101", "110", "111"], answer: 1 },

  // LOGIC & RIDDLES
  { category: "Logic", question: "If a computer processes 1 instruction every microsecond, how many does it process in a second?", options: ["100,000", "1,000,000", "10,000,000", "1,000"], answer: 1 },
  { category: "Logic", question: "How many bits make up a standard byte?", options: ["4", "8", "16", "32"], answer: 1 },
  { category: "Logic", question: "Some months have 31 days. How many have 28?", options: ["1", "6", "12", "0"], answer: 2 },
  { category: "Logic", question: "I speak without a mouth and hear without ears. What am I?", options: ["A shadow", "An echo", "A memory", "A dream"], answer: 1 },
  { category: "Logic", question: "The day before two days after the day before tomorrow is Saturday. What day is it today?", options: ["Thursday", "Friday", "Saturday", "Sunday"], answer: 1 },
  { category: "Logic", question: "If you have 3 apples and take away 2, how many do you have?", options: ["1", "2", "3", "0"], answer: 1 },
  { category: "Logic", question: "What comes next: 2, 6, 12, 20, 30, __?", options: ["40", "42", "44", "46"], answer: 1 },
  { category: "Logic", question: "Which is heavier: a ton of bricks or a ton of feathers?", options: ["Bricks", "Feathers", "They weigh the same", "Depends on gravity"], answer: 2 },
  { category: "Logic", question: "A farmer has 17 sheep. All but 9 die. How many are left?", options: ["8", "9", "17", "0"], answer: 1 },
  { category: "Logic", question: "Divide 30 by half and add 10. What do you get?", options: ["25", "50", "70", "90"], answer: 2 },

  // ENGLISH & LANGUAGE
  { category: "English Language", question: "Which of the following is a palindrome?", options: ["Rhythm", "Racecar", "Sequence", "Tension"], answer: 1 },
  { category: "English Language", question: "What is the synonym for 'Ubiquitous'?", options: ["Rare", "Omnipresent", "Complex", "Fragile"], answer: 1 },
  { category: "English Language", question: "Which word means 'to unnecessarily delay doing something'?", options: ["Procrastinate", "Accelerate", "Instigate", "Delegate"], answer: 0 },
  { category: "English Language", question: "What is the antonym of 'Benevolent'?", options: ["Kind", "Malevolent", "Generous", "Apathetic"], answer: 1 },
  { category: "English Language", question: "Which sentence is grammatically correct?", options: ["Their going to the store.", "They're going to the store.", "There going to the store.", "Theres going to the store."], answer: 1 },
  { category: "English Language", question: "What is the plural of 'Index' (in a mathematical/database context)?", options: ["Indexes", "Indexi", "Indices", "Indicees"], answer: 2 },
  { category: "English Language", question: "What does 'E.g.' stand for?", options: ["For example", "In other words", "And so on", "Note well"], answer: 0 },
  { category: "English Language", question: "What is a word that sounds the same as another word but has a different meaning?", options: ["Synonym", "Antonym", "Homophone", "Acronym"], answer: 2 },
  { category: "English Language", question: "Identify the adjective: 'The quick developer fixed the bug.'", options: ["Developer", "Fixed", "Quick", "Bug"], answer: 2 },
  { category: "English Language", question: "What is the past participle of 'Write'?", options: ["Wrote", "Writing", "Written", "Writes"], answer: 2 }
];