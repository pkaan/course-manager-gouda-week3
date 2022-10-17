import { students } from './data/all-data.js';

let leftSide = document.getElementById('left-side');
let leftSideList = document.createElement('ul');
leftSideList.classList.add('list-unstyled');

for (let student of students) {
  // console.log(student.firstName + ' ' + student.lastName);
  // console.log(`${student.firstName} ${student.lastName}`);
  leftSideList.insertAdjacentHTML(
    'beforeend',
    `<li id="${student.id}">${student.firstName} ${student.lastName}</li>`
  );
}

leftSideList.addEventListener('click', (event) => {
  let studentId = event.target.id;
  let student = students.find((s) => s.id === Number(studentId));
  console.log('You clicked on:', student);

  let rightSide = document.getElementById('right-side');
  let studentDetails = document.createElement('div');
  studentDetails.insertAdjacentHTML(
    'beforeend',
    `<p>${student.firstName} ${student.lastName} lives in ${student.city}, ${student.province}`
  );
  rightSide.replaceChildren(studentDetails);
});

leftSide.append(leftSideList);
