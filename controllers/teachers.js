const fs = require("fs")
const data = require("../data.json")
const Intl = require("intl")
const {graduation, age, date} = require("../utils")

//index
exports.index = function(req, res){

    res.render("teachers/index", {teachers:data.teachers})
}

//show
exports.show = function(req, res){

    const {id} = req.params
    console.log(id)

    const foundTeachers = data.teachers.find(function(teachers){
        return teachers.id == id
    })
    
    if(!foundTeachers) return res.send("O professor não foi encontardo")

    const teacher = {
        ...foundTeachers,
        birth: age(foundTeachers.birth),
        degrees: graduation(foundTeachers.degrees),
        areas: foundTeachers.areas.split(","),
        created_at: new Intl.DateTimeFormat("pt-br").format(foundTeachers.created_at),
    }

    return res.render("teachers/show", {teacher})
}

//create page
exports.create = function(req, res){
    res.render("teachers/create")
}

//create
exports.post = function(req, res){
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Faltando informações")
        }
    }

    let {avatar_url, name, birth, degrees, class_type, areas} = req.body

    birth = Date.parse(birth)
    const id = (data.teachers.length + 1)
    const created_at = Date.now()

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        degrees,
        class_type,
        areas,
        created_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2),function(err){
        if (err) return res.send("Erro em salvar os dados")

        return res.redirect("/")
    })
}

//editar
exports.edit = function(req, res){

    const {id} = req.params

    const foundTeachers = data.teachers.find(function(teachers){
        return teachers.id == id
    })
    
    if(!foundTeachers) return res.send("O professor não foi encontardo")

    const teacher = {
        ...foundTeachers,
        birth: date(foundTeachers.birth),
    }

    return res.render("teachers/edit", {teacher})
}

//put
exports.put = function(req, res){
    const {id} = req.body

    let index = 0

    const foundTeacher = data.teachers.find(function(teachers, foundIndex){
        if(teachers.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundTeacher) return res.send("Teacher not founddddd!")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Erro na alteração dos dados")

        return res.redirect(`/`)
    })
}

//delete
exports.delete = function(req, res){
    const {id} = req.body

    const filteredTeacher = data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers = filteredTeacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Erro no arquivo")

        return res.redirect("/teachers")
    })
}