// Returns number of occurencies of given character.

function countChar(word, char) {
    counter = 0;
    wordLength = word.length;

    for (let i = 0; i < wordLength; i++) {
        if (word[i] == char) counter++; 
    }

    return counter;
}

// Tests.
console.log(countChar('world of warcraft', 'w'));
console.log(countChar("kakkerlak", "k"));