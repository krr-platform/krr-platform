import Image from 'next/image';
import LogoImage from '@/../public/tool-logo-transperant.png';

export default function Logo() {
    return (
        <div className="flex justify-center items-center">
            <Image
                width={120}
                height={120}
                src={LogoImage}
                alt="logo"
            />
        </div>
    );
}
