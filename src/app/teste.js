function descontoOuNao(number) {
    const resultado = number.reduce((a, b) => a + b);
    const desconto = resultado * 0.05
    if (number.length >= 2 && number.length <= 4) {
        return `Desconto de R$${desconto} -> Preço com desconto R$${resultado - desconto}`
    } else if (number.length >= 5 ) {
        return `Desconto de R$${desconto} -> Preço com desconto R$${resultado - desconto}`
    } else {
        return `Desconto de R$0,00 -> Preço sem desconto R$${resultado}`
    }
}

console.log(descontoOuNao([5]))
