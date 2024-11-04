import Image from "next/image";
import { Button } from "components/atoms/Button";
import { Strategy } from "components/atoms/strategy/Strategy";
import Overlay from "components/atoms/overlay/Overlay";
import Link from "next/link";
import { selectUser } from "store/user/user.slice";
import { useSelector } from "react-redux";

export default function Home() {
  const { isLogged } = useSelector(selectUser)
  const goTo = (link: string) => isLogged ? link : '/auth/login'

  return (
    <main className="flex">
      <section className="flex-1 absolute top-0 left-0 w-full h-full overflow-hidden">
        <Image src="/images/illustrations/background.svg" fill style={{ objectFit: 'cover' }} alt="Wallpaper" />
        <Strategy />
        <Overlay gradient />
      </section>
      <section className="relative z-3 flex flex-col h-screen gap-4 flex-[1.1] justify-center px-8 md:px-15 lg:px-16 xl:px-32 xl:p-26 max-w-[500px] md:max-w-full mx-auto">
        <h1 className="text-3xl lg:text-4xl xl:text-6xl font-bold"><span className="text-5xl lg:text-6xl xl:text-8xl">D</span>evelopers99</h1>
        <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl md:max-w-sm lg:max-w-lg 2xl:max-w-2xl md:leading-normal lg:leading-normal xl:leading-normal">
          the right way to become
          a professional programmer
        </p>
        <div className="flex flex-col max-w-sm gap-4">
          <Link href={goTo('/question/courses')}>
            <Button>Select courses</Button>
          </Link>
          <Link href={goTo('/question/guide')}>
            <Button>Guide me</Button>
          </Link>
          {isLogged && <Link href={goTo('/dashboard/tracks')}>
            <Button>Available Tracks</Button>
          </Link>}
        </div>
      </section>
    </main>
  )
}
