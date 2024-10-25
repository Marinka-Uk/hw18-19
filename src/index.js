import {fetchStudents} from './api-server.js'
import {addStudent} from './api-server.js'
import {deleteStudent} from './api-server.js'
import {updateStudent} from './api-server.js'


const НТТР = 'http://localhost:3000/students';
const list = document.querySelector('.student-list')
const btnStudent  = document.querySelector('.student-btn')
const form = document.querySelector('form')

getstudentsBtn.addEventListener('click', onGetStudentsBtn)
form.addEventListener('submit', onSubmit)


btnStudent.addEventListener('click',()=>{
    getStudent()
    .then(allStudents => {const addStudent = studentList(addStudent)
        list.insertAdjacentHTML('beforeend', addStudent)
    })
} )


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


    e.currentTarget.reset()
}