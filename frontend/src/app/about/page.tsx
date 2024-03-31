/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

export default function AboutPage() {
    return (
        <div className="flex h-screen flex-col md:flex-row  md:overflow-hidden">
            <Header />
            <div className="flex flex-col flex-grow pt-6 md:overflow-y-auto mt-16">
                <div className="flex-1" />
                <Footer />
            </div>
        </div>
    );
}
