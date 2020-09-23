function cypher(message: string, offset: number): string {
    return message
        .split("")
        .map((c, i) => {
            return c
                ? String.fromCharCode(
                    message.charCodeAt(i) + offset
                )
                : c
        })
        .join("")
}

function bruteForceDecrypt(message: string, needle: string) {
    let encrypted = ""
    for (let i = 1; i < 65536; i++) {
        encrypted = cypher(message, i);
        if (encrypted.includes(needle)) {
            break;
        }
    }
    return encrypted;
}

const message = "堀堝堤堤堧埘培堟堝堦堬埦埘堑堧堭堪埘堬堙堫堣埘堯堧堭堤堜埘堚堝埘堬堧埘堨堪堧堬堝堛堬埘堦堝堯埘堋堝堛堪堝堬埘堂堙堛堣埘堚堤堭堝堨堪堡堦堬堫埘堙堦堜埘堞堡堦堜埘埽堮堙埘堄堭堲堲堡堧堦";
const needle = "Eva"
console.log(bruteForceDecrypt(message, needle))
