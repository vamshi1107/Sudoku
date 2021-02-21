paint()
function paint() {
    var v = document.querySelectorAll("td")
    var val = true
    c = 0
    col = 0
    non = 0
    color = true
    box = 0
    alter = 0
    for (let i of v) {
        if (!val) {
            c = c + 1
            if (color) {
                i.style.backgroundColor = "#d3bcbc"
                i.firstChild.style.backgroundColor = "#d3bcbc"
                col = col + 1
                if (col == 3) {
                    color = false
                    col = 0
                }
            }
            else {
                non = non + 1
                if (non == 3) {
                    color = true
                    non = 0
                }
            }
            if (c % 9 == 0) {
                alter = alter + 1
                if (alter % 3 == 0 && alter != 6) {
                    color = false
                }
                else {
                    color = true

                }
                if (alter >= 4 && alter < 6) {
                    color = false
                }
            }
        }
        else {
            val = false
        }
    }
}

function clean() {
    var v = document.querySelectorAll("td")
    c = []
    for (let i = 1; i < v.length; i++) {
        c.push(v[i])
    }
    return c
}

var c = 0
document.querySelectorAll("td").forEach((ele) => {
    if (c > 0) {
        ele.setAttribute("id", c)
    }
    ele.firstChild.addEventListener("change", (r) => {
        check(ele, r)
    })
    ele.addEventListener("dblclick", () => {
        ele.firstChild.style.backgroundColor = "red"
        ele.style.backgroundColor = "red"

    })
    c = c + 1
})

function hadDuplicate(v) {
    x = []
    for (let i = 0; i < v.length; i++) {
        if (parseInt(v[i]) != -1) {
            x.push(v[i])
        }
    }
    console.log(x, new Set(x))
    return x.length == new Set(x).size
}



function check(ele, r) {
    var v = clean()
    var lower = 0
    var upper = 0
    var clower = 0
    var cupper = 0
    const values = [[1, 9], [10, 18], [19, 27], [28, 36], [37, 45], [46, 54], [55, 63], [64, 72], [73, 81]]
    const cvalues = [[1, 73], [2, 74], [3, 75], [4, 76], [5, 77], [6, 78], [7, 79], [8, 80], [9, 81]]
    const bvalues = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [27, 28, 29], [30, 31, 32], [33, 34, 35], [54, 55, 56], [57, 58, 59], [60, 61, 62]]
    var id = parseInt(ele.id)
    for (let k = 0; k < values.length; k++) {
        if (id >= values[k][0] && id <= values[k][1]) {
            lower = values[k][0] - 1
            upper = values[k][1] - 1
        }
    }
    row = []
    space_row = []
    for (let i = lower; i <= upper; i++) {
        var k = v[i].firstChild.value
        if (v[i].firstChild.value == "") {
            k = -1
        }
        if (k == undefined) {
            k = v[i].firstChild.innerHTML
        }
        row.push(parseInt(k))
        space_row.push(v[i])
    }
    if (!hadDuplicate(row)) {
        for (let g = 0; g < space_row.length; g++) {
            space_row[g].style.backgroundColor = "blue"
        }
        setTimeout(() => {
            for (let g = 0; g < space_row.length; g++) {
                if (space_row[g].style.backgroundColor != "red") {
                    space_row[g].style.backgroundColor = "white"
                }
                if (space_row[g].firstChild.style.backgroundColor == "red") {
                    space_row[g].style.backgroundColor = "red"
                }
            }
        }, 1500)
        t(ele)
    }
    v = clean()
    var cval = id
    while (cval - 9 > 0) {
        cval -= 9
    }
    columns = []
    space_column = []
    cval -= 1
    for (let i = 0; i < 9; i++) {
        var ck = v[cval].firstChild.value
        if (v[cval].firstChild.value == "") {
            ck = -1
        }
        if (ck == undefined) {
            ck = v[cval].firstChild.innerHTML
        }
        columns.push(parseInt(ck))
        space_column.push(v[cval])
        if (cval + 9 < 81) {
            cval += 9
        }
    }
    if (!hadDuplicate(columns)) {
        for (let g = 0; g < space_column.length; g++) {
            space_column[g].style.backgroundColor = "blue"
        }
        setTimeout(() => {
            for (let g = 0; g < space_column.length; g++) {
                if (space_column[g].style.backgroundColor != "red") {
                    space_column[g].style.backgroundColor = "white"
                }
                if (space_column[g].firstChild.style.backgroundColor == "red") {
                    space_column[g].style.backgroundColor = "red"
                }
            }
        }, 1500)
        t(ele)
    }
    v = clean()
    boxes = []
    space_box = []
    z = boxer(id)
    semi = bvalues[z]
    for (let j = 0; j < semi.length; j++) {
        var q = 0
        for (let g = 0; g < 3; g++) {
            var b = semi[j] + q
            if (v[b].firstChild.value == "") {
                boxes.push(-1)
            }
            else {
                boxes.push(parseInt(v[b].firstChild.value))
                space_box.push(v[b])
            }
            q += 9
        }

    }
    if (!hadDuplicate(boxes)) {
        for (let g = 0; g < space_box.length; g++) {
            space_box[g].style.backgroundColor = "blue"
        }
        setTimeout(() => {
            for (let g = 0; g < space_box.length; g++) {
                if (space_box[g].style.backgroundColor != "red") {
                    space_box[g].style.backgroundColor = "white"
                }
                if (space_box[g].firstChild.style.backgroundColor == "red") {
                    space_box[g].style.backgroundColor = "red"
                }
            }
        }, 1500)
        t(ele)
    }

}

function boxer(id) {
    var x = 0
    const bvalues = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [27, 28, 29], [30, 31, 32], [33, 34, 35], [54, 55, 56], [57, 58, 59], [60, 61, 62]]
    for (let i = 0; i < bvalues.length; i++) {
        for (let j = 0; j < bvalues[i].length; j++) {
            var q = 0
            for (let h = 0; h < 3; h++) {
                if (bvalues[i][j] + q == parseInt(id) - 1) {
                    x = i
                    console.log(x)
                }

                q += 9
            }
        }
    }
    return x
}

function t(ele) {
    if (ele.firstChild.value != "") {
        ele.firstChild.value = ""
    }

}
