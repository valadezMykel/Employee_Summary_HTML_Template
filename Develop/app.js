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

console.log("This program will now create an HTML containing information on employees.  Please enter in the information of each employee one at a time as prompted.")

function askQuestions(){
    inquirer.prompt([
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
            const htmlString = render(employeeArr);
            fs.writeFile(outputPath, htmlString, (err) => {
                if (err) throw err;
                console.log("html created")
            });
        }
    })
};
askQuestions();