const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

let employeeArr = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function askQuestions(){
    inquirer.prompt([
        {
            name: "prompt",
            message: "This program will no create an HTML containing information on employees.  Please enter in the information of each employee one at a time as prompted."
        },
        {
            type: "list",
            name: "role",
            message: "Which role does this employee have?",
            choices: [
                "Engineer",
                "Intern",
                "Manager"
            ]
        },
        {
            type: "input",
            name: "name",
            message: "Input the employee's name"
        },
        {
            type: "input",
            name: "id",
            message: "Input employee id"
        },
        {
            type: "input",
            name: "email",
            message: "Input the employee's email"
        },
        {
            type: "input",
            name: "gitHubUserName",
            message: "Input engineer's github user name",
            when: (inputs) => inputs.role === "Engineer"
        },
        {
            type: "input",
            name: "school",
            message: "Input intern's school name",
            when: (inputs) => inputs.role === "Intern"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Input manager's office number",
            when: (inputs) => inputs.role === "Manager"
        },
        {
            type: "confirm",
            name: "again",
            message: "Would you like add another employee?"
        }
    ]).then((inputs)=>{

        switch(inputs.role){
            case "Engineer":
                employeeArr.push(new Engineer(inputs.name, inputs.id, inputs.email, inputs.gitHubUserName));
                break;
            case "Intern":
                employeeArr.push(new Intern(inputs.name, inputs.id, inputs.email, inputs.school));
                break;
            case "Manager":
                employeeArr.push(new Manager(inputs.name, inputs.id, inputs.email, inputs.officeNumber))
        };
        if(inputs.again){
            askQuestions();
        }
        else{
            console.log(employeeArr)
        }
    })
};

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
