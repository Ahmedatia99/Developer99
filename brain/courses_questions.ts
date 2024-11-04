import { mobileAppInfo, websiteInfo } from "./info";
import { Question } from "./types";

export const questions: Question[] = [
    {
        key: "track",
        image: '/images/questions/track.svg',
        label: "Which track do you want to start?",
        answers: [
            { key: 'website', label: 'Websites', to: 'career_web', info: websiteInfo },
            { key: 'mobile', label: 'Mobile Applications', to: 'career_mobile', info: mobileAppInfo }
        ]
    },
    {
        key: "career_web",
        image: '/images/questions/career.svg',
        label: "Select career?",
        answers: [
            { key: 'frontend', label: 'Front-End' },
            { key: 'backend', label: 'Back-End' },
            { key: 'fullstack', label: 'Full Stack' }
        ]
    },
    {
        key: "career_mobile",
        image: '/images/questions/platform.svg',
        label: "Select Platform?",
        answers: [
            { key: 'android', label: 'Android' },
            { key: 'ios', label: 'IOS' },
            { key: 'both', label: 'Both' }
        ]
    },
]

const result = {
    questions
}

export default result