module.exports = {
    age: function(timestamp){

        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if( month < 0 ||
            month == 0 &&
            today.getDate() < birthDate.getDate()){
                age = age - 1
        }
        
        return age
    },
    graduation: function(degrees){

        if(degrees == "medium") return "Ensino Médio Completo"
        if(degrees == "higher") return "Ensino Superior Completo"
        if(degrees == "mestre") return "Mestrado"
        if(degrees == "doctor") return "Doutorado"
    },
    date: function (timestamp){
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso:`${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    },
    schollYear: function(year){

        if(year == "5elementary") return "5º Ano do Ensino Fundamental"
        if(year == "6elementary") return "6º Ano do Ensino Fundamental"
        if(year == "7elementary") return "7º Ano do Ensino Fundamental"
        if(year == "8elementary") return "8º Ano do Ensino Fundamental"
        if(year == "1high") return "1º Ano do Ensino Médio"
        if(year == "2high") return "2º Ano do Ensino Médio"
        if(year == "3high") return "3º Ano do Ensino Médio"
    },

}