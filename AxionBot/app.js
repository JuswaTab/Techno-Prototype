// Array of questions and answers
const qaArray = [
    {
        question: "Schedule for Garbage Pickup in the Villanueva Area.",
        answer: "PickUp Days: Saturday\nPickUp Time: 6:45AM - 8:30AM\nNote:\n   *Please ensure that garbage is placed outside by the designated time.\n   *Use approved garbage bins and separate recyclables when possible."
    },
    {
        question: "Garbage Pickup Schedule for All Villanueva Barangays.",
        answer: "PickUp Days: Monday, Wednesday, Friday\nPickUp Time: 6:45AM - 8:30AM"
    },
    {
        question: "What are biodegradable materials?",
        answer: "Biodegradable materials can decompose naturally and are environmentally friendly."
    },
    {
        question: "What is composting?",
        answer: "Composting is the natural process of recycling organic matter, such as food scraps and yard waste."
    },
    {
        question: "What is recycling?",
        answer: "Recycling is the process of collecting, processing, and converting materials that would otherwise be discarded as waste into new products. The main goal of recycling is to reduce the consumption of fresh raw materials, minimize energy usage, decrease pollution, and lower greenhouse gas emissions, thereby benefiting the environment. Commonly recycled materials include paper, glass, metal, plastic, and electronics, each having its own recycling process. Recyclable materials are collected through various means, such as curbside pickup, recycling bins, and drop-off centers. Once collected, these materials are sorted, cleaned, and processed into raw materials that can be used to manufacture new products, ranging from recycled paper items to new glass bottles or aluminum cans. Recycling helps conserve natural resources, saves energy, reduces landfill waste, and supports sustainable practices. However, not all materials are recyclable, and contamination—mixing non-recyclable items with recyclables—can hinder the recycling process. Public awareness and proper sorting are crucial for effective recycling efforts, and by participating in recycling programs, individuals and communities can contribute to environmental conservation and sustainability."
    },
    {
        question: "How should I separate my recyclables from non-recyclables?",
        answer: "To separate recyclables from non-recyclables, place clean and dry items like paper, cardboard, plastic bottles marked with recycling codes, aluminum cans, and glass jars in the recycling bin. Rinse containers to remove food residue, and flatten cardboard to save space. Non-recyclables include food-stained items like greasy pizza boxes, plastic bags, Styrofoam, and hazardous materials such as batteries, which need special disposal. For composting, keep food scraps and coffee grounds separate if you have a compost system. Remember to check local recycling rules, as accepted materials can vary by location."
    },
    {
        question: "How do I dispose of batteries, chemicals, or paint safely?",
        answer: "To dispose of batteries, chemicals, or paint safely, take them to a designated hazardous waste collection facility or event, as these items should not go in regular trash or recycling bins. Many communities have drop-off centers or periodic collection days specifically for hazardous materials. For batteries, check if local stores or recycling centers offer drop-off bins. If disposing of paint, consider donating usable paint or drying out small amounts of latex paint (by adding kitty litter) before disposal, but avoid pouring it down drains. Always follow local regulations for hazardous waste disposal to protect the environment."
    },
    {
        question: "Are there any changes to the pickup schedule for holidays?",
        answer: "There will be no waste pickups on holidays. Please plan accordingly, and refer to the updated schedule for the next available pickup date."
    },
    {
        question: "What are the fees for garbage collection, and how can I pay?",
        answer: "The garbage collection fee is 500, and additional charges may apply from the garbage collector. You can pay directly to the garbage collector or through the payment methods they provide."
    }

];

const historyEntries = [];

document.addEventListener('DOMContentLoaded', function () {
    // Submit question from input
    document.getElementById('submit').addEventListener('click', function () {
        submitQuestion();
    });

    // New Chat button clears current output display but keeps history
    document.getElementById('new-chat').addEventListener('click', function () {
        document.getElementById('output').innerHTML = "";
        document.getElementById('user-input').value = "";
        showIntroElements(); // Show intro elements again when starting a new chat
    });

    // Add click event listeners to each suggested question button
    document.querySelectorAll('.suggestion').forEach(button => {
        button.addEventListener('click', function () {
            const question = button.innerText;
            document.getElementById('user-input').value = question;

            // Clear previous conversation display, but keep the history saved
            document.getElementById('output').innerHTML = "";
            hideIntroElements(); // Hide intro elements on suggested question click

            // Automatically submit the question
            submitQuestion();
        });
    });
});

