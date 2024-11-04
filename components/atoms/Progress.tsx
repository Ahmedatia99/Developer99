interface ProgressProps {
    value: number;
}

export const Progress = ({ value = 0 }: ProgressProps) => {
    return (
        <div className="relative">
            <div className="w-full bg-gray-200 rounded-sm h-2.5 dark:bg-gray-700">
                <div className="bg-morning h-2.5 rounded-full" style={{ width: `${value}%`, background: 'linear-gradient(to left, #fea800, #ff9924, #ff8c37, #ff7f47, #ff7455, #f5675f, #e75c67, #d8546e, #b84a6e, #97426a, #763b61, #573353)' }}></div>
            </div>
        </div>
    )
}