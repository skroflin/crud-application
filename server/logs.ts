
import { Request, NextFunction, Response } from 'express'

const getDurationInMilliseconds = (start: [ number, number ]) => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(start)
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

export function timeMiddleware(req: Request, res: Response, next: NextFunction) {

    const start = process.hrtime()
    let done = false

    const callback = () => {

        if (done) return;

        let url = req.originalUrl
        const qIdx = url.indexOf('?')
        if (qIdx !== -1) url = url.slice(0, qIdx)
        Object.values(req.params || {}).forEach(p => url = url.replace("/" + p, ""))
        console.log(`[${new Date().toISOString()}]`, req.method, url, `${getDurationInMilliseconds(start)} ms`, req.params || {})

        done = true
    }

    res.on('close', callback)
    res.on('finish', callback)
    next()
}