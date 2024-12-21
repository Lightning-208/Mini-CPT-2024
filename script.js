   let selectedimage = ""; // Variable to store the currently displayed teacher's image
   let resetcount = 0; // Counter for the number of attempts
   const maxDisplayCount = 5; // Maximum number of attempts before the quiz ends
   let mode = ""; // Variable to track the current mode ("Easy" or "Hard")
   let score = 0; // Tracks the player's score
   let indexcount = 0; // Tracks the current index of displayed images
   let easyTeacherArray = []; // Array to store random indices for Easy mode
   let hardTeacherArray = []; // Array to store random indices for Hard mode

// Function to hide all teacher images
   function hideTeachers() 
    {
        let teacherImages = document.querySelectorAll(".teacherImages img"); // Select all teacher images
        for (let i = 0; i < teacherImages.length; i++) 
        {
			teacherImages[i].style.display = "none"; // Hide each image
        }
    }

// Function to generate an array of unique random indices
    function getRandomTeacherIndex(imageArray) 
    {
        let indices = new Set(); // Use a Set to ensure unique indices
        while (indices.size < 5) 
        {
            indices.add(Math.floor(Math.random() * imageArray.length)); // Add random indices
        }
    return Array.from(indices); // Convert the Set to an array
    }

// Function to initialize Easy mode
    function easyTeacherSelector() 
    {
		let images = document.querySelectorAll(".teacherImages img"); // Select all teacher images
		showOneEasyTeacher(images); // Display one random teacher image for Easy mode
		score = 0; // Reset the score
	}

// Function to display a random Easy mode teacher
	function showOneEasyTeacher(images) 
	{
		mode = "Easy"; // Set the mode to Easy
		resetcount = 0; // Reset the counter
		indexcount = 0; // Reset the index count
		score = 0; // Reset the score
		hideTeachers(); // Hide all teacher images
		document.getElementById("scoreDisplay").textContent = `Your score: ${score}/5`; // Update the score display
		let EasyImages = []; // Array to store Easy mode images
		let j = 0; // Counter for Easy mode images
	for (let i = 0; i < images.length; i++) 
    {
        if (images[i].className == "Easy") // Check if the image belongs to Easy mode
        {
            EasyImages[j] = images[i]; // Add the image to the EasyImages array
            j++;
        }
    }

    easyTeacherArray = getRandomTeacherIndex(EasyImages); // Generate random indices

    EasyImages[easyTeacherArray[indexcount]].style.display = "block"; // Display the teacher
    selectedimage = EasyImages[easyTeacherArray[indexcount]].src.split('/').pop(); // Get the file name of the image
    }   

// Function to initialize Hard mode
	function hardTeacherSelector() 
	{
		let images = document.querySelectorAll(".teacherImages img"); // Select all teacher images
		showOneHardTeacher(images); // Display one random teacher image for Hard mode
		score = 0; // Reset the score
    }

// Function to display a random Hard mode teacher
	function showOneHardTeacher(images) 
	{
		mode = "Hard"; // Set the mode to Hard
		resetcount = 0; // Reset the counter
		indexcount = 0; // Reset the index count
		score = 0; // Reset the score
		hideTeachers(); // Hide all teacher images
		document.getElementById("scoreDisplay").textContent = `Your score: ${score}/5`; // Update the score display
		let HardImages = []; // Array to store Hard mode images
		let j = 0; // Counter for Hard mode images
    for (let i = 0; i < images.length; i++) 
	{
	    if (images[i].className == "Hard") // Check if the image belongs to Hard mode
	    {
            HardImages[j] = images[i]; // Add the image to the HardImages array
            j++;
		}
	}

    hardTeacherArray = getRandomTeacherIndex(HardImages); // Generate random indices

    HardImages[hardTeacherArray[indexcount]].style.display = "block"; // Display the teacher
    selectedimage = HardImages[hardTeacherArray[indexcount]].src.split('/').pop(); // Get the file name of the image
}

// Map to match teacher image file names with their names
    const TeacherMap = new Map
	([
    ["DeRuiterAugust2020ear.jpg", "DeRuiter"],
    ["DeRuiterAugust2020mouth.jpg", "DeRuiter"],
    ["Choieye.jpg", "Choi"],
    ["Cassareye.png", "Cassar"],
    ["Alan-Wongsmile.jpg", "Wong"],
    ["Cassarforehead.png", "Cassar"],
    ["PayneEye.jpg", "Payne"],
    ["Paynehair.jpg", "Payne"],
    ["Lordaneye.png", "Lordan"],
    ["Lordanmouth.png", "Lordan"],
    ["Crease.jpg", "Wong"],
    ["Alan-Wongeyebrow.jpg", "Wong"],
    ["Choiforhead.jpg", "Choi"],
    ["CernaForhead.png", "Cerna"],
    ["Birsongeye.png", "Birdsong"],
    ["Mcracken.png", "Mcracken"],
    ["Kuoglasses.png", "Kuo"],
    ["Collinseye.png","Collins"]
	]);

