/* eslint-disable no-undef */
let leftSide = document.getElementById('left-side');
let leftSideList = document.createElement('ul');

/** @see {https://developer.mozilla.org/en-US/docs/Web/API/Element/classList} */
leftSideList.classList.add('list-unstyled');

// Direct style assignment
leftSideList.style.cursor = 'pointer';

// try catch
try {
  let students = await axios.get('http://localhost:8000/students');
  renderStudents(students.data);
} catch (error) {
  if (error.response) {
    console.error('Axios: bat HTTP response ', error.response.status);
  } else {
    console.error('Axios: bad network error ', error);
  }
}

function renderStudents(students) {
  for (let student of students) {
    // console.log(student.firstName + ' ' + student.lastName);
    // console.log(`${student.firstName} ${student.lastName}`);
    leftSideList.insertAdjacentHTML(
      'beforeend',
      `<li id="${student.id}">${student.firstName} ${student.lastName}</li>`
    );
  }
}

// Event delegation!
leftSideList.addEventListener('click', async (event) => {
  let studentId = event.target.id;
  let student;
  try {
    student = await axios.get(`http://localhost:8000/students/${studentId}`);
  } catch (error) {
    if (error.response) {
      console.error('Axios: bat HTTP response ', error.response.status);
    } else {
      console.error('Axios: bad network error ', error);
    }
  }

  let rightSide = document.getElementById('right-side');
  let studentDetails = document.createElement('div');
  studentDetails.insertAdjacentHTML(
    'beforeend',
    `<p>${student.data.firstName} ${student.data.lastName} lives in ${student.data.city}, ${student.data.province}`
  );
  rightSide.replaceChildren(studentDetails);
});

leftSide.append(leftSideList);
