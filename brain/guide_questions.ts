import { mobileAppInfo, websiteInfo } from "./info";
import { Conditions, Questions, ToTypes } from "./types";

const questions: Questions = [
    {
        key: "create",
        image: '/images/questions/create.svg',
        label: "What do you want to create?",
        answers: [
            { key: 'website', label: 'Websites', to: 'coded_before', info: websiteInfo },
            { key: 'mobile', label: 'Mobile Applications', to: 'coded_before', info: mobileAppInfo }
        ]
    },
    {
        key: "coded_before",
        image: '/images/questions/code.svg',
        label: "Have you written code before?",
        answers: [
            { key: 'yes', label: 'Yes', to: 'experience_code' },
            { key: 'no', label: 'No', to: 'age' }
        ]
    },
    {
        key: "experience_code",
        image: '/images/questions/experience.svg',
        label: "How much coding experience you have?",
        answers: [
            { key: 'new', label: "I'm totally  new at coding", to: "age" },
            { key: 'little', label: "I know a little about coding", to: "age" },
            { key: 'good', label: 'I know a lot about coding', to: "age" }
        ]
    },
    {
        key: "age",
        image: '/images/questions/age.svg',
        label: "What's your age?",
        answers: [
            { key: 'child', label: "13-17", to: "content" },
            { key: 'youth', label: "18-25", to: "content" },
            { key: 'old', label: 'More than 25', to: "content" }
        ]
    },
    {
        key: "content",
        image: '/images/questions/content.svg',
        label: "Do you prefer the content will include some videos?",
        answers: [
            { key: 'all', label: "Yes", to: ['determine_learn', ToTypes.condition] },
            { key: 'no_video', label: "Actullay, nope", to: ['determine_learn', ToTypes.condition] },
        ]
    },
    {
        key: "learn_in_website",
        image: '/images/questions/learn_site.svg',
        label: "What would you like to do in website?",
        answers: [
            { key: 'frontend', label: "Design" },
            { key: 'backend', label: "Logic" },
            { key: 'fullstack', label: 'Both' }
        ]
    },
    {
        key: "learn_in_mobile",
        label: "Which platform do you like to create?",
        answers: [
            { key: 'android', label: "Android" },
            { key: 'ios', label: "IOS" },
            { key: 'both', label: 'Both' }
        ]
    },
]

export const conditions: Conditions = {
    determine_learn: {
        condition: (answersData) => answersData.create == 'website',
        true: 'learn_in_website',
        false: 'learn_in_mobile'
    },
}

const result = {
    questions,
    conditions
}

export default result