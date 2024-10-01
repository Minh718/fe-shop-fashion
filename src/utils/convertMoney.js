export default function convertMoney(money) {
    if (typeof money !== 'number') {
        console.error('Invalid input: money should be a number.');
        return '$0'; // Return a default value or handle the error as needed
    }
    return '$' + money.toLocaleString('de-DE');
}
