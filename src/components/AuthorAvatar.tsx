import { Author } from "../../generated/graphql"
import MyImage from "./ui/MyImage"


const AuthorAvatar = ({ author }: { author: Author }) => {
  const penName = author?.penName ?? ""
  const authorName = (author?.firstName ?? "") + " " + (author?.middleName ?? "") + " " + (author?.lastName ?? "Name not available")


  return <div key={author.id} className="avatar tooltip tooltip-primary" data-tip={`${penName} ${penName ? "," : ""} ${authorName}`}>

    <div className="w-12 h-12 rounded"  >
      <MyImage
        src={author.photoUrl ?? '/image-not-available-author.webp'}
        alt={penName ?? authorName}
        defaultImage="/image-not-available-author.webp"
        defaultAlt="Author image not available"
        className="w-full h-24 object-contain"
        style={{ objectFit: "cover" }}
        width={48}
        height={48}
        
      />
    </div>
  </div>
}
export default AuthorAvatar