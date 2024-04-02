export function createLine(num?: number) {
    return '-'.repeat(num || 50);
}
export function createLinePrint(num?: number) {
    return console.log('-'.repeat(num || 50));
}

function createBoxLine(content: string, extra = '') {
    return `| ${content.padEnd(46 - extra.length)}${extra} |`;
}

export function Print(message: string, width?: number) {
    console.log(createLine());
    console.log(createBoxLine(message));
    console.log(createLine());
}

// Generate Secret Key
export async function generateSecretKey() {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let secretKey = '';
    for (let i = 0; i < 25; i++) {
        secretKey += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return secretKey;
}
