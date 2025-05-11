
function color_card(card){
    if( card.classList.contains('standart_color')){
        card.classList.remove('standart_color')
    }
        if (card.classList.contains('number_1')) card.style.background = '#8cff00'
        if (card.classList.contains('number_2')) card.style.background = '#ff0000'
        if (card.classList.contains('number_3')) card.style.background = '#fffb00'
        if (card.classList.contains('number_4')) card.style.background = '#00fffb'
        if (card.classList.contains('number_5')) card.style.background = '#2f00ff'
        if (card.classList.contains('number_6')) card.style.background = '#ff00b7'
        if (card.classList.contains('number_7')) card.style.background = '#b300ff'
        if (card.classList.contains('number_8')) card.style.background = '#fc7100'
}
let cards = document.querySelectorAll('.card')
let arr_cards1 = []
while(arr_cards1.length < 8){
    let number = Math.floor(Math.random() * 8) + 1;
    if (arr_cards1.includes(number)){
        continue
    }else{
        arr_cards1.push(number)
    }
}
let arr_cards2 = []
while(arr_cards2.length < 8){
    let number = Math.floor(Math.random() * 8) + 1;
    if (arr_cards2.includes(number)){
        continue
    }else{
        arr_cards2.push(number)
    }
}
console.log(arr_cards1, arr_cards2)
let arr_cards = arr_cards1.concat(arr_cards2)
console.log(arr_cards)
let num_card_arr = 0
for(let card of cards){
    card.classList.add(`number_${arr_cards[num_card_arr]}`)
    num_card_arr += 1
}
let result = 0
let count = 10
let click = 0
let arr_color_cards = []
for(let card of cards){
    card.onclick = function(){
        click++
        if (click === 1){
            color_card(card)
            arr_color_cards.push(card)
            card.classList.add('no_click')
        }
        if (click === 2){
            color_card(card)
            arr_color_cards.push(card)
            let class1 = Array.from(arr_color_cards[0].classList).find(cls => cls.startsWith('number_'))
            let class2 = Array.from(arr_color_cards[1].classList).find(cls => cls.startsWith('number_'))
            const [firstCard, secondCard] = arr_color_cards
            if (class1 !== class2) {
                count = count - 1
                if (count === 0){
                    for (let card of cards){
                        card.classList.add('no_click')
                    }
                    $("#loseModal").modal({
                        fadeDuration: 1000,    
                        fadeDelay: 0.50       
                    });
                    
                }
                document.querySelector('.num_attempts').textContent = `${count}`
                setTimeout(() => {
                    firstCard.style.background = ''
                    secondCard.style.background = ''
                    firstCard.classList.add('standart_color')
                    secondCard.classList.add('standart_color')
                }, 500)
                    firstCard.classList.remove('no_click')
            }else{                   
                secondCard.classList.add('no_click')
                secondCard.classList.add('flipped')
                firstCard.classList.add('flipped')
                result += 2
                if (result === 16){
                    document.querySelector('#final-attempts').textContent = `${10 - count}`
                    $("#FinishModal").modal({
                        fadeDuration: 1000,    
                        fadeDelay: 0.50       
                    });
                }
            }

            arr_color_cards = []
            click = 0
        }
    }
    
}



document.querySelector('.btn').onclick = () => {
    location.reload();
}