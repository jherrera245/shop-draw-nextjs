import Image from "next/image";

export const Logo = () => {
    return (
        <Image
            src="/draw.png"
            alt="Draw Logo"
            width={75}
            height={75}
        />
    )
};
