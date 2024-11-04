import { useState } from "react";
import { Answer, AnswersData, Conditions, Questions, ToTypes, To } from "./types";
interface StoryProps {
    questions: Questions;
    conditions?: Conditions;
    start?: number;
}

export const useStory = ({ questions, conditions, start = 0 }: StoryProps) => {
    const [previousVal, setPrevious] = useState<string[]>([])
    const [result, setResult] = useState<AnswersData>({})
    const [current, setCurrent] = useState<number>(start)

    // find any question by passing key
    const find = (key: string) => {
        return questions.findIndex((q) => q.key == key)
    }

    const next = ({ key: ansKey, to }: Answer, finish: Function) => {
        const goResult = () => {
            const currentQuestion = questions[current]
            const newResult = { ...result, [currentQuestion.key]: ansKey }
            setPrevious((v) => [...v, currentQuestion.key])
            setResult(newResult)
            return newResult
        }
        const goQuestion = (key: string) => {
            const next = key ? find(key) : -1
            goResult()
            return setCurrent(next)
        }
        const parse = (to: To): any => {
            if (typeof to == 'string') return goQuestion(to)
            const [key, type] = to
            if (type == ToTypes.condition) {
                const stat = conditions?.[key]
                if (!stat) return console.error(`condition (${key}) not exist`);
                return stat.condition(result) ? parse(stat.true) : parse(stat.false)
            } else if (type == ToTypes.question) {
                goQuestion(key)
            }
        }

        if (!to) return finish(goResult())
        return parse(to)
    }

    const previous = (cb: Function) => {
        if (current == 0) return cb()
        const idx = find(previousVal[previousVal.length - 1])
        if (idx == -1) return;
        const prevQ = questions[idx].key
        setPrevious((vs: string[]) => vs.filter((v) => v != prevQ))
        setResult((v) => ({ ...v, [prevQ]: '' }))
        setCurrent(idx)
    }

    return { question: questions[current], next, previous }
}