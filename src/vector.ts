export class Vector {
  x = 0;
  y = 0;
  z = 0;

  constructor(x1, y1, z1) {
    this.x = x1;
    this.y = y1;
    this.z = z1;
  }

    print() {
        console.log(`x좌표:${this.x}, y좌표:${this.y}, z좌표:${this.z}`)
    }

    add(vec: Vector) {
        return new Vector(this.x + vec.x, this.y + vec.y, this.z + vec.z)
    }

    sub(vec: Vector) {
        return new Vector(this.x - vec.x, this.y - vec.y, this.z - vec.z)
    }

    size() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }

    normalize() {
        let size = this.size()
        return new Vector(this.x / size, this.y / size, this.z / size)
    }

    dot(vec: Vector) {
        return this.x * vec.x + this.y * vec.y + this.z * vec.z
    }

    cross(vec: Vector) {
        return new Vector(
            this.y * vec.z - this.z * vec.y,
            this.z * vec.x - this.x * vec.z,
            this.x * vec.y - this.y * vec.x
        )
    }
}

export function cross(a: any, b: any) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0],
    ]
}

export function subtractVectors(a: any, b: any) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
}

export function normalize(v: any) {
    var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])
    if (length > 0.00001) {
        return [v[0] / length, v[1] / length, v[2] / length]
    } else {
        return [0, 0, 0]
    }
}
