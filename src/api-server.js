const BASE_URL ='localhost:3000'

export async function fetchStudents (){
const response = await fetch(`http://${BASE_URL}/students`)
const parsedStudents = await response.json()
return parsedStudents
    
}

export async function addStudent(newStudent){
  const options = {
        method:  "POST",
        body:  JSON.stringify(newStudent),
        headers: {
            "Content_Type": "application/json;  charset=UTF-8",
        },
    }
  const responseStudent = await fetch(`http://${BASE_URL}/students`, options)
const addedStudent = await responseStudent.json()
return addStudent

}

export async function deleteStudent(id){
    const options = {
        method:  "DELETE",
        headers: {
            "Content_Type": "application/json;  charset=UTF-8",
        },
    }
  
    const result = await fetch(`http://${BASE_URL}/students/${id}`, options)
const deletedStudent = await result.json()
return deletedStudent

}

export async function updateStudent(id, valueToUpdate){
    const options = {
        method:  "PATCH",
        body:  JSON.stringify(valueToUpdate),
        headers: {
            "Content_Type": "application/json;  charset=UTF-8",
        },

    }
const result = await fetch(`http://${BASE_URL}/students${id}`, options)
const studentParce =  await result.json()
return studentParce
}
