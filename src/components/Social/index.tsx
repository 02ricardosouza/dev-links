import { ReactNode } from 'react'

interface SocialProps {
    url: string;
    children: ReactNode;
}

export default function Social({ url, children}: SocialProps){
    return (
        <a href={url} rel='noopener noreferrer' target='blank'>{children}</a>
    )
}