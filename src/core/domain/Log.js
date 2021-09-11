export function buildLog(type, data) {
    return {
        type: type,
        data: `${data}`,
        time: Date.now()
    };
}