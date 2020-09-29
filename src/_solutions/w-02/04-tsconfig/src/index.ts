function pow(message: string, power = 2): number {
    return Math.pow(message.length, power);
}

const power = parseInt(process.env.power) || 1;

console.log(pow("hello", power));