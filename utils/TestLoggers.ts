export class TestLoggers {

static info(message: string): void {
    console.log(`INFO: ${message}`)
}

static success(message: string): void {
    console.log(`SUCCESS: ${message}`)
}

static output (label:string, message:string): void {
    console.log(`OUTPUT: ${label} : ${message}` )
}

}