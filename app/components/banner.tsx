import { SocialMediaButton, SocialTypes } from '@/components/custom/social_media_button';

export default function Banner() {
    return (
        <section className="flex w-full justify-between pl-4 pr-4 p-2">
            <div>
                <span>johndoe@gmail.com</span>
            </div>
            <div className='flex gap-2'>
                <SocialMediaButton type={SocialTypes.Facebook} link='/' />
                <SocialMediaButton type={SocialTypes.LinkedIn} link='/' />
                <SocialMediaButton type={SocialTypes.Twitter} link='/' />
            </div>
        </section>
    );
}