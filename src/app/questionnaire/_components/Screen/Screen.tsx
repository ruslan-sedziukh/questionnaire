import { Question } from '@/types/questionnaire'

type Props = {
  question: Question
}

const Screen = ({ question }: Props) => {
  return (
    <div className="h-lvh">
      <div className="flex items-center font-[Open_Sans] flex-col gap-5 mb-5 min-h-full bg-[#FFF0F0] p-4">
        <h1 className="inline font-bold text-2xl leading-7 w-[330px]">
          {question.text}
        </h1>

        <div className="flex flex-col gap-5 w-[330px]">
          {question.options.map((option) => (
            <button
              className="bg-[#EAEEF7] border-[1px] py-3 px-5 rounded-2xl h-16 text-base font-normal border-[#E0E0E0] shadow-[2px_2px_6px_#543C9740] cursor-pointer"
              key={option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Screen
