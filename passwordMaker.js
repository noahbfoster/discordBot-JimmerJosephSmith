var randomWords = require('random-words');

// function generates purely random password from characters in character list. Is ignorant of any requirement other than length parameter.
function getRandomPassword(length) {
    var result = ''
    var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}
// function generates random lowercase letter (intended as helper before I reimagined project)
function getRandomLetter() {
    var result = ''
    var characters = 'abcdefghijklmnopqrstuvwxyz'
    var charactersLength = characters.length
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    return result
}
//function generates random symbol for password gen later.
function getRandomSymbol() {
    var result = ''
    var characters = '!@#$%&'
    var charactersLength = characters.length
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    return result
}

// voweloid picker, picks a vowel-sounding structure from this array at random.
function voweloidPicker() {
    var result = ''
    var vowels = ['a','e','i','o','u','y','ie','ou','ea','oi','ie']
    vowelsLength = vowels.length
    result += vowels[Math.floor(Math.random()*vowelsLength)]
    return result
}
// picks word starter from random from this array
function starterPicker() {
    var result = ''
    var consonants = ['b','c','d','f','g','h','j','k','l','m','n','p','qu','r','s','t','v','w','z','br','cr','dr','fr','gr','kr','pr','tr','ch','th','st']
    consonantsLength = consonants.length
    result += consonants[Math.floor(Math.random()*consonantsLength)]
    return result
}
// picks consantant sounding structure from random from this array.
function consonantoidPicker() {
    var result = ''
    var consonants = ['b','c','d','f','g','h','j','k','l','m','n','p','r','s','t','v','w','z','br','cr','dr','fr','gr','kr','pr','tr','ch','th','ft','st']
    consonantsLength = consonants.length
    result += consonants[Math.floor(Math.random()*consonantsLength)]
    return result
}
// picks word terminator from this array at random
function endPicker() {
    var result = ''
    var consonants = ['b','d','f','g','h','j','k','l','m','n','p','qu','r','s','t','v','w','z','ch','th','st','ft']
    consonantsLength = consonants.length
    result += consonants[Math.floor(Math.random()*consonantsLength)]
    return result
}
// puts pieces of word-oids together to form word-oid using previous helpers. My definition of word-oid? a string of characters put together in an order in which they can be pronounced like a word.
function wordoidGenerator() {
    var start = ''
    if (Math.random()>=.2) {start+=starterPicker()}
    var middle = voweloidPicker() + consonantoidPicker() + voweloidPicker()
    var end = ''
    if (Math.random()>=.4) {end+=endPicker()}
    var result = start+middle+end
    return result.charAt(0).toUpperCase() + result.slice(1)
}

// function uses wordoid generator, adding a second word if necessary, then adds random number 0-99 to the end and a symbol from the random symbol function
function wordoidPasswordGenerator() {
    var result = ''
    result += wordoidGenerator()
    if (result.length<8) {result+=wordoidGenerator()}
    result += Math.floor(Math.random()*100)
    result += getRandomSymbol()
    return result
}

// function uses random-words package to generate random english words until it meets minimum specified length, then adds random number 0-99 to the end and a symbol from the random symbol function
function dictionaryPasswordGenerator(minLength) {
    var result = ''
    while (result.length < minLength) {
        var word = randomWords()
        word = word.charAt(0).toUpperCase() + word.slice(1)
        result += word
    }
    result += Math.floor(Math.random()*100)
    result += getRandomSymbol()
    return result
}


exports.wordoidPasswordGenerator = wordoidPasswordGenerator
exports.getRandomPassword = getRandomPassword
exports.dictionaryPasswordGenerator = dictionaryPasswordGenerator

// console.log("Random Password: " + getRandomPassword(12))
// // console.log("Random Letter: " + getRandomLetter())
// console.log("Random Wordoid: " + wordoidGenerator())
// console.log("Random Wordoid-based Password: " + wordoidPasswordGenerator())
// console.log("Random English Word based Password: " + dictionaryPasswordGenerator(8))
