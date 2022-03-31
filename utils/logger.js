const clc = require("cli-color")

const types ={
    INFORMATION: "info",
    SUCCESS: "success",
    ERROR: "error",
    TICKETS: "tickets",
    TICKETSERROR: "tickets-error",
    COMMAND: "command"
}

const logger = (string, type) => {
    let color

    if(!type) type = types.INFORMATION

    switch(type) {
        case types.INFORMATION:
            color = clc.white
            break
        case types.SUCCESS:
            color= clc.green
            break
        case types.TICKETS:
            color = clc.blue
            break
        case types.TICKETSERROR:
            color = clc.orange
            break
        case types.COMMAND:
            color = clc.yellow
            break
        case types.ERROR:
            color = clc.red, clc.bold
            break
    }

    const output = color(`[${type}] ` + clc.white(`${string}`))
    console.log(output)
}


exports.types = types
exports.logger = logger


