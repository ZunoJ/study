function nine(){
    for (let i = 1; i <= 9; i++) {
        for (let j = 1; j <= i; j++) {
            console.log(`${i}*${j}=${j*i}`)
        }
    }
}
nine()