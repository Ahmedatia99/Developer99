export interface Condition {
    condition: (answers: AnswersData) => boolean;
    true: To;
    false: To;
}

export interface Question {
    key: string;
    label: string;
    image?: string;
    answers: Answer[]
}

export interface Answer {
    key: string;
    label: string;
    to?: To; // if to is empty mark as completed
    info?: AnswerInfo
}

export interface AnswerInfo {
    title: string;
    content: string;
}

export type To = string | [string, ToTypes]

export enum ToTypes {
    condition = 'condition',
    question = 'question'
}

export type Questions = Question[]
export type Conditions = Record<string, Condition>
export type AnswersData = Record<string, string>

