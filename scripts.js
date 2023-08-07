document.addEventListener('DOMContentLoaded', () => {
    const quizList = document.getElementById('quiz-list');
    const submitButton = document.getElementById('submit-button');
    const resultSection = document.getElementById('result-section');
    const resultMessage = document.getElementById('result-message');
    const countdownDisplay = document.getElementById('countdown-display');

    // Replace this with your actual AWS quiz data
        // Replace this with your actual AWS quiz data
        const quizData = [
            {
                question: 'What does AWS stand for?',
                options: ['Amazon Web Services', 'Advanced Web Solutions', 'Automatic Web Services'],
                correctAnswer: 0
            },
            {
                question: 'Which AWS service is used for scalable object storage?',
                options: ['Amazon S3', 'Amazon EC2', 'AWS Lambda'],
                correctAnswer: 0
            },
            {
                question: 'What is the managed Kubernetes service provided by AWS?',
                options: ['Amazon EKS', 'Amazon ECS', 'Amazon ECR'],
                correctAnswer: 0
            },
            {
                question: 'What is the AWS service that enables serverless computing?',
                options: ['AWS Lambda', 'Amazon RDS', 'Amazon DynamoDB'],
                correctAnswer: 0
            },
            {
                question: 'Which AWS service provides a virtual network for your AWS resources?',
                options: ['Amazon VPC', 'Amazon S3', 'Amazon EBS'],
                correctAnswer: 0
            },
            {
                question: 'What AWS service allows you to set up and manage a private connection between your on-premises data centers and AWS?',
                options: ['AWS Direct Connect', 'Amazon RDS', 'Amazon Redshift'],
                correctAnswer: 0
            },
            {
                question: 'Which AWS service is used for content delivery and acceleration?',
                options: ['Amazon CloudFront', 'Amazon Glacier', 'Amazon SQS'],
                correctAnswer: 0
            },
            {
                question: 'What is the AWS service that provides a fully managed NoSQL database?',
                options: ['Amazon DynamoDB', 'Amazon RDS', 'Amazon Redshift'],
                correctAnswer: 0
            },
            {
                question: 'Which AWS service is used to deploy and manage containerized applications at scale?',
                options: ['Amazon ECS', 'Amazon EKS', 'Amazon ECR'],
                correctAnswer: 0
            },
            {
                question: 'What AWS service provides a way to set up and run applications without thinking about servers?',
                options: ['AWS Elastic Beanstalk', 'Amazon S3', 'Amazon EC2'],
                correctAnswer: 0
            },
            {
                question: 'Which AWS service is used for real-time data streaming and analytics?',
                options: ['Amazon Kinesis', 'Amazon Redshift', 'Amazon RDS'],
                correctAnswer: 0
            },
            {
                question: 'What AWS service allows you to register and manage domain names?',
                options: ['Amazon Route 53', 'Amazon CloudFront', 'Amazon S3'],
                correctAnswer: 0
            },
            {
                question: 'Which AWS service provides a secure and durable object storage solution?',
                options: ['Amazon S3', 'Amazon EBS', 'Amazon RDS'],
                correctAnswer: 0
            },
            {
                question: 'What is the AWS service used for data warehousing and business intelligence?',
                options: ['Amazon Redshift', 'Amazon DynamoDB', 'Amazon EC2'],
                correctAnswer: 0
            },
            {
                question: 'Which AWS service provides an automated and serverless way to move data between AWS services?',
                options: ['AWS Glue', 'Amazon S3', 'Amazon DynamoDB'],
                correctAnswer: 0
            },
            {
                question: 'What AWS service is used for queuing and message processing between distributed application components?',
                options: ['Amazon SQS', 'Amazon S3', 'Amazon RDS'],
                correctAnswer: 0
            },
            {
                question: 'Which AWS service provides a scalable and managed relational database service?',
                options: ['Amazon RDS', 'Amazon DynamoDB', 'Amazon Redshift'],
                correctAnswer: 0
            },
            {
                question: 'What is the AWS service used for serverless event-driven computing?',
                options: ['AWS Lambda', 'Amazon ECS', 'Amazon EKS'],
                correctAnswer: 0
            },
            {
                question: 'Which AWS service is used for secure, durable, and extremely low-cost storage for data archiving and long-term backup?',
                options: ['Amazon Glacier', 'Amazon S3', 'Amazon EBS'],
                correctAnswer: 0
            },
            {
                question: 'What is the AWS service used for managing and scaling applications using containers?',
                options: ['Amazon ECS', 'Amazon EKS', 'Amazon EC2'],
                correctAnswer: 0
            },
            // Add more quiz questions and answers here
        ];

    let userAnswers = new Array(quizData.length).fill(null);
    let timerInterval;
    
    /// Function to handle user's answer selection
    function selectAnswer(questionIndex, optionIndex) {
        userAnswers[questionIndex] = optionIndex;
    }

    // Add event listener to quiz options
    quizList.addEventListener('change', (event) => {
        const target = event.target;
        if (target.type === 'radio') {
            const questionIndex = parseInt(target.name.substring(1));
            const optionIndex = parseInt(target.value);
            selectAnswer(questionIndex, optionIndex);
        }
    });
    // Function to render quiz questions and options
    function renderQuiz() {
        quizData.forEach((questionData, index) => {
            const quizItem = document.createElement('div');
            quizItem.classList.add('quiz-item');
            quizItem.innerHTML = `
                <div class="question">${questionData.question}</div>
                <div class="options">
                    ${questionData.options.map((option, optionIndex) => `
                        <label>
                            <input type="radio" name="q${index}" value="${optionIndex}">
                            ${option}
                        </label>
                    `).join('')}
                </div>
            `;
            quizList.appendChild(quizItem);
        });
    }

    // Function to start the countdown timer
    function startTimer(duration) {
        let timeLeft = duration;
        timerInterval = setInterval(() => {
            countdownDisplay.textContent = `Time left: ${timeLeft} seconds`;
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(timerInterval);
                submitQuiz();
            }
        }, 1000);
    }

    // Function to handle quiz submission
    function submitQuiz() {
        clearInterval(timerInterval);
        const score = calculateScore();
        displayResult(score);
        resultSection.style.display = 'block';
        quizList.style.display = 'none';
        submitButton.style.display = 'none';
    }

    // Function to calculate the quiz score
    function calculateScore() {
        let score = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === quizData[index].correctAnswer) {
                score++;
            }
        });
        return score;
    }

    // Function to display the quiz result
      // Function to display the quiz result
      function displayResult(score) {
        const totalQuestions = quizData.length;
        resultMessage.innerHTML = `You scored ${score} out of ${totalQuestions} questions correctly.`;

        // Show correct answers and highlight user's answers
        quizData.forEach((questionData, index) => {
            const quizItem = quizList.children[index];
            const options = quizItem.querySelectorAll('input[type="radio"]');
            const userAnswerIndex = userAnswers[index];
            const correctAnswerIndex = questionData.correctAnswer;

            options.forEach((option, optionIndex) => {
                option.disabled = true; // Disable options after quiz submission

                if (optionIndex === correctAnswerIndex) {
                    option.parentElement.classList.add('correct-answer');
                }

                if (optionIndex === userAnswerIndex) {
                    option.parentElement.classList.add('user-answer');
                    if (userAnswerIndex === correctAnswerIndex) {
                        option.parentElement.classList.add('correct-user-answer');
                    } else {
                        option.parentElement.classList.add('wrong-user-answer');
                    }
                }
            });
        });
    }

    // Add event listener to submit button
    submitButton.addEventListener('click', submitQuiz);

    // Render the quiz on page load
    renderQuiz();

    // Start the countdown timer (e.g., 5 minutes for the entire quiz)
    const quizDurationInSeconds = 300;
    startTimer(quizDurationInSeconds);
});
