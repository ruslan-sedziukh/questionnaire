import { QuestionnaireData } from '@/redux/questionnaireSlice'
import { getTextWithDynamicValues } from '@/utils/getTextWithDynamicValues'

type Props = {
  questionnaireData: QuestionnaireData
}

const Results = ({ questionnaireData }: Props) => {
  const questionnaireEntries = Object.entries(questionnaireData)

  return (
    <div className="flex items-center font-open-sans flex-col gap-5 min-h-lvh p-4 min-w-fit bg-[#FFF0F0] text-[#333333]">
      <div className="flex items-center flex-col w-[330px]">
        {questionnaireEntries.map((entry) => {
          return (
            <div
              key={entry[0]}
              className="w-full flex flex-col gap-2 not-last:border-b not-last:border-black not-first:pt-5 not-last:pb-5"
            >
              <div className="w-full font-semibold ">
                <div>
                  {getTextWithDynamicValues(
                    entry[1].heading,
                    questionnaireData
                  )}
                </div>

                {entry[1].text && <div>{entry[1].text}</div>}
              </div>
              <div>{String(entry[1].label)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Results
