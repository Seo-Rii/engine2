const fs = require('fs')
const StlReader = require('stl-reader')

stlReader = new StlReader()
size = 1

fs.readFile('stl/paraboloid.stl', function (err, data) {
    let res = stlReader.read(new Buffer(data))
    let str = `export default function () { return [`
    for (let i = 0; i < res.vertices.length / 9; i++) {
        str += `[[${res.vertices[i * 9 + 0] * size},${res.vertices[i * 9 + 1] * size},${
            res.vertices[i * 9 + 2] * size
        }],[${res.vertices[i * 9 + 3] * size}, ${res.vertices[i * 9 + 4] * size}, ${
            res.vertices[i * 9 + 5] * size
        }],[${res.vertices[i * 9 + 6] * size},${res.vertices[i * 9 + 7] * size},${
            res.vertices[i * 9 + 8] * size
        }],],`
    }
    str += `]}`
    fs.writeFileSync('model/paraboloid.ts', str, 'utf-8')
})