// Function to check if the selected answer is correct
    function checkAnswer() 
    {
		const sumbitButton = document.querySelector("button[type = 'button']")
		let selectedAnswer = document.getElementById("teacherSelect").value; // Get the user's selected answer
	    let resultElement = document.getElementById("result"); // Get the result display element

        if (!selectedAnswer) // If no answer is selected
        {
            resultElement.textContent = "Please select an answer!"; // Prompt the user
            resultElement.style.textShadow = "0 0 10px yellow, 0 0 20px yellow, 0 0 30px yellow";
            resultElement.style.color = "yellow";
            return;
        }
        sumbitButton.disabled = true;
        setTimeout(() => {
        sumbitButton.disabled = false;
   } , 1000);



    let answer = TeacherMap.get(selectedimage); // Get the correct answer for the displayed image
    let isCorrect = (answer == selectedAnswer); // Check if the user's answer is correct

    updateScore(isCorrect); // Update the score based on correctness
    resultElement.textContent = isCorrect ? "Correct!" : "Incorrect!"; // Display feedback
    resultElement.style.color = isCorrect ? "lime" : "tomato"; // Set feedback color
    resultElement.style.fontSize = "32px"; // Increase feedback font size
    resultElement.style.textShadow = isCorrect
        ? "0 0 10px lime, 0 0 20px lime, 0 0 30px lime"
        : "0 0 10px tomato, 0 0 20px tomato, 0 0 30px tomato";
    // Wait before moving to the next image or ending the game
    setTimeout(() => 
    {
        resetcount++; // Increment the attempt counter
            if (resetcount >= maxDisplayCount || indexcount >= 4) // Check if the game should end
            {
               endScreen(); // Show the end screen
            } 
            else 
            {
            indexcount++; // Move to the next image
            if (mode == "Easy") 
            {
                let images = document.querySelectorAll(".teacherImages img");
                let EasyImages = [];
                let j = 0;

                for (let i = 0; i < images.length; i++) 
                {
                    if (images[i].className == "Easy") 
                    {
                        EasyImages[j] = images[i];
                        j++;
                    }
                }

                hideTeachers();
                EasyImages[easyTeacherArray[indexcount]].style.display = "block";
                selectedimage = EasyImages[easyTeacherArray[indexcount]].src.split('/').pop();
            } 
            else if (mode == "Hard") 
            {
                let images = document.querySelectorAll(".teacherImages img");
                let HardImages = [];
                let j = 0;

                for (let i = 0; i < images.length; i++) 
                {
                    if (images[i].className == "Hard") 
                    {
                        HardImages[j] = images[i];
                        j++;
                    }
                }

                hideTeachers();
                HardImages[hardTeacherArray[indexcount]].style.display = "block";
                selectedimage = HardImages[hardTeacherArray[indexcount]].src.split('/').pop();
            }
            resultElement.textContent = ""; // Clear feedback text
            resultElement.style.textShadow = ""; // Reset glow effect
        }
    }, 1000); // 1-second delay before transitioning
}

// Function to update the score display
	function updateScore(isCorrect) 
	{
		if (isCorrect) 
		{
			score += 1; // Increment score for a correct answer
		}
	document.getElementById("scoreDisplay").textContent = `Your score: ${score}/5`; // Update the score display
	}

// Function to display the end screen
	function endScreen() 
	{
		document.body.innerHTML = `
        <h1 style="color: Orange; text-align: center; text-shadow: 0 0 10px lime, 0 0 20px lime, 0 0 30px lime; animation: glowPulse 2s infinite;">QUIZ OVER</h1>
        <p style="color: Lime; font-family: cursive; 
		font-size: 50px; text-align: center; text-shadow: 0 0 10px lime, 0 0 20px lime, 0 0 30px lime; animation: glowPulse 2s infinite;">Thanks for playing!</p>
        <p style="color: skyBlue; text-align: center; font-size: 50px; text-shadow: 0 0 10px skyBlue, 0 0 20px skyBlue, 0 0 30px skyBlue; animation: 
		glowPulse 2s infinite;">Your final score: ${score}/5</p>
        <button id="restartButton" style="position: fixed; 
		font-family: cursive; bottom: 20px; right: 20px; background-color: 
		Green; border: none; color: white; padding: 10px 20px; font-size: 16px; 
		cursor: pointer; text-shadow: 0 0 5px white;">Click To Restart Quiz</button>
    `;

    document.getElementById("restartButton").addEventListener("click", startQuizAgain); // Add event listener for restarting
}

// Function to restart the quiz
    function startQuizAgain() 
	{
		location.reload(); // Reload the page to reset the quiz
	}

// Automatically initialize Easy mode when the page loads
    document.addEventListener("DOMContentLoaded", easyTeacherSelector);
