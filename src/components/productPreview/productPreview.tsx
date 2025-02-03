import Image from "next/image";
import previewPhoneImage from "../../../public/images/phonePreview.png";
import previewDesktopImage from "../../../public/images/desktopPreview.png";
import Link from "next/link";

export default function ProductPreview() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-14 justify-center items-start w-full h-3/4 mt-10 sm:mt-44">
            <div className="order-1 sm:order-2 col-span-1 flex flex-col">
                <h3 className="text-2xl font-semibold">
                    Ever found a recipe that seems too complex?
                </h3>
                <p className="text-sm md:text-xl mt-6">
                    Upload an image and structure it with the help of AI.
                </p>
                <p className="text-sm md:text-xl mt-6">
                    Let the AI translate your recipe to Swedish.
                </p>
                <Link href={"/about"} className=" text-center bg-gradient-to-b from-slate-600 to-black text-white max-w-56 py-3 px-2 rounded-lg shadow-xl hover:shadow-none hover:scale-[.98] transition mt-4">
                    Read more
                </Link>
            </div>
            <div className="order-2 md:order-1 col-span-1 relative">
                <Image
                    src={previewDesktopImage}
                    alt="Preview image of a recipe in desktop view"
                    className="w-auto h-auto"
                />
                <Image
                    src={previewPhoneImage}
                    alt="Preview image of a recipe in mobile view"
                    className="absolute top-0 right-0 w-24 md:w-24 lg:w-32 -rotate-12"
                />
            </div>
        </section>
    );
}
