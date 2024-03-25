import Image from 'next/image';
import LogoImage from '@/../public/tool-logo-transperant.png';
import MobileLogoImage from '@/../public/logo-mobile-transparent.png';

export default function Logo() {
    return (
        <div className="flex justify-center items-center w-full">
            <Image
                width={120}
                height={120}
                src={LogoImage}
                alt="logo"
                className="lg:block md:block hidden"
            />
            <Image
                width={800}
                height={200}
                src={MobileLogoImage}
                alt="logo"
                className="block lg:hidden md:hidden p-8"
            />
        </div>
    );
}
