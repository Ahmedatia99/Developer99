import classNames from "classnames";
import Image from "next/image";

interface SelectionProps {
    data?: {
        id: number;
        label: string;
        img: string;
    }[];
    values?: number[];
    onSelect: (val: number[]) => void;
    small?: boolean;
}

export const Selection = ({ data, values = [], onSelect, small = false }: SelectionProps) => {
    const deselect = (target: number) => onSelect(values.filter((v: any) => v != target))
    const select = (target: number) => onSelect([...values, target])


    return (
        <>
            <div className={classNames('flex flex-wrap gap-8 justify-center lg:justify-start', !small && '[&_div]:w-[240px]')}>
                {data?.map((d, i) => {
                    const active = values.includes(d.id)
                    return (
                        <div onClick={() => active ? deselect(d.id) : select(d.id)} key={`a${i}`}
                            className={classNames("justify-around border-4 p-5 rounded-2xl flex items-center cursor-pointer transition flex-col",
                                active ? 'bg-morning border-morning text-white' : 'border-morning hover:-translate-y-2',
                                
                                )}>
                            <Image src={d.img} width={small ? 50 : 100} height={80} alt='selection image' />
                            <p className="mt-2 text-xl text-center">{d.label}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
