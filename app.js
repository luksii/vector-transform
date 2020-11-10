import { TransformPoints } from "./TransformPoints.js";
import { PointManager } from "./PointManager.js";
function component() {
    const body = document.createElement('div');
    body.classList.add('full-width', 'full-height');
    body.classList.add('app-main');
    body.classList.add('app-dark');
    body.classList.add('font');
    const nav = document.createElement('ul');
    nav.classList.add('nav');
    nav.classList.add('font');
    // const icon = document.createElement('li');
    // icon.classList.add('app-icon');
    // const img = document.createElement('img');
    // img.src = 'icon.png';
    // img.classList.add('app-icon');
    // icon.appendChild(img);
    // nav.appendChild(icon);
    const name = document.createElement('li');
    name.innerHTML = 'DN01';
    name.classList.add('app-name');
    nav.appendChild(name);
    const inputDiv = document.createElement('div');
    inputDiv.classList.add('app-input-wrap');
    const input = document.createElement('textarea');
    input.classList.add('app-input');
    input.classList.add('font');
    input.id = 'stdin';
    inputDiv.appendChild(input);
    const actionButton = document.createElement('button');
    actionButton.textContent = 'Let\'s Do It!';
    actionButton.classList.add('app-action-button', 'font');
    inputDiv.appendChild(actionButton);
    const outputDiv = document.createElement('div');
    outputDiv.classList.add('app-output-wrap', 'font');
    const output = document.createElement('div');
    output.classList.add('app-output');
    output.classList.add('font');
    output.id = 'stdout';
    outputDiv.appendChild(output);
    body.appendChild(nav);
    body.appendChild(inputDiv);
    body.appendChild(outputDiv);
    return {
        body: body,
        stdin: input,
        stdout: output,
        actionButton: actionButton
    };
}
const app = component();
document.body.appendChild(app.body);
app.actionButton.addEventListener('click', () => {
    const pm = new PointManager(app.stdin);
    const tm = new TransformPoints(app.stdout);
    tm.Transform(pm);
});
