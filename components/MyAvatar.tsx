import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface Props {
  src: string
  alt: string
  fallback: string
}

export default function MyAvatar({ src, alt, fallback }: Props) {
  return (
    <Avatar>
      <AvatarImage
        className="w-10 h-10 bg-cover rounded-full"
        src={src}
        alt={alt}
      />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}
