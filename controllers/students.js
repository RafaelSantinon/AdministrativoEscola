const fs = require("fs")
const data = require("../data.json")
const Intl = require("intl")
const {date, schollYear} = require("../utils")

//index
exports.index = function(req, res){

    res.render("students/index", {students:data.students})
}

//show
exports.show = function(req, res){

    const {id} = req.params
    console.log(id)

    const foundStudents = data.students.find(function(students){
        return students.id == id
    })
    
    if(!foundStudents) return res.send("O professor não foi encontardo")

    const student = {
        ...foundStudents,
        birth: date(foundStudents.birth).birthDay,
        year: schollYear(foundStudents.year)
    }

    return res.render("students/show", {student})
}

//create page
exports.create = function(req, res){
    res.render("students/create")
}

//create
exports.post = function(req, res){
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Faltando informações")
        }
    }

    let {avatar_url, name, birth, email, year, hours} = req.body

    birth = Date.parse(birth)

    let id = 1
    const lastMember = data.students[data.students.length -1]

    if(lastMember){
        id = lastMember.id + 1
    }

    data.students.push({
        id,
        avatar_url,
        name,
        birth,
        email,
        year,
        hours
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2),function(err){
        if (err) return res.send("Erro em salvar os dados")

        return res.redirect("/")
    })
}

//editar
exports.edit = function(req, res){

    const {id} = req.params

    const foundStudents = data.students.find(function(students){
        return students.id == id
    })
    
    if(!foundStudents) return res.send("O professor não foi encontardo")

    const student = {
        ...foundStudents,
        birth: date(foundStudents.birth).iso,
    }

    return res.render("students/edit", {student})
}

//put
exports.put = function(req, res){
    const {id} = req.body

    let index = 0

    const foundStudent = data.students.find(function(students, foundIndex){
        if(students.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundStudent) return res.send("Student not founddddd!")

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Erro na alteração dos dados")

        return res.redirect(`students/${id}`)
    })
}

//delete
exports.delete = function(req, res){
    const {id} = req.body

    const filteredStudent = data.students.filter(function(student){
        return student.id != id
    })

    data.students = filteredStudent

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Erro no arquivo")

        return res.redirect("/students")
    })
}