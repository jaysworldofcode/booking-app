import { Facebook } from "lucide-react";
import { Twitter } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import Link from 'next/link'

export enum SocialTypes {
    Facebook,
    Twitter,
    LinkedIn
}

export function getSocialIcons(type: SocialTypes) {
    switch(type) {
        case SocialTypes.Facebook:
            return <Facebook />
        case SocialTypes.Twitter:
            return <Twitter />
        case SocialTypes.LinkedIn:
            return <Linkedin />
    }
}

type Prop = {
    type: SocialTypes,
    link: string,
    className?: string
}

export function SocialMediaButton({
    type,
    link,
    className = ''
}: Prop){
    return (
        <Link href={encodeURI(link)} className={className}>
            {getSocialIcons(type)}
        </Link>
    );
}