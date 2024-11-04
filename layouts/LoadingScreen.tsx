import Image from "next/image";

export default function LoadingScreen() {
    return (
        <div className="flex flex-col min-h-screen justify-center items-center gap-10">
            <Image src="/images/logo.svg" width="200" height="200" alt="Logo" />
            <h1>Loading...</h1>
        </div>
    )
}