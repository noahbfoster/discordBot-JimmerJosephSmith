let x = 1
let y = 1
let z = 0
while (1) {
    y = x
    z = 0
    while (y != 4) {
        if (y % 2 == 1) {
            y = (3*y) + 1
        } else {y = y/2}
        z++
    }
    console.log(x + " is a fail, requiring " + z + " loops.")
    x++
    
}