import {fetchStudents} from './api-server.js'
import {addStudent} from './api-server.js'
import {deleteStudent} from './api-server.js'
import {updateStudent} from './api-server.js'


const НТТР = 'http://localhost:3000/students';
const list = document.querySelector('.student-list')
const btnStudent  = document.querySelector('.getStudentsBtn')
const form = document.querySelector('form')


form.addEventListener('submit', onSubmit)
btnStudent.addEventListener('click', onClick)

function onClick(){
  fetchStudents()
  .then(allStudents =>{
      const addStudent = studentList(allStudents)
      list.insertAdjacentHTML('beforeend', addStudent)
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
        <li>
      <h1>Ім'я: ${student.name}</h1>
      <p>Вік: ${student.age}</p>
      <p>Курс: ${student.course}</p>
      <p>Скіли: ${student.skills}</p>
      <p>Email: ${student.email}</p>
      <p>Зараховано: ${student.isEnrolled}</p>
      <button>Видалити студента</button>
      <button>Оновити студента</button>
    </li>
        `
    })
}




