import {fetchStudents} from './api-server.js'
import {addStudent} from './api-server.js'
import {deleteStudent} from './api-server.js'
import {updateStudent} from './api-server.js'


const НТТР = 'http://localhost:3000/students';
const list = document.querySelector('.student-list')
const btnStudent  = document.querySelector('.getStudentsBtn')
const form = document.querySelector('form')

const modal = document.getElementById("updateModal")
const closeModal = document.querySelector(".close");
const updateForm = document.getElementById("updateForm");

let currentStudentId = null;  

form.addEventListener('submit', onSubmit)
btnStudent.addEventListener('click', onClick)

function onClick(){
  fetchStudents()
  .then(allStudents =>{
      const addStudent = studentList(allStudents)
      list.innerHTML = addStudent
  })
}



function onSubmit(e){
  e.preventDefault()
const formEl  = e.currentTarget.elements

const newStudent = {
  name: formEl.name.value,
  age: formEl.age.value,
  course: formEl.course.value,
  skills: [formEl.skills.value],
  email:  formEl.email.value,
  isEnrolled:  formEl.isEnrolled.checked
}

addStudent(newStudent)
.then (response => 
console.log("Студента додано")
)

  e.currentTarget.reset()
}



function studentList(addList){
    return addList.map((student)=>{
        return `
        <li id="${student.id}">
      <h1>Ім'я: ${student.name}</h1>
      <p>Вік: ${student.age}</p>
      <p>Курс: ${student.course}</p>
      <p>Скіли: ${student.skills}</p>
      <p>Email: ${student.email}</p>
      <p>Зараховано: ${student.isEnrolled}</p>
      <button class="deleteBtn" type="button">Видалити студента</button>
      <button>Оновити студента</button>
    </li>
        `
    }).join('')
}



list.addEventListener('click', (e)=>{
  if (e.target.classList.contains('deleteBtn')){
    const studentDel = e.target.parentNode.id;
    console.log(studentDel);
    deleteStudent(studentDel)
    .then(()=>{
      console.log("Студента видалено");
      onClick()
    })
    .catch(err => console.error("Помилка видалення студента", err))
  }
})



function onUpdateStudent(event){
  const studentElement = event.target.closest('li');
  currentStudentId = studentElement.dataset.id;

  const student = {
      name: studentElement.querySelector('h1').textContent.replace("Ім'я: ", ""),
      age: studentElement.querySelector('p:nth-of-type(1)').textContent.replace("Вік: ", ""),
      course: studentElement.querySelector('p:nth-of-type(2)').textContent.replace("Курс: ", ""),
      skills: studentElement.querySelector('p:nth-of-type(3)').textContent.replace("Скіли: ", ""),
      email: studentElement.querySelector('p:nth-of-type(4)').textContent.replace("Email: ", ""),
      isEnrolled: studentElement.querySelector('p:nth-of-type(5)').textContent.includes('true')
  };

  updateForm.name.value = student.name;
  updateForm.age.value = student.age;
  updateForm.course.value = student.course;
  updateForm.skills.value = student.skills;
  updateForm.email.value = student.email;
  updateForm.isEnrolled.checked = student.isEnrolled;

  modal.style.display = "block";  
}


closeModal.onclick = () => { modal.style.display = "none"; };

updateForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const UpdatedStudent = {
      name: updateForm.name.value,
      age: updateForm.age.value,
      course: updateForm.course.value,
      skills: updateForm.skills.value.split(','), 
      email: updateForm.email.value,
      isEnrolled: updateForm.isEnrolled.checked
  };

  patchStudent(currentStudentId, UpdatedStudent).then(() => {
      alert('Дані студента оновлено');
      modal.style.display = "none"; 
      btnStudent.click();
  });
});


window.onclick = (event) => {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}