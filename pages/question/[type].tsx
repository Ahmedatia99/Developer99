import Image from "next/image";
import { Heading } from "components/atoms/Heading";
import { useStory } from "brain/story.hook";
import { Answer } from "components/molecules/Answer";
import guide from "brain/guide_questions";
import courses from "brain/courses_questions";
import { useRouter } from "next/router";
import { AnswerInfo, AnswersData } from "brain/types";
import { useState } from "react";
import { Modal } from "components/molecules/Modal";
import { AuthTypes, useAuthGuard } from "hooks/useAuthGuard";
interface QuestionProps {
  type: 'courses' | 'guide';
}

export default function Question({ type }: QuestionProps) {
  const { info: infoUser } = useAuthGuard(AuthTypes.User)
  const [info, setInfo] = useState<AnswerInfo | null>()
  const { push } = useRouter()
  const storyType = { guide, courses }[type]
  const { question, next, previous } = useStory({ ...storyType })
  const finish = (result: AnswersData) => {
    push({
      pathname: '/finish',
      query: {...result, questType: type}
    })
  }


  if (!question) return <></>;
  return (
    <>
      <main className="flex flex-col h-screen mx-auto md:justify-center items-start gap-10 md:gap-28 lg:gap-10 max-w-5xl px-4">
        <button onClick={() => previous(() => push('/'))} className="text-morning hover:-translate-x-4 transition delay-75 p-2">
          <span className="fa-solid fa-arrow-left text-6xl" />
        </button>
        <Heading>{question.label}</Heading>
        <section className="flex flex-1 md:flex-initial flex-col md:flex-row w-full justify-between items-start">
          <div className="flex flex-col gap-8 flex-1 w-full md:max-w-lg px-0">
            {question.answers.map((a, i) => (
              <Answer onInfo={a.info ? () => setInfo(a.info) : undefined} onClick={() => next(a, finish)} key={i}>{a.label}</Answer>
            ))}
          </div>
          <div className="flex items-center justify-center w-full md:w-auto">
            {question.image && <section className="relative w-64 h-64 md:h-80 md:w-80 lg:h-96 lg:w-96">
              <Image src={question.image} fill alt="Success Way" />
            </section>}
          </div>
        </section>
      </main>
      {/* info Popup */}
      {info && <Modal title={info.title} isOpen={!!info} onClose={() => setInfo(null)}>
        <p>
          {info.content}
        </p>
      </Modal>}
    </>
  )
}


export async function getStaticPaths() {
  return {
    paths: [
      { params: { type: 'courses' } },
      { params: { type: 'guide' } }
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  return { props: { type: params.type } }
}