// Function to hide intro elements
function hideIntroElements() {
    document.querySelector('h1').style.display = 'none'; // Hide the heading
    document.querySelector('.suggested-questions').style.display = 'none'; // Hide the suggested questions
    document.querySelector('.bot-image-container').style.display = 'none'; // Hide robot image
}

// Function to show intro elements
function showIntroElements() {
    document.querySelector('h1').style.display = 'block'; // Show the heading
    document.querySelector('.suggested-questions').style.display = 'flex'; // Show the suggested questions
    document.querySelector('.bot-image-container').style.display = 'flex'; // Show robot image
}

// Function to check if address is provided
function isAddressProvided(input) {
    // Simple check for presence of common address elements or specific addresses
    const addressKeywords = ["villanueva", "dayawan", "san martin", "imelda", "poblacion 1", "pob 2", "pob 3", "pob 4", "looc", "tambobong", "kimaya", "katipunan", "balacanas"]; // Ensure lowercase
    return addressKeywords.some(keyword => input.includes(keyword));
}

// Function to submit the question
function submitQuestion() {
    const userInput = document.getElementById('user-input').value.trim().toLowerCase();
    const outputElement = document.getElementById('output');

    if (userInput === "") {
        alert("Please enter a question."); // Alert if input is empty
        return;
    }

    // Define keywords that indicate a garbage pickup request
    const garbageRequestKeywords = ["garbages", "asap", "collects", "need", "request", "basura", "ipakuha", "kuhaon"];
    const isGarbageRequest = garbageRequestKeywords.some(keyword => userInput.includes(keyword));

    // Create user message element
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerText = document.getElementById('user-input').value.trim(); // Original case

    // Create bot message element
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot-message';

    let answerText;

    if (isGarbageRequest) {
        // Check if address is provided
        if (!isAddressProvided(userInput)) {
            alert("Please provide an address."); // Alert if address is not found
            return;
        }
        answerText = "The request has been sent to the garbage collector; please be patient and wait. Please be ready to pay the service charge fee of 500.";
        historyEntries.push({ question: userInput, answer: answerText });
        alert("Request sent to garbage collector");
    } else {
        // Find an exact match in the question-answer array
        const foundQA = qaArray.find(qa => qa.question.toLowerCase() === userInput.toLowerCase());

        if (foundQA) {
            answerText = foundQA.answer;
            historyEntries.push({ question: userInput, answer: answerText });
        } else {
            answerText = "Sorry, I don't have the ability to answer that question right now. Please ask questions only based on garbage.";
            historyEntries.push({ question: userInput, answer: "No answer found." });
        }
    }

    // Append user message
    outputElement.appendChild(userMessage);
    // Append bot message
    outputElement.appendChild(botMessage);

    // Scroll to bottom
    outputElement.scrollTop = outputElement.scrollHeight;

    // Clear input
    document.getElementById('user-input').value = "";

    // Type out the answer with animation
    typeText(botMessage, answerText, 10); // 50ms delay per character

    // Hide suggested questions and robot image after submitting a question
    hideIntroElements();
}

// Function to type text with animation
function typeText(element, text, delay) {
    element.innerHTML = ''; // Clear any existing text
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            const char = text.charAt(i);
            if (char === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += char;
            }
            i++;
        } else {
            clearInterval(timer);
        }
    }, delay);
}

// Function to update history display
function updateHistoryDisplay(historyEntries) {
    const historyContainer = document.querySelector('.history');
    historyContainer.innerHTML = ''; // Clear current history display

    historyEntries.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.className = 'history-item';
        entryElement.innerHTML = `<strong>Q:</strong> ${entry.question}<br><strong>A:</strong> ${entry.answer.replace(/\n/g, '<br>')}`;
        historyContainer.appendChild(entryElement);
    });
}
